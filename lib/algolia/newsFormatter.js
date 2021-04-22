import { linkResolver } from '../utils'
import { dateFormatter } from '../utils/dateFormatter'
import { contentConcat } from '../utils/contentConcat'
/**
 * newsFormatter()
 * 
 * Desc: takes full `node` data and makes nodes consistent with algolia shape
 * See readme.md in this folder for generalized information about what's going on below.
 * 
 * @param { array } payload - expects prismic data dump
 */
export function newsFormatter(payload) {
  const formattedPayload = []

  if ( payload.length > 1 ) {
    payload.map( item => {

      // Build object
      formattedPayload.push({
        title: item.node.title[0].text,
        objectID: item.node._meta.id,
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
