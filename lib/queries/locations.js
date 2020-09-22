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
 * Basically we check our first query, if it has more than 20 records we have paginate
 * But we really just want all the locations, so we are building an array that has them all
 * 
 * 
 * @param {boolean} hasNextPage - tells us whether or not we need to do paginated results
 * @param {int} totalCount - gives us number of records
 */

const nodeQuery = `{
location
  header_image
  _linkType
  _meta {
    id
    uid
  }
}`

export async function getLocations() { 
  return resultsReducer(`allLocationss`, `location_ASC`, nodeQuery);
  // let allLocations = []
  // let fetch = await fetchAPI(`
  //   query {
  //     allLocationss (sortBy: location_ASC) {
  //       pageInfo {
  //         hasNextPage
  //         startCursor
  //         endCursor
  //       }
  //       edges {
  //         node {
  //           location
  //           header_image
  //           _linkType
  //           _meta {
  //             id
  //             uid
  //           }
  //         }
  //         cursor
  //       }
  //       totalCount
  //     }
  //   }
  // `)

  // // Build up allLocations arr, regardless of how many records we have
  // // First twenty records always go in here
  // fetch.allLocationss.edges.map( (location) => {
  //   allLocations.push(location)
  // })
  
  // // If we have less than 20 records just
  // if (fetch.allLocationss.totalCount <= 20) {
  //   return allLocations
  // }

  // /// More than 20 records...
  // else {
  //   let lastCursor = null // setup a variable for lastCursor
    
  //   // construct a new query to get results, but only if last query says we need more
  //   while (fetch.allLocationss.pageInfo.hasNextPage === true) {
  //     // last cursor comes from last call's endCursor
  //     lastCursor = fetch.allLocationss.pageInfo.endCursor

  //     fetch = await fetchAPI(`
  //       query MoreLocations($cursor: String!){
  //         allLocationss (sortBy: location_ASC, after: $cursor) {
  //           pageInfo {
  //             hasNextPage
  //             startCursor
  //             endCursor
  //           }
  //           edges {
  //             node {
  //               location
  //               header_image
  //               _linkType
  //               _meta {
  //                 id
  //                 uid
  //               }
  //             }
  //             cursor
  //           }
  //           totalCount
  //         }
  //       }
  //       `,
  //       {
  //         variables: {
  //           cursor: lastCursor
  //         },
  //       }
  //     )
      
  //     // Push next block of 20 records into allLocations
  //     fetch.allLocationss.edges.map( (location) => {
  //       allLocations.push(location)
  //     })
  //   }

  //   return allLocations
  // }
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