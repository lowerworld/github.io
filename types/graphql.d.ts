export namespace GitHub {
  export type Gist = {
    createdAt: string;
    files?: (
      | {
          extension?: string;
          isTruncated: boolean;
          name?: string;
          text?: string;
        }
      | undefined
    )[];
    isPublic: boolean;
    name: string;
    owner?: {
      avatarUrl: string;
      login: string;
      url: string;
    };
    updatedAt: string;
    url: string;
  };

  export namespace Query {
    export type Gists = {
      user: {
        gists: {
          nodes?: (GitHub.Gist | undefined)[];
          pageInfo: {
            endCursor: string;
            hasNextPage: boolean;
          };
        };
      };
    };

    export type Gist = {
      user: {
        gist: GitHub.Gist;
      };
    };
  }
}
