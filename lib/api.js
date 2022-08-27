import * as prismic from '@prismicio/client';
import * as prismicH from '@prismicio/helpers';
import * as prismicNext from '@prismicio/next';
import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client';

const REPOSITORY = 'PeopleforBikes';
const API_TOKEN = `${process.env.PRISMIC_API_TOKEN}`;
export const API_LOCALE = 'en-us';
export const REF_API_URL = `https://${REPOSITORY}.prismic.io/api/v2`;

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config {prismicNext.CreateClientConfig} - A configuration object to
 */
const prismicClient = prismic.createClient(prismic.getEndpoint(REPOSITORY), {
  accessToken: API_TOKEN,
  routes: [
    {
      type: 'page',
      path: '/:uid',
    },
  ],
});

export const apolloClient = new ApolloClient({
  ssrMode: true,
  link: new HttpLink({
    uri: prismic.getGraphQLEndpoint(REPOSITORY),
    fetch: prismicClient.graphqlFetch,
    useGETForQueries: true,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Accept-Language': `${API_LOCALE}`,
      'Authorization': `Token ${API_TOKEN}`,
    },
  }),
  cache: new InMemoryCache(),
});

export const getPrismicData = async (query, options = { variables: {} }) => {
  const { variables } = options;

  const { data, error } = await apolloClient.query({
    query: gql`
      ${query}
    `,
    variables,
  });

  if (error) {
    console.log('Error getting Prismic data!');
  }

  return data;
};
