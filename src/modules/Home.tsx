import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { useQuery, gql } from '@apollo/client';
import logo from '../logo.svg';

// Declare styles
const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: '1rem',
    [theme.breakpoints.down('sm')]: {
      marginTop: '3rem',
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: '4rem',
    },
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
  // const data = {
  //   viewer: {
  //     login: 'JR'
  //   }
  // };
  // const loading= false;

  return (
    <div className={classes.wrapper}>
      {loading ? (
        <>
          <img src={logo} className="App-logo" alt="logo" />
          <p>Loading</p>
        </>
      ) : (
        <>
          <div>{data && data.viewer.login}</div>
        </>
      )}
    </div>
  );
};

export default Home;
