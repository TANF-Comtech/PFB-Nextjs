import { gql } from '@apollo/client'

// Global - Network of Sites Query
export const GLOBAL_MENU_DATA = gql`
  query NavMenu($uid: String!, $lang: String!) {
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
    }
  } 
`