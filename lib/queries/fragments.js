/**
 * GraphQL fragments - reusable query 
 */

// Link Fragment




/**
 * Slices
 * 
 * Prismic CMS slices are reusable content-type building blocks
 * http://user-guides.prismic.io/en/articles/383933-slices
 * 
 * As they repeat often in other queries, they make for natural fragments
 * Try to create/use fragments for any slice, naming pattern: nameSliceFields
 */

// Action Item Slice
export const actionitemSliceFields = `
  title
  text
  icon
  link {
    __typename
    ... on _ExternalLink {
      url
      target
    }
    ... on Landing_page {
      _meta {
        id
        uid
      }
    }
    ... on Basic_page {
      parent_page {
        __typename
        ... on Landing_page {
          _meta {
            id
            uid
          }
        }
      }
      _meta {
        id
        uid
      }
    }                
  }
`

// Ridespot Slice
export const ridespotSliceFields = `
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
`