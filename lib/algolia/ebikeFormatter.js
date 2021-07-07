import { linkResolver } from '../utils'
import { dateFormatter } from '../utils/dateFormatter'
import { contentConcat } from '../utils/contentConcat'

/**
 * ebikeFormatter()
 * 
 * Desc: takes full `node` data, makes nodes consistent with algolia shape
 * See readme.md in this folder for generalized information about what's going on below.
 * 
 * @param { array } payload - expects prismic data dump
 */
export function ebikeFormatter(payload) {
  const formattedPayload = []

  if ( payload.length > 1 ) {
    payload.map( item => {

      // Build object
      formattedPayload.push({
        title: `${item.node.title[0].text}`,
        objectID: item.node._meta.id,
        path: `https://www.peopleforbikes.org${linkResolver(item.node._meta)}`,
        type: "Electric Bike Info",
        content: contentConcat(item.node.main_content),
        date: dateFormatter(item.node._meta.lastPublicationDate).unixTime,
        topics: [ 'Electric Bikes' ],
        locations: null
      })

    })
  }
  
  return formattedPayload
}
