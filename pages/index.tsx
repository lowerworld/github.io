import { TagIcon } from '@primer/octicons-react';
import dayjs from 'dayjs';
import { GetStaticPropsResult } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Tags from '~/components/tags';
import { getAllGists } from '~/lib/api';
import site from '~/site.config';
import { Gist } from '~/types/gist';

type Props = { gists: Gist[]; tags: string[]; selectedTag?: string };

export default function Index({
  gists,
  tags,
  selectedTag,
}: Props): JSX.Element {
  return (
    <>
      {selectedTag && (
        <Head>
          <title>{`Tag: ${selectedTag} - ${site.html.title}`}</title>
        </Head>
      )}

      <div className="flex flex-col-reverse lg:flex-row my-4 lg:gap-x-4">
        <nav className="hidden lg:block lg:flex-1" />

        <div className="container lg:max-w-screen-md 2xl:max-w-screen-lg border-t lg:border-t-0 divide-y dark:divide-gray-700">
          {gists.map((gist) => (
            <article
              className="pt-4 lg:first:pt-0 pb-3"
              key={`article-${gist.name}`}
            >
              <div className="grid grid-flow-row">
                <Link
                  href={{ pathname: '/posts/[id]', query: { id: gist.name } }}
                >
                  <a className="lg:w-max lg:max-w-full text-xl lg:text-2xl hover:text-blue-500 dark:hover:text-pink-500">
                    {gist.title}
                  </a>
                </Link>

                <p className="mb-2 transition-colors text-gray-300 dark:text-gray-600">
                  {`${gist.name.substring(0, 8)} - ${dayjs(
                    gist.createdAt
                  ).format('YYYY-MM-DD HH:mmZ')}`}
                </p>

                <div className="text-sm">
                  <Tags tags={gist.tags} link={false} />
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="lg:flex-1 mb-2 lg:mb-0 text-sm">
          {tags.length > 0 && (
            <div className="grid grid-cols-1 divide-y">
              <section className="pb-1">
                <div className="flex items-center mb-2 gap-x-2">
                  <TagIcon />
                  <span className="font-bold">Tags</span>
                </div>

                <Tags tags={tags} selectedTag={selectedTag} />
              </section>
            </div>
          )}
        </aside>
      </div>
    </>
  );
}

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  const { gists, tags } = await getAllGists();
  return { props: { gists, tags } };
}
