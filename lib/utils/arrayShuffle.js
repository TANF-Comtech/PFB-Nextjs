/**
 * arrayShuffle...drum roll please...shuffles an array
 * The idea is to introduce some randomness into things
 * The array is directly modified, not immutable
 *  
 * This is the Fisher-Yates randomization method
 * The idea is to count down from the back of the array
 * As you go, you randomly pick a random one before it 
 * 
 * 
 * @param { array } array - array you want to shuffle 
 */

 export function arrayShuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    // Basically we destructure the current and adjacent array indicies
    // Then we swap them around, with j being a randomized index
    [array[i], array[j]] = [array[j], array[i]];
  }
}

