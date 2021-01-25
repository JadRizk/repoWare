import React from "react";
import { ApolloProvider } from "@apollo/client";

import client from "./client";
import Home from "./modules/Home";

import "./App.css";

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Home />
      </div>
    </ApolloProvider>
  );
};

export default App;
