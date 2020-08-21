import React from 'react'
import Link from 'next/link'

// Utility Functions, should make life easier I hope 

/**
 * randomID() - generates sufficiently random numbers for React key IDs
 * @param {} null - just call it
 */
export const randomID = () => { return Math.round(Math.random() * 10000000) }


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
 * @param {*} doc - accepts document from Prismic endpoint 
 */
export const linkResolver = (doc) => {
  if (doc.__typename === 'Landing_page') {
    return `/${doc._meta.uid}`
  }
  return '/'
}

export const hrefResolver = (doc) => {
  if (doc.__typename === 'Landing_page') {
    return '/[uid]'
  }
  return '/'
}


/**
 * <DocLink> - a component that generates links to others pages on the site
 * It heavily uses the two functions above, linkResolver and hrefResolver
 * 
 * @param {*} children - accepts children components, React classic
 * @param {*} link - the inbound URL from Prismic
 * @param {*} linkClass - the class a link element may have
 */
export const DocLink = ({ children, link, linkClass }) => {
  console.log(link)
  if (link) {

    // If the link is an internal link, then return a NextLink
    if (link._linkType === 'Link.Document') {
      return (
        <Link
          as={ linkResolver(link) }
          href={ hrefResolver(link) }
        >
          <a className={linkClass}>{children}</a>
        </Link>
      )
    }

    // Otherwise return a normal anchor element
    return (
      <a 
        className={linkClass} 
        href={hrefResolver(link)}
      >
        {children}
      </a>
    )
  }
  return null
}