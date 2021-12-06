/**
 * evenOrOdd()
 * 
 * Just tells you whether or not the given value is even or odd.
 * 
 * @param { num } x - number you want to check
 */

export default function evenOrOdd(x) {
  return ( x & 1 ) ? "odd" : "even";
}

