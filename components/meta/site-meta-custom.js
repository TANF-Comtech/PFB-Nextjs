import Head from "next/head"

/**
 * <SiteMetaCustom>
 * 
 * Allows you to override the base site meta stuff
 * Anything that was variable in <SiteMetaCustom> is present here
 *
 * @param { string } desc - description of the page
 * @param { string } keywords - keywords we want on the PFB site
 * @param { string } imgHeight - height of the social splash image
 * @param { string } imgSrc - image source for the social splash image
 * @param { string } imgWidth - width of the social splash image
 * @param { string } ldJSON - LD+JSON block for pages (optional)
 * @param { string } path - URL of the page
 * @param { string } title - the title of the page 
 */
const SiteMetaCustom = ( {
  desc,
  imgHeight,
  imgSrc,
  imgWidth,
  keywords,
  ldJSON,
  path,
  title
}) => {

  return (
    <Head>
      <title key="title">{ title }</title>
      <meta name="description" 
            content={ desc } 
            key="metadesc" ></meta>
      <meta name="keywords" 
            content={ keywords } 
            key="metakeywords" ></meta>  
      <meta property="fb:app_id" content="1771036746278242" ></meta>
      <meta property="og:locale" content="en_US"></meta>
      <meta property="og:site_name" content="PeopleForBikes"></meta>
      <meta property="og:type" content="website" ></meta>
      <meta property="og:url" content={ path } ></meta>
      <meta property="og:image" 
            content={ imgSrc }  
            key="ogimg" ></meta>
      <meta property="og:image:width" 
            content={ imgWidth } 
            key="ogimgw" ></meta>
      <meta property="og:image:height" 
            content={ imgHeight } 
            key="ogimgh" ></meta>
      <meta property="og:title" 
            content={ title }
            key="ogtitle" ></meta>
      <meta property="og:description" 
            content={desc}  
            key="ogdesc" ></meta>
      <meta property="og:url" 
            content={ path } 
            key="ogurl" ></meta>          
      <meta name="twitter:title" 
            content={ title } 
            key="twtrtitle" ></meta>
      <meta name="twitter:description" 
            content={desc}
            key="twtrdesc" ></meta>
      <meta name="twitter:card" content="summary_large_image" ></meta>
      <meta name="twitter:domain" content="peopleforbikes.org" ></meta>
      <meta name="twitter:site" content="@peopleforbikes" ></meta>
      <meta property="twitter:image" content={ imgSrc } key="twitterimg" ></meta>      
      <link rel="canonical" 
            href={ path } 
            key="canonical" ></link>  
      { ldJSON &&
        ( <script type="application/ld+json">{JSON.stringify(ldJSON)}</script> ) 
      } 
    </Head>
  )
}

export default SiteMetaCustom