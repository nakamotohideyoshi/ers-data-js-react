import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';


const client = new ApolloClient({
  link: createHttpLink({ uri: 'http://query.erspilot.net/graphql?dev=twollegPBxv1pV82fws9'}),
  cache: new InMemoryCache(),
});

ReactDOM.render
( 
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>, 
  document.getElementById('root')
);
registerServiceWorker();
