import { linkResolver } from '../utils'
import { dateFormatter } from '../utils/dateFormatter'

/**
 * topicConcat()
 * 
 * Desc: takes full `node` data from topics, build single text blob for algolia
 * We're looking for the `intro` and `body` keys specifically
 * This is used to upload to Algolia so search has a singular content block to index
 * 
 * @param { array } content - expects rich text field from Prismic
 */
const topicConcat = (content) => {
  const contentBlob = []

  content.intro && contentBlob.push(content.intro)
  content.body && ( 
    content.body.map( (slice) => {
      return(
        <>
         { slice.primary && contentBlob.push(slice.primary.long_name) }
         { slice.fields && slice.fields.map( (item) => {
            return(
              contentBlob.push(item.sub_pillar, item.sub_pillar_summary)
            )
          })}
        </>
      )
    })
  ) 

  // returns nested text joined together into a string
  // this is how algolia wants content, so that's how we're doing it
  return contentBlob.join(' ')
}

/**
 * topicFormatter()
 * 
 * Desc: takes full `node` data from topics, makes nodes consistent with algolia shape
 * See readme.md in this folder for generalized information about what's going on below.
 * 
 * @param { array } payload - expects prismic data dump
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
