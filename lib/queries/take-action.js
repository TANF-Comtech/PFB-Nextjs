import { fetchAPI, API_LOCALE } from '../api'

import { resultsReducer } from '../resultsReducer'
import { linkFields } from './fragments'

/**
 * !!!!!!!!!!!!!!!!!
 * Test all queries to know what you are getting back 
 * https://peopleforbikes.prismic.io/graphql
 */

// getStats() gets us every statistics page, exciting
export async function getActions() {
  const nodeQuery = `{
    title
    form_id
    _meta {
      id
      uid
      type
    }
  }`

  // Call reducer so we can have 20+ records
  return resultsReducer(`allActions`, `meta_lastPublicationDate_DESC`, nodeQuery);  
}

export async function getSingleActionPage(uid, previewData) {
  const data = await fetchAPI(`
    query ActionByUID($uid: String!, $lang: String!) {
      action(uid: $uid, lang: $lang) {
        title
        form_id
        _meta {
          uid
          id
        }
      }
    }
  `,
    {
      previewData,
      variables: {
        uid,
        lang: API_LOCALE,
      },
    }
  )

  return data
}