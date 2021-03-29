import algoliasearch from 'algoliasearch'

// Set up env variables
export const ALGOLIA_APP_ID = "LDKAZTUYVN"
export const ALGOLIA_CRUD_API_TOKEN = process.env.ALGOLIA_CRUD_API_TOKEN
export const ALGOLIA_READ_API_TOKEN = "bdf113eb8d63adb9bf3c0cd6e401e439"
export const ALGOLIA_INDEX_NAME = "MAINSITE"

// Applies API keys into algoliasearch
// See: https://www.algolia.com/doc/guides/sending-and-managing-data/send-and-update-your-data/how-to/importing-with-the-api/

// Client side key insertion
export const AlgoliaReactClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_READ_API_TOKEN);

// NOTE - this can only be run server-side, requires CRUD token which cannot be presented in a client
export const AlgoliaClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_CRUD_API_TOKEN);

// Sets up the mechanism to make API calls
export const AlgoliaIndex = AlgoliaClient.initIndex(ALGOLIA_INDEX_NAME);

