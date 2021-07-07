import { fetchAPI, API_LOCALE } from '../api'
import { resultsReducer } from '../resultsReducer'
import { newsItemFields } from './fragments'

/**
 * !!!!!!!!!!!!!!!!!
 * Test all queries to know what you are getting back 
 * https://peopleforbikes.prismic.io/graphql
 * 
 */


/**
 * getAllNewsForLandingPage()
 * Gets every news node for filtering /news page
 */ 
export async function getAllNewsForLandingPage() {
  const nodeQuery = `{
    ${newsItemFields}
  }`

  const allNewsResults = resultsReducer(`allNewss`, `publication_date_DESC`, nodeQuery);
  
  // return gives Prismic the data it needs 
  return allNewsResults
}


/**
 * getAllNews() 
 * Gives us uid paths for static generation on /news/uid
 */
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


/**
 * getSingleNewsPage() 
 * Gives us the data for a single news node 
 */
export async function getSingleNewsPage(uid, previewData) {
  const data = await fetchAPI(`
    query NewsByUID($uid: String!, $lang: String!) {
      news(uid: $uid, lang: $lang) {
        ${newsItemFields}        
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