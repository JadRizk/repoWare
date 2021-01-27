import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import { Typography, Container } from '@material-ui/core';
import { useQuery, gql } from '@apollo/client';

import SearchBar from 'components/SearchBar';
import RepositoryList from 'components/RepoList';

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
  },
  skeletonWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

interface UsernameData {
  viewer: {
    login: string;
  };
}

const GET_USERNAME = gql`
  query {
    viewer {
      login
    }
  }
`;

const Home: React.FC = () => {
  const classes = useStyles();
  const { loading, data } = useQuery<UsernameData>(GET_USERNAME);
  // const loading = true;

  const [searchKey, setSearchKey] = React.useState('');

  const handleOnClear = () => setSearchKey('');

  return (
    <>
      {loading ? (
        <div className={`${classes.skeletonWrapper} ${classes.wrapper}`}>
          <Skeleton animation="wave" width="35%" height={80} />
          <Skeleton animation="wave" width="80%" height={65} />
        </div>
      ) : (
        <Container className={classes.wrapper}>
          <Typography variant={'h3'} className={classes.title}>
            {`Welcome ${data?.viewer.login}`}
          </Typography>
          <SearchBar
            value={searchKey}
            onChange={setSearchKey}
            onClear={handleOnClear}
          />
          <RepositoryList searchTerm={searchKey} />
        </Container>
      )}
    </>
  );
};

export default Home;
