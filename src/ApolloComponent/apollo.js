import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
  mutate: {
    errorPolicy: 'all',
  },
};

const cache = new InMemoryCache({
  dataIdFromObject: object => object.key || null
})

const client = new ApolloClient({
  link: createHttpLink({ uri: 'http://query.erspilot.net/graphql?dev=twollegPBxv1pV82fws9'}),
  cache: cache,
  defaultOptions,
});

export default client;