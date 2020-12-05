import { fetchAPI, API_LOCALE } from '../api'

import { ridespotSliceFields } from './fragments'

/**
 * !!!!!!!!!!!!!!!!!
 * Test all queries to know what you are getting back 
 * https://peopleforbikes.prismic.io/graphql
 *
 * getHomepage()
 * 
 * Gets all the data for the single homepage content-type in Prismic
 * The data model is basically a hero area and 4 modular sections:
 *    1) Campaigns; 2) Rides; 3) News; 4) Events
 */
export async function getHomepage(previewData) {
  const data = await fetchAPI(`
    query TheHomepage($uid: String!, $lang: String!) {
      homepage( uid: $uid, lang: $lang ){
        title
        banner_image 
        _meta {
          id
          uid
        }
        small_text
        big_text
        body {
          ... on HomepageBodyRidespot_promo {
            ${ridespotSliceFields}
          }
        }
        news {
          news_item {
            __typename 
            ... on News {
              title
              header_image
              publication_date
              _meta {
                lastPublicationDate
                id
                uid
              }
              main_content
            }
          }
        }
        campaigns {
          campaign {
            __typename
            ... on Campaign {
              small_text
              big_text
              banner_image
              link {
                __typename
                ... on _ExternalLink {
                  url
                  target
                }
                ... on _Document {
                  _meta {
                    id
                    uid
                    type
                  }
                }
                ... on _FileLink {
                  name
                  url
                }
              }
              _meta {
                uid
                id
              }
            }
          }
        }
        events {
          event {
            __typename
            ... on Event {
              title
              date
              event_location
              main_content
              _meta {
                id
                uid
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
        uid: 'homepage',
        lang: API_LOCALE,
      },
    }
  )

  return data
}

