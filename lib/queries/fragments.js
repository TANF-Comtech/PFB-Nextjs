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