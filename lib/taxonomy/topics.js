import { fetchAPI, API_LOCALE } from '../api'

/**
 * !!!!!!!!!!!!!!!!!
 * Test all queries to know what you are getting back 
 * https://peopleforbikes.prismic.io/graphql
 *
 * ################
 * getTopics()
 *  
 * {
    "node": {
      "title": [
        {
          "type": "heading1",
          "text": "Inclusive Cycling",
          "spans": []
        }
      ],
      "square_image": {
        "dimensions": {
          "width": 900,
          "height": 900
        },
        "alt": "Image of a cyclist in the park",
        "copyright": null,
        "url": "https://images.prismic.io/peopleforbikes/4c0b6773-3c04-46c9-a4ee-cc05d098036f_PFB_Topics_900x900_inclusivecycling.jpg?auto=compress,format&rect=0,0,900,900&w=900&h=900",
        "mobile": {
          "dimensions": {
            "width": 450,
            "height": 450
          },
          "alt": null,
          "copyright": null,
          "url": "https://images.prismic.io/peopleforbikes/4c0b6773-3c04-46c9-a4ee-cc05d098036f_PFB_Topics_900x900_inclusivecycling.jpg?auto=compress,format&rect=0,0,900,900&w=450&h=450"
        }
      },
      "_linkType": "Link.document",
      "_meta": {
        "id": "XyxFwxEAACAA6Fb_",
        "uid": "inclusive-cycling"
      }
    }
  }
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

