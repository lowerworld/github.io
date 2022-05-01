import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import { getAllPosts } from '~/lib/api.mjs';
import Index, { Props } from '~/pages/index';

export default function Tags({ posts, tags, tag }: Props): JSX.Element {
  return <Index posts={posts} tags={tags} tag={tag} />;
}

type Params = { tag: string };

export async function getStaticPaths(): Promise<GetStaticPathsResult<Params>> {
  const { tags } = await getAllPosts();

  return {
    paths: tags.map((tag) => ({ params: { tag } })),
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<Params>): Promise<GetStaticPropsResult<Props>> {
  const { posts, tags } = params
    ? await getAllPosts().then(({ posts, tags }) => ({
        posts: posts.filter((post) => post.meta.tags?.includes(params.tag)),
        tags,
      }))
    : { posts: [], tags: [] };

  return posts.length
    ? { props: { posts, tags, tag: params?.tag } }
    : { notFound: true };
}
