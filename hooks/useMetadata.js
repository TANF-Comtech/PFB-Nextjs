import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { Date as ParseDate } from 'prismic-reactjs';

import { linkResolver } from '../lib/utils';
import DefaultContext from '../context/default/default-context';

/**
 *
 * paraFinder()
 *
 * Desc: finds a paragraph from a Prismic rich text option
 *
 * A bit counterintuitively, Prismic sends back main_content fields as arrays of objects
 * This poses a problem for producing rich text metadata descriptions
 * This function basically thumbs through a Prismic rich text object and finds a paragraph
 *
 *
 * @param { array } array - Rich Text prismic API response
 */

function paraFinder(array) {
  const contentFiltered = array.filter((section) => section.type === 'paragraph');

  // returns the first paragraph from the rich text field
  return contentFiltered[0];
}

/**
 * useMetadata()
 *
 * A hook that sets all the major metadata params
 * You need to pass in the page object from Next
 * This hook will parse it into a useable list of metadata
 *
 * @param { object } dataObject - send in page data from Next
 *
 * @returns { object } meta values
 */

export default function useMetadata(dataObject) {
  // Set up router
  const router = useRouter();

  const { meta } = useContext(DefaultContext);

  const [theTitle, setTheTitle] = useState();
  const [theByline, setTheByline] = useState();
  const [theDesc, setTheDesc] = useState();
  const [theKeywords, setTheKeywords] = useState();
  const [thePath, setThePath] = useState();
  const [theDate, setTheDate] = useState();
  const [theDateModified, setTheDateModified] = useState();
  const [theImage, setTheImage] = useState();
  const [theImageWidth, setTheImageWidth] = useState();
  const [theImageHeight, setTheImageHeight] = useState();

  // Check for SEO-specific overrides, set if they are present (only run once)
  useEffect(() => {
    // Title
    if (dataObject.seo_title) {
      setTheTitle(`${dataObject.seo_title} | PeopleForBikes`);
    } else if (dataObject.title && dataObject._meta.uid !== 'new_homepage') {
      setTheTitle(`${dataObject.title[0].text} | PeopleForBikes`);
    } else {
      setTheTitle(meta.title);
    }

    // Byline
    if (dataObject.byline) {
      setTheByline(dataObject.byline);
    } else {
      setTheByline('PeopleForBikes Staff');
    }

    // Keywords
    if (dataObject.seo_keywords) {
      setTheKeywords(dataObject.seo_keywords);
    } else {
      setTheKeywords(meta.keywords);
    }

    // Description
    if (dataObject.seo_text) {
      setTheDesc(dataObject.seo_text);
    } else if (dataObject.main_content) {
      setTheDesc(paraFinder(dataObject.main_content).text);
    } else if (dataObject.secondary_text && dataObject.main_text) {
      setTheDesc(`${dataObject.secondary_text} ${dataObject.main_text}`);
    } else if (dataObject.summary) {
      setTheDesc(dataObject.summary);
    } else {
      setTheDesc(meta.desc);
    }

    // Path
    if (dataObject) {
      setThePath(`https://www.peopleforbikes.org${linkResolver(dataObject._meta)}`);
    } else {
      setThePath(meta.path);
    }

    // Date
    if (dataObject.publication_date) {
      setTheDate(new Date(ParseDate(dataObject.publication_date)));
    } else {
      setTheDate(new Date(ParseDate(dataObject._meta.lastPublicationDate)));
    }

    // Modified Date
    if (dataObject._meta.lastPublicationDate) {
      setTheDateModified(new Date(ParseDate(dataObject._meta.lastPublicationDate)));
    }

    // Image
    if (dataObject.seo_image) {
      setTheImage(dataObject.seo_image.url);
      setTheImageWidth(dataObject.seo_image.dimensions.width);
      setTheImageHeight(dataObject.seo_image.dimensions.height);
    } else if (dataObject.header_image) {
      setTheImage(dataObject.header_image.url);
      setTheImageWidth(dataObject.header_image.dimensions.width);
      setTheImageHeight(dataObject.header_image.dimensions.height);
    } else {
      setTheImage(meta.imgSrc);
      setTheImageWidth(meta.imgWidth);
      setTheImageHeight(meta.imgHeight);
    }
  }, [router.query.uid]);

  return {
    theTitle,
    theByline,
    theDesc,
    theKeywords,
    thePath,
    theDate,
    theDateModified,
    theImage,
    theImageWidth,
    theImageHeight,
  };
}
