import { stripIgnoredCharacters } from 'graphql';

import { fetchAPI, API_LOCALE } from '../api';
import { allLinkFields } from './fragments';

/**
 * !!!!!!!!!!!!!!!!!
 * Test all queries to know what you are getting back
 * https://peopleforbikes.prismic.io/graphql
 */

// Fetch ALL Local Innovation (Program) Pages
export async function getPrograms() {
  const data = await fetchAPI(`{
    allPrograms {
      edges {
        node {
          _meta {
            id
            uid
            lang
            type
          }
        }
      }
    }
  }`);

  return data.allPrograms.edges;
}

// Fetch a single Local Innovation (Program) Page
export async function getProgramPage(uid, previewData) {
  const dataCondensed = await stripIgnoredCharacters(`
    query ProgramPage($uid: String!, $lang: String!) {
      program(uid: $uid, lang: $lang) {
        _meta {
          uid
          id
          type
        }
        title
        archived
        body {
          __typename
          ... on ProgramBodyContent_block {
            type
            primary {
              main_content
            }
          }
          ... on ProgramBodyPolicy_pillar {
            type
            primary {
              long_name
            }
            fields {
              sub_pillar
              sub_pillar_summary
              news_item_1 {
                ${allLinkFields}
              }
              news_item_title_1
              news_item_2 {
                ${allLinkFields}
              }
              news_item_title_2
              news_item_3 {
                ${allLinkFields}
              }
              news_item_title_3
            }
          }       
          ... on ProgramBodyPromo {
            type
            primary {
              main_image
              top_text
              bottom_text
              link {
                ${allLinkFields}
              }
            }
          }
          ... on ProgramBodyVisual_grid {
            type
            primary {
              grid_title
            }
            fields {
              graphic
              label
            }
          }
          ... on ProgramBodyRelated_news {
            type
            fields {
              news_item_title
              news {
                __typename
                ... on News {
                  _meta {
                    id
                    uid
                    type
                  }
                  _linkType
                }
                ... on _ExternalLink {
                  url
                  target
                  _linkType
                }
              }
            }
          }
        }
      }
    }
  `);

  const data = await fetchAPI(dataCondensed, {
    previewData,
    variables: {
      uid,
      lang: API_LOCALE,
    },
  });
  return data;
}
