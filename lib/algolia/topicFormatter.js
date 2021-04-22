import { linkResolver } from '../utils'
import { topicConcat } from '../utils/topicConcat'
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

export function topicFormatter(payload) {
  const formattedPayload = []

  if ( payload.length > 1 ) {
    payload.map( item => {

      // Build object
      formattedPayload.push({
        title: `${item.node.title[0].text} - Landing Page`,
        objectID: item.node._meta.id,
        path: `https://www.peopleforbikes.org${linkResolver(item.node._meta)}`,
        type: "Topics & Policy",
        content: topicConcat(item.node),
        date: dateFormatter(item.node._meta.lastPublicationDate).unixTime,
        topics: [ item.node.title[0].text ],
        locations: null
      })

    })
  }

  return formattedPayload

}
