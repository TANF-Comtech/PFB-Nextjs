import { API_LOCALE, fetchAPI } from '../api'
import { actionitemSliceFields, promoSliceFields } from './fragments'

import { resultsReducer } from '../resultsReducer'

/**
 * !!!!!!!!!!!!!!!!!
 * Test all queries to know what you are getting back 
 * https://peopleforbikes.prismic.io/graphql
 */

// Gets all landing pages, uses resultsReducer because we have more than 20
export async function getLandingPages() {
  const nodeQuery = `{
    _meta {
      id
      uid
    }
  }`

  // Call reducer so we can have 20+ records
  return resultsReducer(`allLanding_pages`, `title_ASC`, nodeQuery);  
}

// This is a query to get each Page by its uid, so we have to programmatically provide that uid
export async function getSingleLandingPage(uid, previewData) {
  const data = await fetchAPI(`
    query LandingPage($uid: String!, $lang: String!) {
      landing_page(uid: $uid, lang: $lang) {
        _meta {
          uid
          id
        }
        title
        summary
        header_image
        main_text
        secondary_text
        body {
          __typename
          ... on Landing_pageBodyAction_item {
            fields {
              ${actionitemSliceFields}
            }
          }
          __typename
          ... on Landing_pageBodyContent_block {
            primary {
              main_content
            }
          }
          __typename
          ... on Landing_pageBodyMission_content {
            fields {
              pillar_title
              pillar_content
            }
            primary {
              pillar_title
            }
          }     
          __typename
          ... on Landing_pageBodyPromo {
            primary {
              ${promoSliceFields}
            }
          }                 
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