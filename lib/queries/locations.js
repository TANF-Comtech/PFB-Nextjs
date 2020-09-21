import { fetchAPI, API_LOCALE } from '../api'

/**
 * !!!!!!!!!!!!!!!!!
 * Test all queries to know what you are getting back 
 * https://peopleforbikes.prismic.io/graphql
 *
 */
export async function getLocations() {
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
  `)
  return data?.allLocationss?.edges
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