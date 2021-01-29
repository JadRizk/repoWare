import React from 'react';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import SearchBar from 'components/SearchBar';
import RepositoryList from 'modules/repoCrawler/components/RepoList';

import { GET_USERNAME } from './queries';
import { RepoDetails, UsernameData } from './types';
import IssueDialog from './components/IssueDialog';

// Declare styles
const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    [theme.breakpoints.down('sm')]: {
      marginTop: '3rem',
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: '4rem',
    },
  },
  title: {
    marginTop: '1rem',
    marginBottom: '1rem',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem',
    },
  },
  skeletonWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const ViewLoader: React.FC = () => {
  const { skeletonWrapper, wrapper } = useStyles();
  return (
    <div className={`${skeletonWrapper} ${wrapper}`}>
      <Skeleton animation="wave" width="35%" height={80} />
      <Skeleton animation="wave" width="80%" height={65} />
    </div>
  );
};

const RepoCrawler: React.FC = () => {
  // Import style classes
  const classes = useStyles();

  // Search input state
  const [searchKey, setSearchKey] = React.useState('');

  const [selectedRepo, setSelectedRepo] = React.useState<{
    repoName: string;
    repoOwner: string;
  } | null>(null);

  // Create query that fetches the username of the logged in token
  const { loading, data } = useQuery<UsernameData>(GET_USERNAME);

  // Handles the input clear event
  const handleOnClear = () => setSearchKey('');

  // Handle repo selection from the list
  const handleOnSelection = (repo: RepoDetails) => {
    const {
      node: {
        name,
        owner: { login },
      },
    } = repo;

    setSelectedRepo({
      repoName: name,
      repoOwner: login,
    });
  };

  const handleOnDialogClose = () => {
    setSelectedRepo(null);
  };

  const handleStarSliderToggle = () => {
    console.log('Feature coming soon !');
  };

  // Render the view skeleton loader
  if (loading && !data) return <ViewLoader />;

  // Render the main repo crawler view
  return (
    <>
      <Container className={classes.wrapper}>
        <Typography variant={'h3'} className={classes.title}>
          {`Welcome ${data?.viewer.login}!`}
        </Typography>
        <SearchBar
          value={searchKey}
          onChange={setSearchKey}
          onClear={handleOnClear}
          onStarsToggle={handleStarSliderToggle}
        />
        <RepositoryList
          searchTerm={searchKey}
          onRepoSelect={handleOnSelection}
        />
      </Container>
      <IssueDialog
        isOpen={Boolean(selectedRepo)}
        onClose={handleOnDialogClose}
        {...selectedRepo}
      />
    </>
  );
};

export default RepoCrawler;
