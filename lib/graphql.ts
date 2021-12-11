import gql from 'graphql-tag';

export enum GistPrivacy {
  PUBLIC = 'PUBLIC',
  ALL = 'ALL',
}

const gistFragment = gql`
  fragment GistFragment on Gist {
    createdAt
    files {
      extension
      isTruncated
      name
      text
    }
    isPublic
    name
    owner {
      avatarUrl
      login
      url
    }
    updatedAt
    url
  }
`;

export const query = {
  gists:
    gql`
      query Gists(
        $login: String!
        $after: String
        $first: Int = 30
        $privacy: GistPrivacy = PUBLIC
      ) {
        user(login: $login) {
          gists(
            after: $after
            first: $first
            orderBy: { direction: DESC, field: CREATED_AT }
            privacy: $privacy
          ) {
            nodes {
              ...GistFragment
            }
            pageInfo {
              endCursor
              hasNextPage
            }
          }
        }
      }
      ${gistFragment}
    `.loc?.source.body ?? '',
  gist:
    gql`
      query Gist($login: String!, $name: String!) {
        user(login: $login) {
          gist(name: $name) {
            ...GistFragment
          }
        }
      }
      ${gistFragment}
    `.loc?.source.body ?? '',
};
