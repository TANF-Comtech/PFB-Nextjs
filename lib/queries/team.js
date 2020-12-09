import { resultsReducer } from '../resultsReducer'

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
  return resultsReducer(`allTeam_members`, `title_ASC`, nodeQuery);
}


