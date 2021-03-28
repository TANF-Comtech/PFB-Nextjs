import { linkResolver } from '../utils'
import { contentConcat } from '../utils/contentConcat'
import { dateFormatter } from '../utils/dateFormatter'

/**
 * 
 * The Algolia Data Formatter
 * https://www.algolia.com/doc/guides/sending-and-managing-data/prepare-your-data/
 * 
 * Algolia wants its data index structured in just such a way
 * This utility takes data from Prismic, transforms it for Algolia
 * 
 * At a high level, we want to index all of these nodes:
 * topic (all)
 * statistic_page (all)
 * report (all)
 * news (all)
 * member_content (all)
 * locations (all)
 * landing_page (all)
 * job (all)???
 * electric_bikes (all)
 * action_forms (all)??
 * 
 * 
 * Format should consistently look like:
 * {
 *    title: "",
 *    content: "",
 *    path: "",
 *    uid: "",
 *    date: "",
 *    topics: [
 *      "", "",
 *    ],
 *    locations: [
 *      "", "",
 *    ],
 *    image: ""
 * }
 */

export function dataFormatter(payload) {
  const formattedPayload = []

  if ( payload.length > 1 ) {
    payload.map( item => {

      // Build object
      formattedPayload.push({
        title: item.node.title[0].text,
        uid: item.node._meta.id,
        path: `https://www.peopleforbikes.org${linkResolver(item.node._meta)}`,
        type: item.node._meta.type,
        content: contentConcat(item.node.main_content),
        date: dateFormatter(item.node.publication_date ? item.node.publication_date : item.node._meta.lastPublicationDate).unixTime,
        topics: item.node.topics.length > 0 && item.node.topics[0].title !== null ? 
          item.node.topics.map( 
            (single) => { 
              if (single.topic !== null) {
                return single.topic.title[0].text
              }
              else return null
            }
          ) : null,
        locations: item.node.locations.length > 0 && item.node.locations[0].location !== null ? 
          item.node.locations.map( 
            (single) => { 
              if (single.location !== null) {
                return single.location.location[0].text 
              }
              else return null
            }
          ) : null
      })

    })
  }

  return formattedPayload

}
