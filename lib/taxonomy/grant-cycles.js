import { fetchAPI } from '../api'

/**
 * !!!!!!!!!!!!!!!!!
 * Test all queries to know what you are getting back 
 * https://peopleforbikes.prismic.io/graphql
 */

// Get all Grant Cycles
export async function getAllGrantTypes() {
  const data = await fetchAPI(`
    {
      allGrant_cycles {
        edges {
          node {
            cycle_name
            grant_cycle_time
          }
        }
      }
    }
  `)
  return data?.allGrant_types?.edges
}