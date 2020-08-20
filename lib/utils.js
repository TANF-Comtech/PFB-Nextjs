/**
 * 
 * Utility Functions 
 * 
 * Stuff to help you build a better site hopefully
 */

/**
 * 
 * randomID() - generates sufficiently random numbers for React key IDs
 * @param {} null - just call it
 */
export const randomID = () => { return Math.round(Math.random() * 10000000) }