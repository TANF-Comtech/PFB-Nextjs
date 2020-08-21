import { API_LOCALE, fetchAPI } from '../api'

/**
 * !!!!!!!!!!!!!!!!!
 * Test all queries to know what you are getting back 
 * https://peopleforbikes.prismic.io/graphql
 */

// Return a list of all landing pages
// This data gets fed into page/[uid].js so the dynamic routing can work
// We have to tell Next.js what routes to statically generate
export async function getAllLandingPagesWithUID() {
  const data = await fetchAPI(`
    {
      allLanding_pages {
        edges {
          node {
            title
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
  return data?.allLanding_pages?.edges
}

// This is a query to get each Page by its uid, so we have to programmatically provide that uid
// This returns both page data and Prismic slice data using GraphQL unions, see more here: 
// https://prismic.io/docs/graphql/query-the-api/retrieve-slice-content
export async function getSingleLandingPage(uid, previewData) {
  const data = await fetchAPI(`
    query LandingPageByUID($uid: String!, $lang: String!) {
      landing_page(uid: $uid, lang: $lang) {
        _meta {
          uid
          id
        }
        title
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