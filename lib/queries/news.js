import { fetchAPI, API_LOCALE } from '../api'
import { resultsReducer } from '../resultsReducer'
import { newsItemFields } from './fragments'

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
            ${newsItemFields}
          }
        }
      }
    }
  `)

  return data.allNewss.edges
}

export async function getAllNews() {
  const nodeQuery = `{
    title
    _meta {
      id
      uid
      type
    }
  }`

  // Call reducer so we can have 20+ records
  return resultsReducer(`allNewss`, `publication_date_DESC`, nodeQuery);  
}

export async function getSingleNewsPage(uid, previewData) {
  const data = await fetchAPI(`
    query NewsByUID($uid: String!, $lang: String!) {
      news(uid: $uid, lang: $lang) {
        title
        main_content
        header_image
        publication_date
        byline
        _meta {
          uid
          id
          lastPublicationDate
        }
        topics {
          topic {
            __typename
            ... on Topic {
              title
              _meta {
                id
                uid
                type
              }
            }
          }
        }
        locations {
          location {
            __typename
            ... on Locations {
              location
              _meta {
                id
                uid
                type
              }
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