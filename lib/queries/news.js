import { fetchAPI } from '../api'

/**
 * !!!!!!!!!!!!!!!!!
 * Test all queries to know what you are getting back 
 * https://peopleforbikes.prismic.io/graphql
 *
 * newsTopTwenty()
 * 
 * Gets us the latest news - last twenty
 * 
 */

export async function newsTopTwenty() { 
  const data = await fetchAPI(`
    {
      allNewss (sortBy: publication_date_DESC) {
        edges {
          node {
            title
            header_image
            publication_date
            _meta {
              lastPublicationDate
              id
              uid
            }
            main_content
          }
        }
      }
    }
  `)
  return data?.allNewss?.edges
}

