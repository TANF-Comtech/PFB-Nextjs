import { fetchAPI } from '../api'
import { ridespotrideItemFields } from './fragments'

/**
 * !!!!!!!!!!!!!!!!!
 * Test all queries to know what you are getting back 
 * https://peopleforbikes.prismic.io/graphql
 *
 * getRides()
 * 
 * Prismic only does 20 entries per call, so if you have more, you have to get creative
 * resultsReducer() allows us to get more than 20 results and combines all results into one array
 * 
 */

export async function getRides() { 
  const data = await fetchAPI( `
    {
      allRidespot_rides(sortBy: meta_lastPublicationDate_ASC) {
        edges {
          node {
            ${ridespotrideItemFields}
          }
        }
      }
    }  
  ` )

  return data.allRidespot_rides.edges
}