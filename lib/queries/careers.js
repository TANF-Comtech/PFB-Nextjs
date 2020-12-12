import { fetchAPI } from '../api'
import { newsItemFields } from './fragments'

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

