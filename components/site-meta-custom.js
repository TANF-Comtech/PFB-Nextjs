import React from 'react';
import Head from 'next/head';

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
const SiteMetaCustom = (props) => {
  const { desc, imgHeight, imgSrc, imgWidth, keywords, ldJSON, path, title } = props;

  return (
    <Head>
      <title key="title">{title}</title>
      <meta name="description" content={desc} key="metadesc" />
      <meta name="keywords" content={keywords} key="metakeywords" />
      <meta property="fb:app_id" content="1771036746278242" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content="PeopleForBikes" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={path} />
      <meta property="og:image" content={imgSrc} key="ogimg" />
      <meta property="og:image:width" content={imgWidth} key="ogimgw" />
      <meta property="og:image:height" content={imgHeight} key="ogimgh" />
      <meta property="og:title" content={title} key="ogtitle" />
      <meta property="og:description" content={desc} key="ogdesc" />
      <meta property="og:url" content={path} key="ogurl" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@peopleforbikes" />
      <meta name="twitter:domain" content="peopleforbikes.org" />
      <meta name="twitter:title" content={title} key="twtrtitle" />
      <meta name="twitter:description" content={desc} key="twtrdesc" />
      <meta name="twitter:image" content={imgSrc} key="twitterimg" />
      <link rel="canonical" href={path} key="canonical" />
      {ldJSON && <script type="application/ld+json">{JSON.stringify(ldJSON)}</script>}
    </Head>
  );
};

export default SiteMetaCustom;
