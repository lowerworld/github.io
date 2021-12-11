import { Endpoints } from '@octokit/types';
import { GitHub } from '~/types/graphql';

type History = NonNullable<
  Endpoints['GET /gists/{gist_id}']['response']['data']['history']
>[0];

export type Gist = Omit<GitHub.Gist, 'url'> & {
  url?: string;
  title: string;
  tags: string[];
  content?: string;
  revision?: number;
  history?: ({
    user?: Pick<NonNullable<History['user']>, 'login' | 'avatar_url'>;
  } & Pick<History, 'committed_at' | 'change_status'>)[];
};
