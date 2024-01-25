import { getPrismicData, API_LOCALE } from '~/lib/api';
import { resultsReducer } from '~/lib/resultsReducer';
import { promoSliceFields } from '~/lib/queries/fragments';

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
  }`;

  // Call reducer so we can have 20+ records
  return resultsReducer(`allMember_contents`, `title_ASC`, nodeQuery);
}

export async function getSingleMemberPage(uid, previewData) {
  const query = `
    query MembersByUID($uid: String!, $lang: String!) {
      member_content(uid: $uid, lang: $lang) {
        title
        main_content
        header_image
        main_text
        secondary_text
        _meta {
          type
          uid
          id
        }
        body {
          __typename
          ... on Member_contentBodySummary_block {
            type
            primary {
              summary_title
              summary_area
              summary_id
              summary_block_after_main_content
            }
            fields {
              button_text
              button_link {
                __typename
                ... on _ExternalLink {
                  __typename
                  url
                  target
                  _linkType
                }
                ... on _FileLink {
                  __typename
                  _linkType
                  name
                  url
                  size
                }
                ... on Landing_page {
                  __typename
                  _meta {
                    id
                    uid
                    type
                  }
                }
                ... on Campaign {
                  __typename
                  _meta {
                    id
                    uid
                    type
                  }
                }
                ... on _ImageLink {
                  __typename
                  _linkType
                  name
                  url
                  size
                }
                ... on _FileLink {
                  __typename
                  _linkType
                  name
                  url
                  size
                }
                ... on Member_content {
                  __typename
                  _linkType
                  _meta {
                    id
                    uid
                    type
                  }
                }
              }
            }
          }
          ... on Member_contentBodyItem_list {
            type
            fields {
              item_name
              item_description
              item_link {
                ... on _ExternalLink {
                  __typename
                  url
                  target
                  _linkType
                }
                ... on _FileLink {
                  __typename
                  _linkType
                  name
                  url
                  size
                }
                ... on Member_content {
                  __typename
                  _linkType
                  _meta {
                    id
                    uid
                    type
                  }
                }
                ... on Landing_page {
                  __typename
                  _linkType
                  _meta {
                    id
                    uid
                    type
                  }
                }
                ... on Report {
                  __typename
                  _linkType
                  _meta {
                    id
                    uid
                    type
                  }
                }
                ... on Owners_manual {
                  __typename
                  _linkType
                  _meta {
                    id
                    uid
                    type
                  }              
                }
              }
            }
          }
          ... on Member_contentBodyMission_content {
            type
            fields {
              pillar_title
              pillar_content
            }
            primary {
              pillar_title
            }
          }
          ... on Member_contentBodyContent_list {
            type
            fields {
              content_title
              content_description
              content_link {
                __typename
                ... on _ExternalLink {
                  __typename
                  url
                  target
                  _linkType
                }
                ... on Landing_page {
                  __typename
                  _meta {
                    id
                    uid
                    type
                  }
                }
                ... on Campaign {
                  __typename
                  _meta {
                    id
                    uid
                    type
                  }
                }
                ... on _ImageLink {
                  __typename
                  _linkType
                  name
                  url
                  size
                }
                ... on _FileLink {
                  __typename
                  _linkType
                  name
                  url
                  size
                }
                ... on Member_content {
                  __typename
                  _linkType
                  _meta {
                    id
                    uid
                    type
                  }
                }
              }
            }
          }
          ... on Member_contentBodyVisual_grid {
            type
            primary {
              grid_title
            }
            fields {
              graphic
              label
              button_text
              button_link {
                _linkType
                __typename
                ... on _FileLink {
                  name
                  url
                  _linkType
                }
                ... on _ExternalLink {
                  _linkType
                  __typename
                  url
                }
                ... on Member_content {
                  _linkType
                  __typename
                  _meta {
                    id
                    uid
                    type
                  }
                }
                ... on Landing_page {
                  _linkType
                  __typename
                  _meta {
                    id
                    uid
                    type
                  }
                }
              }
            }
          }
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
          ... on Member_contentBodyPromo {
            type
            primary {
              ${promoSliceFields}
            }
          }
          ... on Member_contentBodyEmbed {
            type
            primary {
              embed_button_link {
                _linkType
                __typename
                ... on _FileLink {
                  name
                  url
                  _linkType
                }
                ... on _ExternalLink {
                  _linkType
                  __typename
                  url
                }
              }
              embed_button_text
              embed_intro
              embed_link 
              dark_background
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
