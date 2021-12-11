import { Octokit } from '@octokit/core';
import matter from 'gray-matter';
import { remark } from 'remark';
import gfm from 'remark-gfm';
import hljs from 'remark-highlight.js';
import html from 'remark-html';
import { GistPrivacy, query } from '~/lib/graphql';
import site from '~/site.config';
import { Gist } from '~/types/gist';
import { GitHub } from '~/types/graphql';

const octokit = new Octokit({ auth: process.env.PERSONAL_ACCESS_TOKEN });

export async function getAllGists(): Promise<{
  gists: Gist[];
  tags: string[];
}> {
  let gists: Gist[] = [];

  for (let after = null as unknown as string; ; ) {
    const { nodes, pageInfo } = await octokit
      .graphql<GitHub.Query.Gists>(query.gists, {
        login: site.github.gist.login,
        after,
        privacy:
          site.github.gist.private === true
            ? GistPrivacy.ALL
            : GistPrivacy.PUBLIC,
      })
      .then((data) => data.user.gists);

    gists = [
      ...gists,
      ...(await Promise.all(
        nodes?.map<Promise<Gist | undefined>>(async (node) => {
          if (node) {
            const { url, ...gist } = node;
            const file = findFile(gist.files);

            if (file?.text) {
              const { title, tags } = parseFile(file.text);

              delete gist.files;

              return {
                ...gist,
                ...(gist.isPublic ? { url } : undefined),
                title,
                tags,
              };
            }
          }
        }) ?? []
      ).then((gists) =>
        gists.filter((gist): gist is Gist => gist !== undefined)
      )),
    ];

    if (pageInfo.hasNextPage) {
      after = pageInfo.endCursor;
      continue;
    }

    break;
  }

  const tags = (() => {
    const set = new Set<string>();

    for (const gist of gists) {
      gist.tags.forEach((tag) => set.add(tag));
    }

    return Array.from(set).sort();
  })();

  return { gists, tags };
}

export async function getGistById(id: string): Promise<Gist | undefined> {
  const { url, ...gist } = await octokit
    .graphql<GitHub.Query.Gist>(query.gist, {
      login: site.github.gist.login,
      name: id,
    })
    .then((data) => data.user.gist);

  const file = findFile(gist.files);

  if (file?.text) {
    const { title, tags, content } = parseFile(file.text);

    const history = await octokit
      .request('GET /gists/{gist_id}', { gist_id: id })
      .then((response) => response.data.history);

    delete gist.files;

    return {
      ...gist,
      ...(gist.isPublic ? { url } : undefined),
      title,
      tags,
      content: await remark()
        .use(gfm)
        .use(html)
        .use(hljs)
        .process(content)
        .then((result) => result.toString()),
      revision: history?.length ?? 1,
      ...(gist.isPublic && history
        ? {
            history: history.slice(0, 10).map((history) => ({
              ...(history.user
                ? {
                    user: {
                      avatar_url: history.user.avatar_url,
                      login: history.user.login,
                    },
                  }
                : undefined),
              ...(history.committed_at
                ? { committed_at: history.committed_at }
                : undefined),
              ...(history.change_status
                ? { change_status: history.change_status }
                : undefined),
            })),
          }
        : undefined),
    };
  }
}

function findFile(files?: GitHub.Gist['files']) {
  return files?.find(
    (file) =>
      file &&
      file.name &&
      file.extension === '.md' &&
      file.isTruncated === false &&
      (site.github.gist.fileNameFilter?.test(file.name) ?? true)
  );
}

function parseFile(text: string): {
  title: string;
  tags: string[];
  content: string;
} {
  const { data, content } = matter(text);

  const title = String(data['title'] ?? '');

  const tags = Array.isArray(data['tags'])
    ? data['tags'].map((tag) => String(tag))
    : [];

  return { title: title || 'Untitled', tags, content };
}
