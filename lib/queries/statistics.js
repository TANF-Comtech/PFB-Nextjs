import { fetchAPI, API_LOCALE } from '../api'

import { resultsReducer } from '../resultsReducer'
import { linkFields } from './fragments'

/**
 * !!!!!!!!!!!!!!!!!
 * Test all queries to know what you are getting back 
 * https://peopleforbikes.prismic.io/graphql
 */

// getStats() gets us every statistics page, exciting
export async function getStats() {
  const nodeQuery = `{
    title
    main_content
    _meta {
      id
      uid
      type
    }
  }`

  // Call reducer so we can have 20+ records
  return resultsReducer(`allStatistic_pages`, `title_ASC`, nodeQuery);  
}