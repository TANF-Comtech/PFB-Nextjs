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
 * 
 * You have to read next/link documentation for this to make any sense:
 * https://nextjs.org/docs/api-reference/next/link#dynamic-routes
 * 
 * <Link> requires `href` and `as` args, why both?
 * `as` is a human readable link that changes with UID 
 * `href` is for dynamic routing so you have to conform to Next syntax [uid], which is static
 * 
 * linkResolver() - helper function that returns the arg for next/link `as`
 * hrefResolver() - helper function that returns the arg for next/link `href`
 * 
 * @param {*} meta - accepts document meta from Prismic endpoint 
 */
export const linkResolver = (meta) => {
  switch(meta.type) {
    case 'topic' :
      return `/topics/${meta.uid}`
    case 'locations' :
      return `/locations/${meta.uid}`
    case 'event' :
      return `/events/${meta.uid}`
    case 'news' :
      return `/news/${meta.uid}`  
    case 'action' :
      return `/take-action/${meta.uid}`  
    case 'landing-page' :
      return `/${meta.uid}`
    
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