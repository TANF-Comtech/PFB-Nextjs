import { fetchAPI, API_LOCALE } from '../api'
import { resultsReducer } from '../resultsReducer'

/**
 * !!!!!!!!!!!!!!!!!
 * Test all queries to know what you are getting back 
 * https://peopleforbikes.prismic.io/graphql
 *
 * getLocations()
 * 
 * Prismic only does 20 entries per call, so if you have more, you have to get creative
 * resultsReducer() allows us to get more than 20 results and combines all results into one array
 * 
 */

export async function getLocations() { 

  // Set up what we need in at the node level from a Location
  const nodeQuery = `{
    location
      header_image
      _linkType
      _meta {
        id
        uid
      }
  }`

  // Call reducer so we can have 20+ records
  return resultsReducer(`allLocationss`, `location_ASC`, nodeQuery);
}

export async function getSingleLocationsPage(uid, previewData) {
  const data = await fetchAPI(`
    query LocationByUID($uid: String!, $lang: String!) {
      topic(uid: $uid, lang: $lang) {
        _meta {
          uid
          id
        }
        title
        banner_image
        intro
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

// export async function getSingleTopicPage(uid, previewData) {
//   const data = await fetchAPI(`
//   query TopicByUID($uid: String!, $lang: String!) {
//     topic(uid: $uid, lang: $lang) {
//       _meta {
//         uid
//         id
//       }
//       title
//       banner_image
//       intro
//     }
//   }
//   `,
//     {
//       previewData,
//       variables: {
//         uid,
//         lang: API_LOCALE,
//       },
//     }
//   )
//   return data
// }

export async function getLocationsLandingPage() {
  const data = await fetchAPI(`
    {
      allLocationss {
        edges {
          node {
            location
            header_image
            _linkType
            _meta {
              id
              uid
            }
          }
        }
      }
    }
  `
  )
  return data?.allLocationss?.edges
}