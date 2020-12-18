import { fetchAPI, API_LOCALE } from '../api'

import { resultsReducer } from '../resultsReducer'
import { linkFields } from './fragments'

/**
 * !!!!!!!!!!!!!!!!!
 * Test all queries to know what you are getting back 
 * https://peopleforbikes.prismic.io/graphql
 */

// Get all Grant Cycles
// getGrants is getting all of the grants for us, dumping onto one page
export async function getGrants() {
  const nodeQuery = `{
    title
    main_content
    amount
    type
    cycle
    _meta {
      id
      uid
      type
    }
  }`

  // Call reducer so we can have 20+ records
  return resultsReducer(`allGrants`, `title_ASC`, nodeQuery);  
}

export async function getSingleGrantPage(uid, previewData) {
  const data = await fetchAPI(`
    query GrantByUID($uid: String!, $lang: String!) {
      grant(uid: $uid, lang: $lang) {
        title
        main_content
        _meta {
          uid
          id
        }
        amount
        type
        cycle
        location1 {
          __typename
          ... on Locations {
            location
            _meta {
              id
              uid
              type
            }
          }
        }
        city
        link {
          ${ linkFields }
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