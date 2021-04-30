import { fetchAPI, API_LOCALE } from '../api'

import { resultsReducer } from '../resultsReducer'

/**
 * !!!!!!!!!!!!!!!!!
 * Test all queries to know what you are getting back 
 * https://peopleforbikes.prismic.io/graphql
 */

// getStats() gets us every statistics page, exciting
export async function getReports() {
  const nodeQuery = `{
    title
    summary
    year
    _meta {
      id
      uid
      type
    }
  }`

  // Call reducer so we can have 20+ records
  return resultsReducer(`allReports`, `year_DESC`, nodeQuery);  
}

export async function getSingleReportPage(uid, previewData) {
  const data = await fetchAPI(`
    query ReportsByUID($uid: String!, $lang: String!) {
      report(uid: $uid, lang: $lang) {
        title
        summary
        pdf {
          __typename
          ... on _FileLink {
            name
            url
            size
          }
        }
        link {
          __typename
          ... on Action {
            _linkType
            _meta {
              id
              uid
              type
            }
          }
          ... on _ExternalLink {
            url
            target
          }
        }
        year
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
        body {
          __typename
          ... on ReportBodyMultiPage_report {
            primary {
              supplement_title
            }
            fields {
              pdf_doc {
                __typename
                ... on _FileLink {
                  name
                  url
                  size
                }
              }
              link_name
            }
          }
        }
        _meta {
          uid
          id
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