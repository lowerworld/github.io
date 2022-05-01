import { ChevronRightIcon, XCircleIcon } from '@primer/octicons-react';
import dayjs from 'dayjs';
import { GetStaticPropsResult } from 'next';
import Link from 'next/link';
import { getAllPosts } from '~/lib/api.mjs';
import { PostType } from '~/types/post';

export type Props = {
  posts: { meta: PostType.Meta }[];
  tags: string[];
  tag?: string;
};

export default function Index({ posts, tags, ...props }: Props): JSX.Element {
  return (
    <div className="container mx-auto mt-10 flex max-w-screen-lg gap-x-8 px-4 pb-10 xl:px-0 2xl:max-w-screen-xl">
      {!!tags.length && (
        <nav className="hidden w-60 flex-col sm:block">
          <ul className="flex flex-col divide-y divide-zinc-200 dark:divide-zinc-700">
            {tags.map((tag) => (
              <li key={`tag-${tag}`}>
                <Link
                  href={
                    tag === props.tag
                      ? '/'
                      : { pathname: '/tags/[tag]', query: { tag } }
                  }
                >
                  <a className="flex items-center px-2 py-4">
                    <span
                      className={
                        tag === props.tag
                          ? 'flex-1 truncate text-sky-600 dark:text-sky-500'
                          : 'flex-1 truncate dark:text-white'
                      }
                    >
                      {tag}
                    </span>

                    {tag === props.tag && (
                      <XCircleIcon className="ml-2 text-zinc-300 dark:text-zinc-600" />
                    )}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <div className="flex flex-1 flex-col gap-y-4">
        <h1 className="flex gap-x-1 text-zinc-400 dark:text-zinc-500 sm:hidden">
          <span>Posts</span>

          {props.tag && (
            <>
              <ChevronRightIcon className="h-6 text-sky-600 dark:text-sky-500" />
              <span>{props.tag}</span>
            </>
          )}
        </h1>

        <div className="flex flex-col gap-y-10">
          {posts.map((post) => (
            <article key={`article-${post.meta.id}`}>
              <div className="prose prose-zinc prose-sky flex max-w-none flex-col items-start gap-y-2 prose-a:underline-offset-2 dark:prose-invert">
                <Link
                  href={{
                    pathname: '/posts/[id]',
                    query: { id: post.meta.id },
                  }}
                >
                  <a className="no-underline">
                    <h2 className="my-0">{post.meta.title ?? 'Untitled'}</h2>
                  </a>
                </Link>

                <blockquote className="my-0 ml-2 font-normal not-italic text-inherit">
                  {post.meta.description && (
                    <span className="my-0 text-zinc-400 dark:text-zinc-500">
                      {post.meta.description}
                    </span>
                  )}

                  <div className="flex gap-x-2">
                    {dayjs(post.meta.date).format('MMMM D, YYYY')}

                    <span className="text-sky-600 dark:text-sky-500">
                      {'//'}
                    </span>

                    <span>{post.meta.id.split('-')[0]}</span>
                  </div>

                  {!!post.meta.tags?.length && (
                    <div className="flex flex-wrap gap-x-2 gap-y-1">
                      {post.meta.tags.map((tag) => (
                        <Link
                          href={{ pathname: '/tags/[tag]', query: { tag } }}
                          key={`tag-${tag}`}
                        >
                          <a className="break-all">{tag}</a>
                        </Link>
                      ))}
                    </div>
                  )}
                </blockquote>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  const { posts, tags } = await getAllPosts();
  return { props: { posts, tags } };
}
