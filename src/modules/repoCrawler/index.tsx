import React from 'react';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import SearchBar from 'components/SearchBar';
import RepositoryList from 'modules/repoCrawler/components/RepoList';

import { GET_USERNAME } from './queries';
import { UsernameData } from './types';

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

  // Create query that fetches the username of the logged in token
  const { loading, data } = useQuery<UsernameData>(GET_USERNAME);

  // Handles the input clear event
  const handleOnClear = () => setSearchKey('');

  // Render the view skeleton loader
  if (loading && !data) return <ViewLoader />;

  // Render the main repo crawler view
  return (
    <Container className={classes.wrapper}>
      <Typography variant={'h3'} className={classes.title}>
        {`Welcome ${data?.viewer.login}!`}
      </Typography>
      <SearchBar
        value={searchKey}
        onChange={setSearchKey}
        onClear={handleOnClear}
      />
      <RepositoryList searchTerm={searchKey} />
    </Container>
  );
};

export default RepoCrawler;
