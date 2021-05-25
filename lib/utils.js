// Utility Functions, should make life easier I hope

/**
 * randomID() - generates sufficiently random numbers for React key IDs
 * @param { int } num - however random you want it
 */
export const randomID = (num) => {
  return Math.round(Math.random() * num);
};

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
 *    5) Type (when you get sent `_meta` obj from the front-end)
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
  linkedText = "Click here to read more"
) => {
  // If the link wraps other elements & is a non next/link type, just return the path
  if (
    link.__typename === "_ExternalLink" ||
    link.__typename === "_FileLink" ||
    link.__typename === "_ImageLink"
  ) {
    return `${link.url}`;
  }

  // Link is not an object, just return the string right back
  if (typeof link === "string") {
    return link;
  }

  if( link.link_type === "Document" ) {
    switch(link.type) {
      case 'action' :
        return `/take-action/${link.uid}`     
      case 'basic_page' :
        return `/pages/${link.uid}`
      case 'campaign' :
        return `/campaign/${link.uid}`
      case 'electric_bikes' :
        return `/electric-bikes/${link.uid}`
      case 'event' :
        return `/events/${link.uid}`
      case 'grant' :
        return `/grants/${link.uid}`      
      case 'job' :
        return `/careers/${link.uid}`  
      case 'landing_page' :
        return `/${link.uid}`
      case 'locations' :
        return `/locations/${link.uid}`
      case 'member_content':
        return `/members/${link.uid}`
      case 'news' :
        return `/news/${link.uid}`  
      case 'policy' :
        return `/policy/${link.uid}`
      case 'report' :
        return `/reports/${link.uid}`        
      case 'statistic_page' :
        return `/statistics/${link.uid}`      
      case 'topic' :
        return `/topics/${link.uid}`
    }
  }

  if( link._linkType === "Link.document" ) {
    switch(link._meta.type) {
      case 'action' :
        return `/take-action/${link._meta.uid}`     
      case 'basic_page' :
        return `/pages/${link._meta.uid}`
      case 'campaign' :
        return `/campaign/${link._meta.uid}`
      case 'electric_bikes' :
        return `/electric-bikes/${link._meta.uid}`
      case 'event' :
        return `/events/${link._meta.uid}`
      case 'grant' :
        return `/grants/${link._meta.uid}`      
      case 'job' :
        return `/careers/${link._meta.uid}`  
      case 'landing_page' :
        return `/${link._meta.uid}`
      case 'locations' :
        return `/locations/${link._meta.uid}`
      case 'member_content':
        return `/members/${link._meta.uid}`
      case 'news' :
        return `/news/${link._meta.uid}`  
      case 'policy' :
        return `/policy/${link._meta.uid}`
      case 'report' :
        return `/reports/${link._meta.uid}`        
      case 'statistic_page' :
        return `/statistics/${link._meta.uid}`      
      case 'topic' :
        return `/topics/${link._meta.uid}`
    }
  }

  if( link.__typename  ) {
    switch(link.__typename) {
      case 'Action' :
        return `/take-action/${link._meta.uid}`     
      case 'Basic_page' :
        return `/pages/${link._meta.uid}`
      case 'Campaign' :
        return `/campaigns/${link._meta.uid}`        
      case 'Event' :
        return `/events/${link._meta.uid}`
      case 'Electric Bikes' :
        return `/electric-bikes/${link._meta.uid}`
      case 'Grant' :
        return `/grants/${link._meta.uid}`      
      case 'Job' :
        return `/careers/${link._meta.uid}`  
      case 'Landing_page' :
        return `/${link._meta.uid}`
      case 'Locations' :
        return `/locations/${link._meta.uid}`
      case 'Member Content':
        return `/members/${link._meta.uid}`
      case 'News' :
        return `/news/${link._meta.uid}`  
      case 'Policy' :
        return `/policy/${link._meta.uid}`
      case 'Report' :
        return `/reports/${link._meta.uid}`        
      case 'Statistic Page' :
        return `/statistics/${link._meta.uid}`      
      case 'Topic' :
        return `/topics/${link._meta.uid}`
    }
  }

  if( link.type  ) {
    switch(link.type) {
      case 'action' :
        return `/take-action/${link.uid}`     
      case 'basic_page' :
        return `/pages/${link.uid}`
      case 'campaign' :
        return `/campaign/${link.uid}`
      case 'electric_bikes' :
        return `/electric-bikes/${link.uid}`
      case 'event' :
        return `/events/${link.uid}`
      case 'grant' :
        return `/grants/${link.uid}`      
      case 'job' :
        return `/careers/${link.uid}`  
      case 'landing_page' :
        return `/${link.uid}`
      case 'locations' :
        return `/locations/${link.uid}`
      case 'member_content':
        return `/members/${link.uid}`
      case 'news' :
        return `/news/${link.uid}`  
      case 'policy' :
        return `/policy/${link.uid}`
      case 'report' :
        return `/reports/${link.uid}`        
      case 'statistic_page' :
        return `/statistics/${link.uid}`      
      case 'topic' :
        return `/topics/${link.uid}`
    }
  }
}
