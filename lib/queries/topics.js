import Prismic from 'prismic-javascript'

import { fetchAPI, API_LOCALE, REF_API_URL } from '../api'
import { resultsReducer } from '../resultsReducer'

/**
 * !!!!!!!!!!!!!!!!!
 * Test all queries to know what you are getting back 
 * https://peopleforbikes.prismic.io/graphql
 *
 */
export async function getTopics() {
  // Set up what we need in at the node level from a Topic
  const nodeQuery = `{
    title
    intro
    square_image
    body {
      __typename
      ... on TopicBodyPolicy_pillar {
        primary {
          long_name
        }
        fields {
          sub_pillar
          sub_pillar_summary
        }
      }
    }
    _linkType
    _meta {
      id
      uid
      type
      lastPublicationDate
    }
  }`

  // Call reducer so we can have 20+ records
  return resultsReducer(`allTopics`, `title_ASC`, nodeQuery);  
}

export async function getSingleTopicPage(uid, previewData) {
  const data = await fetchAPI(`
    query TopicByUID($uid: String!, $lang: String!) {
      topic(uid: $uid, lang: $lang) {
        _meta {
          uid
          id
          type
        }
        title
        banner_image
        intro
        body {
          __typename
          ... on TopicBodyElectric_bikes_content {
            primary {
              main_content
            }
            fields {
              pillars {
                _linkType
                ... on Electric_bikes {
                  title
                  _meta {
                    id
                    uid
                    type
                  }
                }
                ... on Statistic_page {
                  title
                  _meta {
                    uid
                    id
                    type
                  }
                }
              }
              pillar_subtext
            }
          }
          ... on TopicBodyPolicy_pillar {
            primary {
              long_name
            }
            fields {
              sub_pillar
              sub_pillar_summary
              news_item_1 {
                __typename
                ... on News {
                  title
                  header_image
                  _meta {
                    id
                    uid
                    type
                  }
                }
              }
              news_item_2 {
                __typename
                ... on News {
                  title
                  header_image
                  _meta {
                    id
                    uid
                    type
                  }
                }
              }
              news_item_3 {
                __typename
                ... on News {
                  title
                  header_image
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
  `,
    {
      previewData,
      variables: {
        uid,
        lang: API_LOCALE,
      },
    }
  )

  // Due to limitations with the GraphQL endpoint (can't query tags in groups)
  // We need to do a second call to get linked news, policies and grants per topic
  // Build array for single topic data
  const topicsResults = [ data ]

  await Prismic.getApi(REF_API_URL).then(
    function(api) {  
      return api.query(
        [
          Prismic.Predicates.at('document.type', 'news'),
          Prismic.Predicates.at('my.news.topics.topic', data.topic._meta.id),
        ],
        { 
          orderings : '[my.news.publication_date desc]',
          pageSize : 6,  
        }
      );
    }).then(
    function(resNews) {
      topicsResults.push(resNews.results)
    }
  );


  return topicsResults
}



