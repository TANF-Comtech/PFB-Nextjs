import algoliasearch from 'algoliasearch'

export const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID
export const ALGOLIA_CREATE_API_TOKEN = process.env.ALGOLIA_CREATE_API_TOKEN
export const ALGOLIA_INDEX_NAME = process.env.ALGOLIA_INDEX_NAME

export const AlgoliaClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_CREATE_API_TOKEN);
export const AlgoliaIndex = AlgoliaClient.initIndex(ALGOLIA_INDEX_NAME);

 