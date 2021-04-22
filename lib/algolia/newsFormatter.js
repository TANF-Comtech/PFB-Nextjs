import { linkResolver } from '../utils'
import { dateFormatter } from '../utils/dateFormatter'

/**
 * contentConcat()
 * 
 * Desc: takes the array of content from Prismic rich text and creates a text blob
 * 
 * Prismic gives us rich text arrays from the backend that can contain many things
 * We are looking for: "heading2", "heading3", "heading4", "list-item", and "paragraph"
 * We concatenate this content together to form a text blob
 * This is used to upload to Algolia so search has a singular content block to index 
 * 
 * @param { array } content - expects rich text field from Prismic
 */
 export const contentConcat = (content) => {

  const contentFiltered = content.filter( section => (
    section.type === 'heading2'  || 
    section.type === 'heading3'  ||
    section.type === 'heading4'  ||
    section.type === 'list-item' ||
    section.type === 'paragraph' 
  ))
  
  // returns nested text joined together into a string
  // this is how algolia wants content, so that's how we're doing it
  return contentFiltered.map( (item) => {
    return item.text
  }).join(' ')
 }

 
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
