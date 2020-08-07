import { fetchAPI } from '../api'

/**
 * !!!!!!!!!!!!!!!!!
 * Test all queries to know what you are getting back 
 * https://peopleforbikes.prismic.io/graphql
 */

// Get all Grant Types
export async function getAllGrantTypes() {
  const data = await fetchAPI(`
    {
      allGrant_types {
        edges {
          node {
            type_name
          }
        }
      }  
    }
  `)
  return data?.allGrant_types?.edges
}