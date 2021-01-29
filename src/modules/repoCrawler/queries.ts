import { gql } from '@apollo/client';

// Get logged in user
export const GET_USERNAME = gql`
  query {
    viewer {
      login
    }
  }
`;

// Search repo by keyword
// Todo: add support for stars selection
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

// Get the 20 most recent issues linked to the selected repo
export const GET_REPO_ISSUES = gql`
  query($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
      issues(
        first: 20
        states: [OPEN]
        orderBy: { field: CREATED_AT, direction: DESC }
      ) {
        totalCount
        nodes {
          title
          bodyHTML
          createdAt
        }
      }
    }
  }
`;
