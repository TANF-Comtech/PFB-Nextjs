import * as prismic from '@prismicio/client';
import * as prismicH from '@prismicio/helpers';
import { enableAutoPreviews } from '@prismicio/next';
import { stripIgnoredCharacters } from 'graphql';

const API_TOKEN = `${process.env.PRISMIC_API_TOKEN}`;
export const REPOSITORY = 'PeopleforBikes';
export const API_LOCALE = 'en-us';
export const REF_API_URL = `https://${REPOSITORY}.prismic.io/api/v2`;
export const GRAPHQL_API_URL = `https://${REPOSITORY}.prismic.io/graphql`;

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config {prismicNext.CreateClientConfig} - A configuration object to
 */
export const prismicClient = prismic.createClient(prismic.getEndpoint(REPOSITORY), {
  accessToken: API_TOKEN,
});

export const linkResolver = (doc) => {
  switch (doc.type) {
    case 'new_homepage':
      return '/';
    case 'news':
      return `/news/${doc.uid}`;
    case 'topic':
      return `/topics/${doc.uid}`;
    default:
      return null;
  }
};

export const createClient = ({ previewData }) => {
  const client = prismic.createClient(prismic.getEndpoint(REPOSITORY), {
    accessToken: API_TOKEN,
    previewData,
  });

  enableAutoPreviews({ client, previewData });

  return client;
};

export const getPrismicData = async (query, options = { variables: {}, previewData: {} }) => {
  const { variables, previewData } = options;
  const condensedQuery = stripIgnoredCharacters(query);

  const client = createClient({ previewData });

  const response = await client.graphQLFetch(
    `${GRAPHQL_API_URL}?query=${condensedQuery}&variables=${JSON.stringify(variables)}`,
  );

  if (response.status !== 200) {
    console.log(await response.text());
    throw new Error('Failed to fetch Prismic data');
  }

  const json = await response.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch Prismic data');
  }

  return json.data;
};
