import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDebounce } from 'use-debounce';
import { useQuery } from '@apollo/client';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

import { SEARCH_FOR_REPOS } from 'modules/repoCrawler/queries';
import {
  RepoDetails,
  SearchRepoData,
  SearchRepoVars,
} from 'modules/repoCrawler/types';
import RepositoryItem, { SkeletonRepositoryCard } from './RepositoryItem';

const useStyles = makeStyles((theme) => ({
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
  infiniteScrollLoader: {
    width: '100%',
    textAlign: 'center',
    margin: '1rem 0',
  },
  repoListWrapper: {
    [theme.breakpoints.down('md')]: {
      width: '90%',
      marginTop: '1rem',
      margin: 'auto',
    },
  },
}));

// Infinite scroll loader component
const ScrollLoader: React.FC = () => {
  // Import style classes
  const { infiniteScrollLoader } = useStyles();
  // Render loader
  return (
    <div className={infiniteScrollLoader}>
      <CircularProgress />
    </div>
  );
};

interface RepositoryListProps {
  searchTerm: string;
  onRepoSelect: (repo: RepoDetails) => void;
}

const RepositoryList: React.FC<RepositoryListProps> = ({
  searchTerm,
  onRepoSelect,
}) => {
  // Import style classes
  const classes = useStyles();

  // Declare state for toggled repo id
  const [expandedRepo, setExpandedRepo] = React.useState<number | null>(null);

  // Debounce user's input for better search functionality
  const [deboucedSearchKey] = useDebounce(searchTerm, 500);

  // Create query that fetches github repos
  // Using cursor-based pagination
  // More info here: https://www.apollographql.com/docs/react/pagination/cursor-based/
  const { data, loading, error, fetchMore } = useQuery<
    SearchRepoData,
    SearchRepoVars
  >(SEARCH_FOR_REPOS, {
    variables: { search_term: deboucedSearchKey, cursor: null },
  });

  // We make sure the active repo is untoggled on new search
  React.useEffect(() => {
    setExpandedRepo(null);
  }, [data]);

  // Update query and merge results back to the main array
  // TODO: Refactor this section to leverage type policies introduced in Apollo 3
  // More info here: https://www.apollographql.com/docs/react/caching/cache-configuration/
  const updateQuery = (
    previousResult: SearchRepoData,
    options: {
      fetchMoreResult?: SearchRepoData | undefined;
      variables?: SearchRepoVars | undefined;
    }
  ) => {
    const { fetchMoreResult } = options;

    // If new content is loaded
    if (fetchMoreResult) {
      const newEdges = options.fetchMoreResult!.search.edges;
      const pageInfo = options.fetchMoreResult!.search.pageInfo;
      const repositoryCount = options.fetchMoreResult!.search.repositoryCount;

      // Add the new values to the list of repos
      return {
        search: {
          repositoryCount,
          edges: [...previousResult.search.edges, ...newEdges],
          pageInfo,
        },
      };
    }

    // If the user reached the end of the thread, return previous values
    return previousResult;
  };

  // Handles the 'load more' event
  const handleFetchMore = () => {
    // Previous cursor should be availble in the previous data obj
    if (data)
      return fetchMore({
        query: SEARCH_FOR_REPOS,
        variables: {
          search_term: searchTerm,
          cursor: data.search.pageInfo.endCursor,
        },
        updateQuery,
      });
  };

  // Card skeleton loader
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

  // Render in case no repo was found
  // TODO: Fix the bug related to this section being displayed during the debounce phase
  if (
    !loading &&
    searchTerm.length &&
    data &&
    data.search.repositoryCount === 0
  )
    return (
      <Typography
        variant={'overline'}
        className={classes.note}
        component={'div'}
      >
        There are no such repositories!
      </Typography>
    );

  if (data && data.search.repositoryCount) {
    return (
      <InfiniteScroll
        dataLength={data.search.edges.length}
        next={handleFetchMore}
        hasMore={data.search.pageInfo.hasNextPage}
        loader={<ScrollLoader />}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yey! You've reached the end </b>
          </p>
        }
      >
        <Grid
          container
          spacing={4}
          wrap="wrap"
          className={classes.repoListWrapper}
          style={{ marginTop: '1rem', padding: '0 1rem' }}
        >
          {data &&
            data.search.edges.map((repo, i) => (
              <Grid
                key={repo.node.id}
                item
                xs={12}
                sm={6}
                md={4}
                lg={4}
                xl={3}
                onClick={() => onRepoSelect(repo)}
              >
                <RepositoryItem
                  repo={repo}
                  expanded={expandedRepo === i}
                  key={i}
                />
              </Grid>
            ))}
        </Grid>
      </InfiniteScroll>
    );
  }

  return (
    <Typography variant={'overline'} className={classes.note} component={'div'}>
      A good place to render some ads :p
    </Typography>
  );
};

export default RepositoryList;
