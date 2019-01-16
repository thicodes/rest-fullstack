import React from 'react';
import { hot } from 'react-hot-loader';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { setContext } from 'apollo-link-context';
import { RestLink } from 'apollo-link-rest';

import Routes from './Routes';
import './style.css';

// Setup auth and store token
const authRestLink = setContext((_, { headers }) => {
  const token = window.localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token,
    },
  };
});

// Setup the domain of your endpoint here
const restLink = new RestLink({
  uri: 'http://jsonplaceholder.typicode.com',
});

const client = new ApolloClient({
  link: authRestLink.concat(restLink),
  cache: new InMemoryCache(),
});

const App: React.SFC<{}> = () => (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

export default hot(module)(App);
