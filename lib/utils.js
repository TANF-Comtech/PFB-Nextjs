import React from 'react'
import Link from 'next/link'
import { Elements } from 'prismic-reactjs';

// Utility Functions, should make life easier I hope 

/**
 * randomID() - generates sufficiently random numbers for React key IDs
 * @param {} null - just call it
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
 * @param {*} doc - accepts document from Prismic endpoint 
 */
export const linkResolver = (doc) => {
  if (doc.type === 'Landing_page')  {
    return `/${doc.uid}`
  }
  return '/'
}

export const hrefResolver = (doc) => {
  if (doc.type === 'Landing_page') {
    return '/[uid]'
  }
  return '/'
}


export const customNextLink = (type, element, content, children, index) => (
  <Link key={element.data.id} to={linkResolver(element.data)}>
    <a>{content}</a>
  </Link>
);


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

/**
 * 
 */ 
// -- Function to add unique key to props
const propsWithUniqueKey = function(props, key) {
  return Object.assign(props || {}, { key });
};
 
// -- HTML Serializer
export const htmlSerializer = function(type, element, content, children, key) {
 
  var props = {};
 
  switch(type) {
      
    case Elements.heading1: // Heading 1
      return React.createElement('h1', propsWithUniqueKey(props, key), children);
      
    case Elements.heading2: // Heading 2
      return React.createElement('h2', propsWithUniqueKey(props, key), children);
      
    case Elements.heading3: // Heading 3
      return React.createElement('h3', propsWithUniqueKey(props, key), children);
      
    case Elements.heading4: // Heading 4
      return React.createElement('h4', propsWithUniqueKey(props, key), children);
      
    case Elements.heading5: // Heading 5
      return React.createElement('h5', propsWithUniqueKey(props, key), children);
      
    case Elements.heading6: // Heading 6
      return React.createElement('h6', propsWithUniqueKey(props, key), children);
      
    case Elements.paragraph: // Paragraph
      return React.createElement('p', propsWithUniqueKey(props, key), children);
      
    case Elements.preformatted: // Preformatted
      return React.createElement('pre', propsWithUniqueKey(props, key), children);
      
    case Elements.strong: // Strong
      return React.createElement('strong', propsWithUniqueKey(props, key), children);
      
    case Elements.em: // Emphasis
      return React.createElement('em', propsWithUniqueKey(props, key), children);
      
    case Elements.listItem: // Unordered List Item
      return React.createElement('li', propsWithUniqueKey(props, key), children);
      
    case Elements.oListItem: // Ordered List Item
      return React.createElement('li', propsWithUniqueKey(props, key), children);
      
    case Elements.list: // Unordered List
      return React.createElement('ul', propsWithUniqueKey(props, key), children);
      
    case Elements.oList: // Ordered List
      return React.createElement('ol', propsWithUniqueKey(props, key), children);
      
    case Elements.image: // Image
      const linkUrl = element.linkTo ? element.linkTo.url || linkResolver(element.linkTo) : null;
      const linkTarget = (element.linkTo && element.linkTo.target) ? { target: element.linkTo.target } : {};
      const linkRel = linkTarget.target ? { rel: 'noopener' } : {};
      const img = React.createElement('img', { src: element.url , alt: element.alt || '' });
      return React.createElement(
        'p',
        propsWithUniqueKey({ className: [element.label || '', 'block-img'].join(' ') }, key),
        linkUrl ? React.createElement('a', Object.assign({ href: linkUrl }, linkTarget, linkRel), img) : img
      );
      
    case Elements.embed: // Embed
      props = Object.assign({
        "data-oembed": element.oembed.embed_url,
        "data-oembed-type": element.oembed.type,
        "data-oembed-provider": element.oembed.provider_name,
      }, element.label ? {className: element.label} : {});
      const embedHtml = React.createElement('div', {dangerouslySetInnerHTML: {__html: element.oembed.html}});
      return React.createElement('div', propsWithUniqueKey(props, key), embedHtml);
      
    case Elements.hyperlink: // Image
      const targetAttr = element.data.target ? { target: element.data.target } : {};
      const relAttr = element.data.target ? { rel: 'noopener' } : {};
      props = Object.assign({ 
        href: element.data.url || linkResolver(element.data)
      }, targetAttr, relAttr);
      return React.createElement('a', propsWithUniqueKey(props, key), children);
      
    case Elements.label: // Label
      props = element.data ? Object.assign({}, { className: element.data.label }) : {};
      return React.createElement('span', propsWithUniqueKey(props, key), children);
      
    case Elements.span: // Span
      if (content) {
        return content.split("\n").reduce((acc, p) => {
          if (acc.length === 0) {
            return [p];
          } else {
            const brIndex = (acc.length + 1)/2 - 1;
            const br = React.createElement('br', propsWithUniqueKey({}, brIndex));
            return acc.concat([br, p]);
          }
        }, []);
      } else {
        return null;
      }
 
    default: // Always include a default that returns null
      return null;
  }
};