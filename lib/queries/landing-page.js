import { API_LOCALE, fetchAPI } from '../api'
import { actionitemSliceFields } from './fragments'

/**
 * !!!!!!!!!!!!!!!!!
 * Test all queries to know what you are getting back 
 * https://peopleforbikes.prismic.io/graphql
 */

// Return a list of all landing pages
// This data gets fed into page/[uid].js so the dynamic routing can work
// We have to tell Next.js what routes to statically generate
export async function getLandingPages() {
  const data = await fetchAPI(`
    {
      allLanding_pages {
        edges {
          node {
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
export async function getSingleLandingPage(uid, previewData) {
  const data = await fetchAPI(`
    query LandingPage($uid: String!, $lang: String!) {
      landing_page(uid: $uid, lang: $lang) {
        _meta {
          uid
          id
        }
        title
        summary
        header_image
        main_text
        secondary_text
        body {
          __typename
          ... on Landing_pageBodyAction_item {
            fields {
              ${actionitemSliceFields}
            }
          }
          __typename
          ... on Landing_pageBodyContent_block {
            primary {
              main_content
            }
          }
          __typename
          ... on Landing_pageBodyMission_content {
            fields {
              pillar_title
              pillar_content
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