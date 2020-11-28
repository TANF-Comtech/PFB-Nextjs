import { fetchAPI, API_LOCALE } from '../api'

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
export async function getHomepage(uid, previewData) {
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
            type
            label
            primary {
              rideone {
                ... on Ridespot_ride {
                  title
                  distance
                  organization {
                    ... on Organization {
                      name
                    }
                  }
                  ridespot_link {
                    ... on _ExternalLink {
                      url
                      target
                    }
                  }
                }
              }
              ridetwo {
                ... on Ridespot_ride {
                  title
                  distance
                  organization {
                    ... on Organization {
                      name
                    }
                  }
                  ridespot_link {
                    ... on _ExternalLink {
                      url
                      target
                    }
                  }
                }
              }
              ridethree {
                ... on Ridespot_ride {
                  title
                  distance
                  organization {
                    ... on Organization {
                      name
                    }
                  }
                  ridespot_link {
                    ... on _ExternalLink {
                      url
                      target
                    }
                  }
                }
              }          
            }
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
                  _linkType
                }
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

