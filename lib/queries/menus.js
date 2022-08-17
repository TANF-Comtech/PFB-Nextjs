import { fetchAPI } from '~/lib/api';

/**
 * !!!!!!!!!!!!!!!!!
 * Test all queries to know what you are getting back
 * https://peopleforbikes.prismic.io/graphql
 */

// Main nav menu
export async function getMainNavMenu() {
  const data = await fetchAPI(`
    query TempNavMenu($uid: String!, $lang: String!) {
      nav_menu(uid: $uid, lang: $lang) {
        _meta {
          uid
          id
        }
        main_menu_items {
          item {
            ... on Landing_page {
              title
              _linkType
              _meta {
                uid
                id
              }
            }
            ... on Topics {
              title
              _linkType
              _meta {
                uid
                id
              }
            }
            ... on Locations_landing {
              title
              _linkType
              _meta {
                uid
                id
              }
            }
          }
        }
        topic_menu_items {
          item {
            ... on Topic {
              title
              square_image
              _meta {
                uid
                id
              }
            }
          }
        }
      }
    }
  `);
}
