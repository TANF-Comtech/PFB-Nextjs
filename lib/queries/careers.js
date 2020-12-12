import { fetchAPI, API_LOCALE } from '../api'

/**
 * !!!!!!!!!!!!!!!!!
 * Test all queries to know what you are getting back 
 * https://peopleforbikes.prismic.io/graphql
 *
 * allCareers()
 * 
 * Gets us the latest careers, will limit to twenty at a time
 * 
 */

export async function getAllCareers() { 
  const data = await fetchAPI(`
    {
      allJobs(sortBy: title_ASC) {
        edges {
          node {
            title
            _meta {
              id
              uid
              type
            }
          }
        }
      }
    }
  `)

  return data.allJobs.edges
}

/**
  * getSingleLocationsPage()
  * 
  * Prismic only does 20 entries per call, so if you have more, you have to get creative
  * resultsReducer() allows us to get more than 20 results and combines all results into one array
  * 
  */
 export async function getSingleCareer(uid, previewData) {
  const data = await fetchAPI(`
    query CareerByUID($uid: String!, $lang: String!) {
      job(uid: $uid, lang: $lang) {
        title
        posting
        _meta {
          id
          uid
          type
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