import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const cache = new InMemoryCache({
  dataIdFromObject: object => object.key || null
})

const client = new ApolloClient({
  link: createHttpLink({ uri: 'http://query.erspilot.net/graphql?dev=twollegPBxv1pV82fws9'}),
  cache: cache,
});

export default client;