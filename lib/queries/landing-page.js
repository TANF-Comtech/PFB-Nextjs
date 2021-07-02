import { API_LOCALE, fetchAPI } from '../api'
import { actionitemSliceFields, 
         promoSliceFields,
         linkFields,
        } from './fragments'
import { stripIgnoredCharacters } from 'graphql'
import { resultsReducer } from '../resultsReducer'

/**
 * !!!!!!!!!!!!!!!!!
 * Test all queries to know what you are getting back 
 * https://peopleforbikes.prismic.io/graphql
 */

// Gets all landing pages, uses resultsReducer because we have more than 20
export async function getLandingPages() {
  const nodeQuery = `{
    _meta {
      id
      uid
    }
  }`

  // Call reducer so we can have 20+ records
  return resultsReducer(`allLanding_pages`, `title_ASC`, nodeQuery);  
}

// This is a query to get each Page by its uid, so we have to programmatically provide that uid
export async function getSingleLandingPage(uid, previewData) {
  const dataCondensed = stripIgnoredCharacters(`
    query LandingPage($uid: String!, $lang: String!) {
      landing_page(uid: $uid, lang: $lang) {
        _meta {
          uid
          id
          type
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
            primary {
              pillar_title
            }
          }
          __typename
          ... on Landing_pageBodyAccordion_list {
            fields {
              accordion_heading
              accordion_content
            }
          }               
          __typename
          ... on Landing_pageBodyPromo {
            primary {
              ${promoSliceFields}
            }
          }
          __typename
          ... on Landing_pageBodyResearch {
            type
            fields {
              campaign {
                __typename
                ... on Campaign {
                  banner_image
                  small_text
                  big_text
                  link {
                    __typename
                    ... on _ExternalLink {
                      url
                      target
                    }
                  }
                }
              }
            }
          }
          ... on Landing_pageBodyResearch__reports {
            type
            fields {
              reports {
                __typename
                ... on Report {
                  title
                  summary
                  _meta {
                    id
                    uid
                    type
                  }                  
                }
              }
            }
          }
          __typename
          ... on Landing_pageBodyRelated_list {
            type
            fields {
              item {
                ... on Campaign {
                  banner_image
                  big_text
                  description
                  title
                  link {
                    __typename
                    ... on _ExternalLink {
                      url
                      target
                      _linkType
                    }
                    ... on Landing_page {
                      _linkType
                      _meta {
                        id
                        uid
                        type
                      }
                    }
                  }
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
      }
    }
  `)

  const data = await fetchAPI( dataCondensed,
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