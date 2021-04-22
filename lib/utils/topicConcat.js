/**
 * topicConcat()
 * 
 * Desc: takes full `node` data from topics, build single text blob for algolia
 * We're looking for the `intro` and `body` keys specifically
 * This is used to upload to Algolia so search has a singular content block to index
 * 
 * @param { array } content - expects rich text field from Prismic
 */
export const topicConcat = (content) => {
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