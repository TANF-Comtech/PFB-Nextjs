// Utility Functions, should make life easier I hope 

/**
 * randomID() - generates sufficiently random numbers for React key IDs
 * @param { int } num - however random you want it
 */
export const randomID = (num) => { return Math.round(Math.random() * num) }

/**
 * linkResolver()
 * 
 * Prismic link handling is EXTREMELY convoluted and poorly documented
 * Maybe it's better by the time you read this?
 * https://prismic.io/docs/technologies/templating-link-and-content-relationship-fields-javascript 
 * 
 * Every link type in their system can return one of these types:
 *    1) _ExternalLink (obj with `target`, `url` params); 
 *    2) _FileLink (obj with `url` param); 
 *    3) _ImageLink (obj with `url` param); 
 *    4) Document (obj with nested `_meta` params including `uid`)
 *      
 * Each type must be handled differently
 * For this site, types 1,2,3 are treated as offsite links
 * 
 * Type 4, document links, require path resolution inside of the Next app
 * We're sending the `href` arg back to be used with <Link>
 * 
 * @param { object } link - accepts prismic `link`
 * @param { boolean } linkWrapper - true if link wraps other elements, false default
 * @param { string } linkedText - string of what you want the link to say
 */

export const linkResolver = (
  link, 
  linkWrapper = false,
  linkedText = 'Click here to read more',
) => {

  // If the link wraps other elements & is a non next/link type, just return the path
  if ( (link.__typename === '_ExternalLink') || 
       (link.__typename === '_FileLink') ||
       (link.__typename === '_ImageLink') ) {
    return `${link.url}`
  } 

  // Link is not an object, just return the string right back
  if( typeof(link) === 'string' ) {
    return link
  }

  // Sniff all non-wrapping link types
  switch(link.__typename) {
    // case '_ExternalLink' :
    //   return link.target ? 
    //     (`<a href="${link.url}" target="${link.target}" rel="noopener">${linkedText}</a>`) : 
    //     (`<a href="${link.url}">${linkedText}</a>`)
    // case '_FileLink' :
    //   return `<a href="${link.url}" target="_blank" rel="noopener">${linkedText}</a>`
    // case '_ImageLink' :
    //   return `<a href="${link.url}" target="_blank" rel="noopener">${linkedText}</a>`
    case 'Action' :
      return `/take-action/${link._meta.uid}`     
    case 'Basic_page' :
      return link.parent_page ?
        (`/${link.parent_page._meta.uid}/${link._meta.uid}`) :
        (`/pages/${link._meta.uid}`)    
    case 'Event' :
      return `/events/${link._meta.uid}`
    case 'Job' :
      return `/careers/${link._meta.uid}`  
    case 'Landing_page' :
      return `/${link._meta.uid}`
    case 'Locations' :
      return `/locations/${link._meta.uid}`
    case 'News' :
      return `/news/${link._meta.uid}`  
    case 'Policy' :
      return `/policy/${link._meta.uid}`
    case 'Topic' :
      return `/topics/${link._meta.uid}`
  }
}

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