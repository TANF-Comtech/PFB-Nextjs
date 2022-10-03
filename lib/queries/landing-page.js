import { API_LOCALE, getPrismicData } from '~/lib/api';
import { actionitemSliceFields, allLinkFields, promoSliceFields } from '~/lib/queries/fragments';
import { resultsReducer } from '~/lib/resultsReducer';

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
  }`;

  // Call reducer so we can have 20+ records
  return resultsReducer(`allLanding_pages`, `title_ASC`, nodeQuery);
}

// This is a query to get each Page by its uid, so we have to programmatically provide that uid
export async function getSingleLandingPage(uid, previewData) {
  const query = `
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
          ... on Landing_pageBodySummary_block {
            type
            primary {
              summary_title
              summary_area
              summary_id
            }
            fields {
              button_text
              button_link {
                ${allLinkFields}
              }
            }
          }
          ... on Landing_pageBodyAction_item {
            fields {
              ${actionitemSliceFields}
            }
          }
          ... on Landing_pageBodyContent_block {
            primary {
              main_content
            }
          }
          ... on Landing_pageBodyMission_content {
            fields {
              pillar_title
              pillar_content
            }
            primary {
              pillar_title
            }
          }
          ... on Landing_pageBodyAccordion_list {
            fields {
              accordion_heading
              accordion_content
            }
          }
          ... on Landing_pageBodyImage_list {
            fields {
              square_image
              item_title
              description
            }
          }
          ... on Landing_pageBodyPromo {
            primary {
              ${promoSliceFields}
            }
          }
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
                    ${allLinkFields}
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
          ... on Landing_pageBodyRelated_list {
            type
            fields {
              item {
                ... on Campaign {
                  archived
                  banner_image
                  big_text
                  description
                  title
                  link {
                    ${allLinkFields}
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
          ... on Landing_pageBodyVisual_grid {
            type
            label
            primary {
              grid_title
            }
            fields {
              graphic
              label
              button_text
              button_link {
                ${allLinkFields}
              }
            }
          }
        }
      }
    }
  `;

  const data = await getPrismicData(query, {
    previewData,
    variables: {
      uid,
      lang: API_LOCALE,
    },
  });
  return data;
}
