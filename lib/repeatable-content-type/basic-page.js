import { API_LOCALE, fetchAPI } from '../api'

// Return a list of all basic pages
// This data gets fed into page/[uid].js so the dynamic routing can work
// We have to tell Next.js what routes to statically generate
export async function getAllBasicPagesWithUID() {
  const data = await fetchAPI(`
    {
      allBasic_pages {
        edges {
          node {
            _meta {
              uid
            }
          }      
        }
      }
    }
  `)
  return data?.allBasic_pages?.edges
}

// This is a query to get each Page by its uid, so we have to programmatically provide that uid
export async function getSingleBasicPage(uid, previewData) {
  const data = await fetchAPI(`
    query PageByUID($uid: String!, $lang: String!) {
      basic_page(uid: $uid, lang: $lang) {
        _meta {
          uid
          id
        }
        title
        main_content
        parent_page {
          _linkType
        }
        recent_grants
        call_to_action
        body {
          ... on Basic_pageBodyAccordion_list {
            fields {
              accordion_heading
              accordion_content
            }
          }
          ... on Basic_pageBodyMain_image {
            label 
            type
            primary {
              main_image
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