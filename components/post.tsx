import { MDXProvider } from '@mdx-js/react';
import dayjs from 'dayjs';
import Head from 'next/head';
import { ImageProps } from 'next/image';
import Link from 'next/link';
import Image from '~/components/image';
import site from '~/site.config';
import markdownStyles from '~/styles/markdown';
import { PostType } from '~/types/post';

type Props = { meta: PostType.Meta; children: JSX.Element };

export default function Post({ meta, children }: Props): JSX.Element {
  const title = meta.title ?? 'Untitled';

  return (
    <>
      <Head>
        <title>{`${title} - ${site.html.title}`}</title>
      </Head>

      <article className="-mt-14 pb-10">
        <header className="bg-gradient-to-b from-violet-50 via-sky-50 to-white dark:from-inherit dark:to-inherit">
          <div className="container mx-auto max-w-screen-lg px-4 pt-24 pb-10 xl:px-0 2xl:max-w-screen-xl">
            <div className="prose prose-zinc prose-sky flex max-w-none flex-col items-start gap-y-2 prose-a:underline-offset-2 dark:prose-invert sm:items-center">
              <div className="flex gap-x-2">
                {dayjs(meta.date).format('MMMM D, YYYY')}
                <span className="text-sky-600 dark:text-sky-500">{'//'}</span>
                <span>{meta.id.split('-')[0]}</span>
              </div>

              <h1 className="my-0 text-left sm:text-center">{title}</h1>

              {!!meta.tags?.length && (
                <div className="flex gap-x-2">
                  <span className="whitespace-nowrap">Tagged with:</span>

                  <div className="flex flex-wrap gap-x-2 gap-y-1">
                    {meta.tags.map((tag) => (
                      <Link
                        href={{ pathname: '/tags/[tag]', query: { tag } }}
                        key={`tag-${tag}`}
                      >
                        <a className="break-all">{tag}</a>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="container mx-auto max-w-screen-lg px-4 xl:px-0 2xl:max-w-screen-xl">
          <div
            className="prose prose-zinc prose-sky max-w-none prose-h2:border-b-2 prose-h2:pb-2 prose-a:underline-offset-2 prose-pre:border prose-pre:border-zinc-700/50 dark:prose-invert dark:prose-h2:border-b-zinc-700"
            css={markdownStyles}
          >
            <MDXProvider
              components={{
                img: (props) => <Image {...(props as ImageProps)} />,
              }}
            >
              {children}
            </MDXProvider>
          </div>
        </div>
      </article>
    </>
  );
}
