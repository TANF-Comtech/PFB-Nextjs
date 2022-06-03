import { useMemo } from 'react';
import { ApolloClient, InMemoryCache, SchemaLink } from '@apollo/client';
import { PrismicLink } from 'apollo-link-prismic';
import { API_TOKEN } from '../api';

// const API_TOKEN = process.env.PRISMIC_API_TOKEN
let apolloClient;

// This is mostly from next.js official repo on how best to integrate Next and Apollo
function createIsomorphLink() {
  if (typeof window === 'undefined') {
    // return new SchemaLink({ schema }) // when we have to integrate with salesforce
    return null;
  } else {
    return new PrismicLink({
      uri: `https://peopleforbikes.prismic.io/graphql`,
      accessToken: API_TOKEN,
    });
  }
}

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createIsomorphLink(),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
