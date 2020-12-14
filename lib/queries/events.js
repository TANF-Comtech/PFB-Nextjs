import { fetchAPI } from '../api'
import { eventItemFields } from './fragments'

/**
 * !!!!!!!!!!!!!!!!!
 * Test all queries to know what you are getting back 
 * https://peopleforbikes.prismic.io/graphql
 *
 * allEventsByCategory()
 * 
 * There are three types of events in the site
 * This combines three filtered queries of those events
 * It returns this payload the /events page, probably nowhere else
 * 
 */

export async function getEventsByCategory() { 
  // const eventTypes = [
  //   "PFB Event",
  //   "Sponsored Event",
  //   "Virtual Event"
  // ]
  // eventTypes.map( (type, i) => {
  //   data[i] = await fetchAPI(`
  //     {
  //       allEvents (where: { event_type_fulltext: ${type} }) {
  //         edges {
  //           node {
  //             title
  //             date
  //             event_location
  //             main_content
  //             _meta {
  //               id
  //               uid
  //             }
  //           }
  //         }
  //       } 
  //     }
  //   `)
  // } )

  let data = []

  data.push( await fetchAPI(`
    {
      allEvents (where: { event_type_fulltext: "PFB Event" }) {
        edges {
          node {
            title
            date
            event_location
            main_content
            _meta {
              id
              uid
            }
          }
        }
      } 
    }
  `))
  data[0].type = 'PFB Event'

  data.push( await fetchAPI(`
    {
      allEvents (where: { event_type_fulltext: "Sponsored Event" }) {
        edges {
          node {
            title
            date
            event_location
            main_content
            _meta {
              id
              uid
            }
          }
        }
      } 
    }
  `))
  data[1].type = 'Sponsored Event'

  data.push( await fetchAPI(`
    {
      allEvents (where: { event_type_fulltext: "Virtual Event" }) {
        edges {
          node {
            title
            date
            event_location
            main_content
            _meta {
              id
              uid
            }
          }
        }
      } 
    }
  `))
  data[2].type = 'Virtual Event'
    
  return data
}

