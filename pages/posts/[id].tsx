import {
  ChevronRightIcon,
  CodeIcon,
  GitCommitIcon,
  PersonIcon,
  TagIcon,
} from '@primer/octicons-react';
import dayjs from 'dayjs';
import 'highlight.js/styles/atom-one-dark-reasonable.css';
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import Head from 'next/head';
import Tags from '~/components/tags';
import { getAllGists, getGistById } from '~/lib/api';
import site from '~/site.config';
import markdown from '~/styles/markdown';
import { Gist } from '~/types/gist';

type Props = { gist: Gist };

export default function Post({ gist }: Props): JSX.Element {
  return (
    <>
      <Head>
        <title>{`${gist.title} - ${site.html.title}`}</title>
      </Head>

      <div className="lg:flex my-4 lg:gap-x-4">
        <nav className="hidden lg:block lg:flex-1" />

        <article className="container lg:max-w-screen-md 2xl:max-w-screen-lg">
          <section>
            <p className="text-2xl">{gist.title}</p>

            <p className="transition-colors text-gray-300 dark:text-gray-600">
              {`${gist.name.substring(0, 8)} - ${dayjs(gist.createdAt).format(
                'YYYY-MM-DD HH:mmZ'
              )}`}
            </p>
          </section>

          <hr className="mt-2 mb-3 border-t-2 transition-border-color dark:border-gray-700" />

          <section
            className={markdown}
            dangerouslySetInnerHTML={{ __html: gist.content ?? '' }}
          />
        </article>

        <aside className="lg:flex-1 text-sm">
          <div className="grid grid-cols-1 divide-y dark:divide-gray-700">
            {gist.tags.length > 0 && (
              <section className="pb-3">
                <div className="flex items-center mb-2 gap-x-2">
                  <TagIcon />
                  <span className="font-bold">Tags</span>
                </div>

                <Tags tags={gist.tags} />
              </section>
            )}

            <section className="py-3">
              <div className="flex items-center mb-1 gap-x-2">
                <PersonIcon />
                <span className="font-bold">Author</span>
              </div>

              <a
                className="flex items-center gap-x-2 w-max max-w-full hover:text-blue-500 dark:hover:text-pink-500"
                href={gist.owner?.url}
                rel="noreferrer"
                target="_blank"
              >
                {gist.owner?.avatarUrl && gist.owner?.login && (
                  <img
                    alt={gist.owner?.login}
                    className="rounded-full"
                    height={16}
                    src={gist.owner?.avatarUrl}
                    width={16}
                  />
                )}

                <span className="truncate">{gist.owner?.login}</span>
              </a>
            </section>

            {gist.url && (
              <section className="py-3">
                <div className="flex items-center mb-1 gap-x-2">
                  <CodeIcon />
                  <span className="font-bold">Source</span>
                </div>

                <a
                  className="flex w-max max-w-full hover:text-blue-500 dark:hover:text-pink-500"
                  href={gist.url}
                  rel="noreferrer"
                  target="_blank"
                >
                  <code className="truncate">{gist.name}</code>
                </a>
              </section>
            )}

            <section className="py-3">
              <div className="flex items-center mb-1 gap-x-2">
                <GitCommitIcon />
                <span className="font-bold">Revision</span>

                <span
                  className="
                    px-1.5
                    text-xs
                    rounded-sm
                    transition-background-color
                    cursor-default
                    text-gray-500
                    bg-gray-200
                    dark:text-gray-500
                    dark:bg-gray-700
                  "
                >
                  {gist.revision}
                </span>
              </div>

              <Revisions gist={gist} />
            </section>
          </div>
        </aside>
      </div>
    </>
  );
}

function Revisions({ gist }: Props): JSX.Element {
  const hasHistory = (gist.history?.length ?? 0) > 0;

  return (
    <div className="grid grid-flow-row gap-y-2">
      <span className="text-gray-400 dark:text-gray-500">
        {hasHistory ? 'Latest updates' : 'Last update'}:
      </span>

      {hasHistory ? (
        gist.history?.map((history, i) => {
          let additions = history.change_status?.additions ?? 0;
          let deletions = history.change_status?.deletions ?? 0;

          const title = [
            `${additions} addition${additions === 1 ? '' : 's'}`,
            `${deletions} deletion${deletions === 1 ? '' : 's'}`,
          ].join(' & ');

          const total = history.change_status?.total ?? 0;

          additions =
            total > 10 ? Math.trunc(additions / (total * 0.1)) : additions;

          deletions =
            total > 10 ? Math.trunc(deletions / (total * 0.1)) : deletions;

          const neutral = Math.max(10 - (additions + deletions), 0);

          return (
            <div
              className="flex items-center gap-x-2 text-xs"
              key={`history-${i}`}
            >
              {history.user?.login && history.user?.avatar_url && (
                <img
                  alt={history.user?.login}
                  className="rounded-full"
                  height={16}
                  src={history.user?.avatar_url}
                  title={history.user?.login}
                  width={16}
                />
              )}

              <div
                className="grid grid-flow-col lg:grid-flow-row gap-2 lg:gap-1"
                title={title}
              >
                <code className="cursor-default">
                  <span>
                    {dayjs(history.committed_at).format('YYYY-MM-DD HH:mm')}
                  </span>

                  <span className="transition-colors text-gray-300 dark:text-gray-600">
                    {dayjs(history.committed_at).format('Z')}
                  </span>
                </code>

                <div className="flex items-center gap-x-px">
                  {[...new Array(additions)].map((_, i) => (
                    <div
                      className="
                        w-2
                        h-2
                        border
                        rounded-sm
                        transition-background-border-color
                        bg-green-200
                        border-green-300
                        dark:bg-green-500
                        dark:border-green-500
                      "
                      key={`additions-${i}`}
                    />
                  ))}

                  {[...new Array(deletions)].map((_, i) => (
                    <div
                      className="
                        w-2
                        h-2
                        border
                        rounded-sm
                        transition-background-border-color
                        bg-red-200
                        border-red-300
                        dark:bg-red-400
                        dark:border-red-400
                      "
                      key={`deletions-${i}`}
                    />
                  ))}

                  {[...new Array(neutral)].map((_, i) => (
                    <div
                      className="
                        w-2
                        h-2
                        border
                        rounded-sm
                        transition-background-border-color
                        bg-gray-100
                        border-gray-200
                        dark:bg-gray-700
                        dark:border-gray-600
                      "
                      key={`neutral-${i}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <code>
          <span>{dayjs(gist.updatedAt).format('YYYY-MM-DD HH:mm')}</span>

          <span className="text-gray-300 dark:text-gray-600">
            {dayjs(gist.updatedAt).format('Z')}
          </span>
        </code>
      )}

      {hasHistory && (
        <a
          className="w-max max-w-full hover:text-blue-500 dark:hover:text-pink-500"
          href={`${gist.url}/revisions`}
          rel="noreferrer"
          target="_blank"
        >
          All revisions <ChevronRightIcon />
        </a>
      )}
    </div>
  );
}

type Params = { id: string };

export async function getStaticPaths(): Promise<GetStaticPathsResult<Params>> {
  const { gists } = await getAllGists();

  return {
    paths: gists.map((gist) => ({ params: { id: gist.name } })),
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<Params>): Promise<GetStaticPropsResult<Props>> {
  const gist = params && (await getGistById(params.id));
  return gist ? { props: { gist } } : { notFound: true };
}
