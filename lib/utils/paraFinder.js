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
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    // Basically we destructure the current and adjacent array indicies
    // Then we swap them around, with j being a randomized index
    [array[i], array[j]] = [array[j], array[i]];
  }
}

