import { gql } from '@apollo/client';

export const GET_USERNAME = gql`
  query {
    viewer {
      login
    }
  }
`;

export const SEARCH_FOR_REPOS = gql`
  query($search_term: String!, $cursor: String) {
    search(query: $search_term, type: REPOSITORY, first: 15, after: $cursor) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            id
            name
            descriptionHTML
            createdAt
            owner {
              login
              avatarUrl
            }
            stargazers {
              totalCount
            }
          }
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
