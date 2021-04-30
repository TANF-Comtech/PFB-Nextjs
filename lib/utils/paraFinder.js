/**
 * 
 * paraFinder()
 * 
 * Desc: finds a paragraph from a Prismic rich text option
 *  
 * A bit counterintuitively, Prismic sends back main_content fields as arrays of objects
 * This poses a problem for producing rich text metadata descriptions
 * This function basically thumbs through a Prismic rich text object and finds a paragraph 
 * 
 * 
 * @param { array } array - Rich Text prismic API response 
 */

 export function paraFinder(array) {
  const contentFiltered = array.filter( section => (
    section.type === 'paragraph' 
  ))

  // returns the first paragraph from the rich text field
  return contentFiltered[0]
}

