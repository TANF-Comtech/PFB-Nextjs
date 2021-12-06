/**
 * GraphQL fragments - reusable query elements
 */

// OLD LINK APPROACH
export const linkFields = `
  __typename   
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
      type
    }
  }
  ... on Campaign {
    _meta {
      id
      uid
      type
    }
  }
`;


export const linkMeta = `
  _meta {
    id
    uid
    type
  }
  _linkType
`

// NEW LINK APPROACH
export const allLinkFields = `
  __typename
  ... on Action { ${linkMeta} } 
  ... on Campaign { ${linkMeta} }
  ... on Electric_bikes { ${linkMeta} }
  ... on Grant { ${linkMeta} }
  ... on Job { ${linkMeta} }
  ... on Landing_page { ${linkMeta} }
  ... on Locations { ${linkMeta} }
  ... on Member_content { ${linkMeta} }
  ... on Menu { ${linkMeta} }
  ... on New_homepage { ${linkMeta} }
  ... on News { ${linkMeta} }
  ... on Policy { ${linkMeta} }
  ... on Program { ${linkMeta} }
  ... on Report { ${linkMeta} }
  ... on Ridespot_ride { ${linkMeta} }
  ... on Statistic_page { ${linkMeta} }
  ... on Topic { ${linkMeta} }
  ... on Team_member { ${linkMeta} }
  ... on _ExternalLink {
    url
    target
    _linkType
  }
  ... on _FileLink {
    name
    url
    size
    _linkType
  }
  ... on _ImageLink {
    name
    url
    size
    height
    width
    _linkType
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
`;

export const eventItemFields = `
  title
  date
  event_location
  main_content
  _meta {
    id
    uid
  }
`;

export const newsItemFields = `
  title
  main_content
  header_image
  publication_date
  byline
  seo_title
  seo_text
  seo_keywords
  seo_image
  _meta {
    uid
    id
    type
    lastPublicationDate
  }
  topics {
    topic {
      __typename
      ... on Topic {
        title
        _meta {
          id
          uid
          type
        }
      }
    }
  }
  locations {
    location {
      __typename
      ... on Locations {
        location
        _meta {
          id
          uid
          type
        }
      }
    }
  }
  main_content 
`;

export const ridespotrideItemFields = `
  title
  distance
  location {
    __typename
    ... on Locations {
      location
    }
  }
  _meta {
    id
    uid
    type
  }
  ridespot_link {
    __typename
    ... on _ExternalLink {
      url
      target
    }
  }
  organization {
    __typename
    ... on Organization {
      name
    }
  }  
`;

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
  extended_text
  icon
  link {
    ${linkFields}
  }
`;

export const promoSliceFields = `
  main_image
  top_text
  bottom_text
  link {
    ${linkFields}
  }
`;

// Research Program Slice
export const researchProgramSliceFields = `
  description
  programs {
    __typename
    ... on Campaign {
      title
      link {
        __typename
        ... on _ExternalLink {
          url
          target
        }
      }
    }
    ... on Landing_page {
      title
      _meta {
        id
        uid
        type
      }
    }
    ... on Topic {
      title
      _meta {
        id
        uid
        type
      }
    }
  }
`;

// Ridespot Slice
export const ridespotSliceFields = `
  type
  primary {
    rideone {
      ... on Ridespot_ride {
        title
        distance
        ridespot_card
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
        ridespot_card
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
        ridespot_card
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
`;
