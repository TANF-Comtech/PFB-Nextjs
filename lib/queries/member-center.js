import { fetchAPI, API_LOCALE } from '../api'

import { resultsReducer } from '../resultsReducer'
import { linkFields } from './fragments'

/**
 * !!!!!!!!!!!!!!!!!
 * Test all queries to know what you are getting back 
 * https://peopleforbikes.prismic.io/graphql
 */

// Get all Grant Cycles
// getGrants is getting all of the grants for us, dumping onto one page
export async function getMemberPages() {
  const nodeQuery = `{
    title
    main_content
    _meta {
      id
      uid
      type
    }
  }`

  // Call reducer so we can have 20+ records
  return resultsReducer(`allMember_contents`, `title_ASC`, nodeQuery);  
}

export async function getSingleMemberPage(uid, previewData) {
  const data = await fetchAPI(`
    query MembersByUID($uid: String!, $lang: String!) {
      member_content(uid: $uid, lang: $lang) {
        title
        main_content
        _meta {
          uid
          id
        }
        body {
          __typename
          ... on Member_contentBodyBiz_intel_hub {
            type
            primary {
              section_title
              report_block_type
            }
            fields {
              date
              pdf_item {
                __typename
                ... on _FileLink {
                  name
                  url
                }
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