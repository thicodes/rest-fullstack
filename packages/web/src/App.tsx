import React from 'react';
import { hot } from 'react-hot-loader';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { RestLink } from 'apollo-link-rest';

import Routes from './Routes';
import './style.css';

const restLink = new RestLink({
  uri: 'http://jsonplaceholder.typicode.com',
});

const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache(),
});

const App: React.SFC<{}> = () => (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

export default hot(module)(App);
