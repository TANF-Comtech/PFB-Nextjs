import { fetchAPI, API_LOCALE } from '../api'

/**
 * !!!!!!!!!!!!!!!!!
 * Test all queries to know what you are getting back 
 * https://peopleforbikes.prismic.io/graphql
 */

// Get all Topics, processed to just be a list of names and links - no page section info
export async function getTopics() {
  const data = await fetchAPI(`
    {
      allTopics {
        edges {
          node {
            title
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
/**
 * Example of data return
 * ################
 * 
 * {
    "data": {
      "topic": {
        "_meta": {
          "uid": "city-riding",
          "id": "XyxE7xEAACAA6FMb"
        },
        "title": [
          {
            "type": "heading1",
            "text": "City Riding",
            "spans": []
          }
        ]
      }
    }
  }
 */