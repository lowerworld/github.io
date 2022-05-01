import dayjs from 'dayjs';
import { readFile } from 'fs/promises';
import { globby } from 'globby';
import matter from 'gray-matter';
import path from 'path';
import { z } from 'zod';

export const postSchema = z.object({
  id: z.string().uuid(),
  date: z.preprocess(
    (arg) =>
      typeof arg === 'string' || arg instanceof Date
        ? dayjs(arg).format()
        : undefined,
    z.string().or(z.date())
  ),
  title: z.string().optional(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  pathname: z.string().optional(),
});

export async function getAllPosts() {
  return globby('posts/**/*.mdx', {
    cwd: path.join(process.cwd(), 'pages'),
  })
    .then((pathnames) =>
      Promise.all(
        pathnames.map(async (pathname) =>
          parseMeta(await readFile(path.join(process.cwd(), 'pages', pathname)))
            .then((meta) => ({ meta: { ...meta, pathname } }))
            .catch((e) => {
              console.warn(e.format());
              return undefined;
            })
        )
      )
    )
    .then((posts) => posts.flatMap((post) => (post ? [post] : [])))
    .then((posts) =>
      posts.sort(({ meta: a }, { meta: b }) => b.date.localeCompare(a.date))
    )
    .then((posts) => {
      const tags = (() => {
        const set = new Set();

        for (const post of posts) {
          post.meta.tags?.forEach((tag) => set.add(tag));
        }

        return Array.from(set).sort();
      })();

      return { posts, tags };
    });
}

function parseMeta(text) {
  const { data } = matter(text);
  return postSchema.parseAsync(data);
}
