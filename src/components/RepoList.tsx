import React from 'react';
import { Typography, makeStyles, Grid } from '@material-ui/core';
import { useDebounce } from 'use-debounce';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

import RepositoryItem, { SkeletonRepositoryCard } from './RepositoryItem';

const useStyles = makeStyles({
  note: {
    marginTop: '1rem',
    textAlign: 'center',
  },
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '1rem',
  },
  repoWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    marginTop: '1rem',
  },
});

export const SEARCH_FOR_REPOS = gql`
  query($search_term: String!) {
    search(query: $search_term, type: REPOSITORY, first: 10) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            id
            name
            description
            createdAt
            languages(first: 3) {
              totalCount
              edges {
                node {
                  id
                  color
                  name
                }
              }
            }
            owner {
              login
              avatarUrl
            }
            stargazers {
              totalCount
            }
          }
        }
      }
    }
  }
`;

export interface RepoDetails {
  node: {
    id: string;
    name: string;
    description: string | null;
    createdAt: string;
    owner: {
      login: string;
      avatarUrl: string;
    };
    stargazers: {
      totalCount: number;
    };
    languages: {
      totalCount: number;
      edges: {
        node: {
          id: string;
          name: string;
          color: string;
        };
      }[];
    };
  };
}

interface SearchRepoData {
  search: {
    repositoryCount: string;
    edges: RepoDetails[];
  };
}

interface SearchRepoVars {
  search_term: string;
}

const RepositoryList: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
  const classes = useStyles();
  const [expandedRepo, setExpandedRepo] = React.useState<number | null>(null);
  const [deboucedSearchKey] = useDebounce(searchTerm, 500);

  const { data, loading, error } = useQuery<SearchRepoData, SearchRepoVars>(
    SEARCH_FOR_REPOS,
    { variables: { search_term: deboucedSearchKey } }
  );

  // Reset every time the data change
  // We make sure the repos shrink when we make a new search
  React.useEffect(() => {
    setExpandedRepo(null);
  }, [data]);

  if (loading && searchTerm.length > 1)
    return (
      <Grid container spacing={4} wrap="wrap" style={{ marginTop: '1rem' }}>
        <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
          <SkeletonRepositoryCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
          <SkeletonRepositoryCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
          <SkeletonRepositoryCard />
        </Grid>
      </Grid>
    );

  if (error)
    return (
      <Typography
        variant={'overline'}
        className={classes.note}
        component={'div'}
        color={'error'}
      >
        {error}
      </Typography>
    );

  if (!loading && searchTerm.length && data && !data.search.repositoryCount)
    return (
      <Typography
        variant={'overline'}
        className={classes.note}
        component={'div'}
      >
        There are no such repositories!
      </Typography>
    );

  return (
    <Grid container spacing={4} wrap="wrap" style={{ marginTop: '1rem' }}>
      {data &&
        data.search.edges.map((repo, i) => (
          <Grid key={repo.node.id} item xs={12} sm={6} md={4} lg={4} xl={3}>
            <RepositoryItem repo={repo} expanded={expandedRepo === i} key={i} />
          </Grid>
        ))}
    </Grid>
  );
};

export default RepositoryList;

// const dummy: RepoDetails = {
//   node: {
//     id: 'MDEwOlJlcG9zaXRvcnkyMDUwNjExNDM=',
//     name: 'kirirom-code-review-dojo',
//     description: 'null',
//     createdAt: '2016-12-24T13:26:25Z',
//     languages: {
//       totalCount: 2,
//       edges: [
//         {
//           node: {
//             id: 'MDg6TGFuZ3VhZ2U0MTc=',
//             color: '#e34c26',
//             name: 'HTML',
//           },
//         },
//         {
//           node: {
//             id: 'MDg6TGFuZ3VhZ2UxNDA=',
//             color: '#f1e05a',
//             name: 'JavaScript',
//           },
//         },
//       ],
//     },
//     owner: {
//       login: 'tigerscave',
//       avatarUrl: 'https://avatars.githubusercontent.com/u/5348007?v=4',
//     },
//     stargazers: {
//       totalCount: 1,
//     },
//   },
// };
// return (
//   <Grid container spacing={10}>
//     <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
//       {loading ? (
//         <RepositoryItem
//           expanded={false}
//           onToggled={() => {}}
//           key={10}
//           isLoading
//         />
//       ) : (
//         <RepositoryItem
//           repo={dummy}
//           expanded={false}
//           onToggled={() => {}}
//           key={10}
//           isLoading
//         />
//       )}
//     </Grid>
//   </Grid>
// );
