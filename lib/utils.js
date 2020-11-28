import React from 'react'
import Link from 'next/link'
import { Date as ParseDate } from 'prismic-reactjs'

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
 * @param { string } linkedText - string of what you want the link to say
 */

export const linkResolver = (link, linkedText = 'Click here to read more') => {
  switch(link.__typename) {
    case '_ExternalLink' :
      return link.target ? 
        (`<a href="${link.url}" target="${link.target}" rel="noopener">${linkedText}</a>`) : 
        (`<a href="${link.url}">${linkedText}</a>`)
    case '_FileLink' :
      return `<a href="${link.url}" target="_blank" rel="noopener">${linkedText}</a>`
    case '_ImageLink' :
      return `<a href="${link.url}" target="_blank" rel="noopener">${linkedText}</a>`
    case 'Topic' :
      return `/topics/${link._meta.uid}`
    case 'Locations' :
      return `/locations/${link._meta.uid}`
    case 'Event' :
      return `/events/${link._meta.uid}`
    case 'News' :
      return `/news/${link._meta.uid}`  
    case 'Action' :
      return `/take-action/${link._meta.uid}`  
    case 'landing-page' :
      return `/${link._meta.uid}`
  }
}

/**
 * Date Converter
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