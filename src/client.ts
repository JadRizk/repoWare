import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Create an HttpLink with Github GraphQL endpoint
const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GITHUB_GRAPHQL_API,
});

// Get the personal access token
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_GRAPHQL_TOKEN;

// Setup the authorization header for every request
const authLink = setContext((_, { headers }) => ({
    headers: {
        ...headers,
        authorization: GITHUB_TOKEN ? `Bearer ${GITHUB_TOKEN}` : "",
    }
}
));

// Create the client
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export default client