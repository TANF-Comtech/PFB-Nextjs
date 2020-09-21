import { fetchAPI, API_LOCALE } from '../api'

/**
 * !!!!!!!!!!!!!!!!!
 * Test all queries to know what you are getting back 
 * https://peopleforbikes.prismic.io/graphql
 *
 */
export async function getTopics() {
  const data = await fetchAPI(`
    {
      allTopics {
        edges {
          node {
            title
            square_image
            _linkType
            _meta {
              id
              uid
            }
          }
        }
      }
    }
  `)
  return data?.allTopics?.edges
}

export async function getSingleTopicPage(uid, previewData) {
  const data = await fetchAPI(`
  query TopicByUID($uid: String!, $lang: String!) {
    topic(uid: $uid, lang: $lang) {
      _meta {
        uid
        id
      }
      title
      banner_image
      intro
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

export async function getTopicsLandingPage(uid, previewData) {
  const data = await fetchAPI(`
    query TopicLandingPage($uid: String!, $lang: String!) {
      topics( uid: $uid, lang: $lang ){
        title
        intro
        graphic
      }
      allTopics {
        edges {
          node {
            title
            square_image
            _linkType
            _meta {
              id
              uid
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

