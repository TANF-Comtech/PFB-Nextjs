import { gql } from '@apollo/client'

// Global - Network of Sites Query
export const MENU_DATA = gql`
  query GlobalMenu($uid: String!, $lang: String!) {
    menu(uid: $uid, lang: $lang) {
      _linkType
      _meta {
        type
        uid
        id
      }
      menu_items {
        text
        link {
          ... on Landing_page {
            title
            _meta {
              id
              uid
              type
            }
          }
          ... on _ExternalLink {
            url
            target
            _linkType
          }          
        }
      }
      topic_items {
        link {
          ... on Topic {
            title
            _meta {
              id
              uid
              type
            }
            square_image
          }
        }
      }
    }
  } 
`

export const TOPIC_DATA = gql`
  {
    allTopics{
      edges {
        node {
          title
          _meta {
            id
            uid
          }
          square_image
        }
      }
    }
  }
`