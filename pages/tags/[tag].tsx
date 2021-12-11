import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import { getAllGists } from '~/lib/api';
import Index from '~/pages/index';
import { Gist } from '~/types/gist';

type Props = { gists: Gist[]; tags: string[]; selectedTag: string };

export default function Tag({ gists, tags, selectedTag }: Props): JSX.Element {
  return <Index gists={gists} tags={tags} selectedTag={selectedTag} />;
}

type Params = { tag: string };

export async function getStaticPaths(): Promise<GetStaticPathsResult<Params>> {
  const { tags } = await getAllGists();

  return {
    paths: tags.map((tag) => ({ params: { tag } })),
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<Params>): Promise<GetStaticPropsResult<Props>> {
  const { gists, tags } = await getAllGists();

  return params && gists.length > 0
    ? {
        props: {
          gists: gists.filter((gist) =>
            gist.tags.some((tag) => tag === params.tag)
          ),
          tags,
          selectedTag: params.tag,
        },
      }
    : { notFound: true };
}
