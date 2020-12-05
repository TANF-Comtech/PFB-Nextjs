/**
 * GraphQL fragments - reusable query elements
 */

// Link Fragment
export const linkFields = `
  __typename
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
  ... on _Document {
    _meta {
      id
      uid
      type
    }
  }
  ... on _ExternalLink {
    url
    target
  }
  ... on _FileLink {
    name
    url
  }
  ... on Landing_page {
    _meta {
      id
      uid
    }
  }
`

/**
 * Content-type Fragments
 * 
 * Any custom content-type that gets reused around the site (news, events, etc)
 */
export const campaignItemFields = `
  small_text
  big_text
  banner_image
  link {
    ${linkFields}
  }
  _meta {
    uid
    id
  }
`

export const eventItemFields = `
  title
  date
  event_location
  main_content
  _meta {
    id
    uid
  }
`

export const newsItemFields = `
  title
  header_image
  publication_date
  _meta {
    lastPublicationDate
    id
    uid
  }
  main_content 
`

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
    ${linkFields}          
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