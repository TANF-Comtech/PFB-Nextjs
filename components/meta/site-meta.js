import Head from "next/head"

/**
 * <SiteMeta>
 * 
 * Displays the dynamic meta information for the whole site 
 * This can be adjusted by passing in a LOT of props
 *
 * @param { string } desc - description of the page
 * @param { string } imgHeight - height of the social splash image
 * @param { string } imgSrc - image source for the social splash image
 * @param { string } imgWidth - width of the social splash image
 * @param { string } ldJSON - LD+JSON block for pages (optional)
 * @param { string } path - URL of the page
 * @param { string } title - the title of the page 
 */
const SiteMeta = ( {
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
      <meta property="og:site_name" 
            content="PeopleForBikes"
            key="ogsite" />
      <meta property="og:locale" 
            content="en_US" 
            key="oglocale" />
      <meta property="og:type" 
            content="website" 
            key="ogtype" />            
      <meta name="twitter:title" 
            content={ title } 
            key="twtrtitle" />
      <meta name="twitter:description" 
            content={desc}
            key="twtrdesc" />
      <meta name="twitter:image" 
            content={ imgSrc } 
            key="twtrimg" />
      <meta name="twitter:image:width" 
            content={ imgWidth } 
            key="twtrimgw" />
      <meta name="twitter:image:height" 
            content={ imgHeight }  
            key="twtrimgh" /> 
      <meta name="twitter:card" 
            content="summary_large_image" 
            key="twtrcard" />
      <meta name="twitter:site" 
            content="@peopleforbikes" 
            key="twtrsite" />
      <link rel="canonical" 
            href={ path } 
            key="canonical" />  
      { ldJSON &&
        ( <script type="application/ld+json">{JSON.stringify(ldJSON)}</script> ) 
      } 
    </Head>
  )
}

export default SiteMeta