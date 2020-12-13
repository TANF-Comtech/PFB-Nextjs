import { resultsReducer } from '../resultsReducer'
import { fetchAPI } from '../api'

/**
 * !!!!!!!!!!!!!!!!!
 * Test all queries to know what you are getting back 
 * https://peopleforbikes.prismic.io/graphql
 *
 * getTeamMembers()
 * 
 * Gets us the entire team, ordered alphabetically
 * 
 */

export async function getTeamMembers() { 
  // Set up what we need in at the node level from a Location
  const nodeQuery = `{
    title
    position
    description
    email {
      __typename
      ... on _ExternalLink {
        url
      }
    }
    headshot
    ceo
    _meta {
      uid
      id
    }
  }`

  // Call reducer so we can have 20+ records
  return resultsReducer(`allTeam_members`, `last_name_ASC`, nodeQuery);
}

export async function getCEO() { 
  const data = await fetchAPI(`
    query {
      team_member(uid: "jenn-dice", lang: "en-us") {
        title
        last_name
        position
        description
        email {
          __typename
          ... on _ExternalLink {
            url
          }
        }
        headshot
        ceo
        _meta {
          uid
          id
        }
      }
    }
  `)

  return data
}

