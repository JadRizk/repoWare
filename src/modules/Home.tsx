import React from 'react';
import logo from "../logo.svg";

import { useQuery, gql } from "@apollo/client";

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
  const { loading, data } = useQuery<UsernameData>(GET_USERNAME);
  console.log(data);
    return (
      <header className="App-header">
        {loading ? (
          <>
            <img src={logo} className="App-logo" alt="logo" />
            <p>Loading</p>
          </>
        ) : (
          <div>{data && data.viewer.login }</div>
        )}
      </header>
    );
}

export default Home;