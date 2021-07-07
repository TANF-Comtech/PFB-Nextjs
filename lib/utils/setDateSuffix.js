/**
 * setDateSuffix()
 * 
 * Desc: Takes two digit date, adds 'st', 'nd', 'rd', etc
 * 
 * @param { integer } num - a number date
 */

 export const setDateSuffix = (num) => {
  const j = num % 10,
        k = num % 100

  if (j === 1 && k !== 11) {
    return num + "st";
  }
  if (j === 2 && k !== 12) {
    return num + "nd";
  }
  if (j === 3 && k !== 13) {
    return num + "rd";
  }

  return num + "th";
}