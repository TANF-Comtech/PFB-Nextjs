import Head from "next/head"

/**
 * <SiteMetaCustom>
 * 
 * Allows you to override the base site meta stuff
 * Anything that was variable in <SiteMeta> is present here
 *
 * @param { string } desc - description of the page
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
  ldJSON,
  path,
  title
}) => {

  return (
    <Head>
      <title key="title">{ title }</title>
      <meta name="description" 
            content={ desc } 
            key="metadesc" />
      <meta property="og:image" 
            content={ imgSrc }  
            key="ogimg" />
      <meta property="og:image:width" 
            content={ imgWidth } 
            key="ogimgw" />
      <meta property="og:image:height" 
            content={ imgHeight } 
            key="ogimgh" />
      <meta property="og:title" 
            content={ title }
            key="ogtitle" />
      <meta property="og:description" 
            content={desc}  
            key="ogdesc" />
      <meta property="og:url" 
            content={ path } 
            key="ogurl" />          
      <meta name="twitter:title" 
            content={ title } 
            key="twtrtitle" />
      <meta name="twitter:description" 
            content={desc}
            key="twtrdesc" />
      <link rel="canonical" 
            href={ path } 
            key="canonical" />  
      { ldJSON &&
        ( <script type="application/ld+json">{JSON.stringify(ldJSON)}</script> ) 
      } 
    </Head>
  )
}

export default SiteMetaCustom