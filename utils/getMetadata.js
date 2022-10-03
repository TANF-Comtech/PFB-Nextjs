import * as prismicH from '@prismicio/helpers';

import { linkResolver } from '~/utils';
import data from '~/data';

/**
 * getMetadata()
 *
 * A function that formats all the major metadata params
 * You need to pass in the page object from Next
 * This function will parse it into a useable list of metadata
 *
 * @param { object } dataObject - send in page data from Next
 *
 * @returns { object } meta values
 */

const meta = { ...data.meta };

export default function getMetadata(dataObject) {
  const theTitle = getTitle(dataObject);
  const theByline = getByline(dataObject);
  const theDesc = getDesc(dataObject);
  const theKeywords = getKeywords(dataObject);
  const thePath = getPath(dataObject);
  const theDate = getDate(dataObject);
  const theDateModified = getDateModified(dataObject);
  const [theImage, theImageWidth, theImageHeight] = getImageData(dataObject);

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

const getTitle = (dataObject) => {
  if (dataObject.seo_title) {
    return `${dataObject.seo_title} | PeopleForBikes`;
  } else if (dataObject.title && dataObject._meta.uid !== 'new_homepage') {
    return `${dataObject.title[0].text} | PeopleForBikes`;
  } else {
    return meta.title;
  }
};

const getByline = (dataObject) => {
  if (dataObject.byline) {
    return dataObject.byline;
  } else {
    return 'PeopleForBikes Staff';
  }
};

const getDesc = (dataObject) => {
  if (dataObject.seo_text) {
    return dataObject.seo_text;
  } else if (dataObject.main_content) {
    return paraFinder(dataObject.main_content).text;
  } else if (dataObject.secondary_text && dataObject.main_text) {
    return `${dataObject.secondary_text} ${dataObject.main_text}`;
  } else if (dataObject.summary) {
    return dataObject.summary;
  } else {
    return meta.desc;
  }
};

const getKeywords = (dataObject) => {
  if (dataObject.seo_keywords) {
    return dataObject.seo_keywords;
  } else {
    return meta.keywords;
  }
};

const getPath = (dataObject) => {
  if (dataObject) {
    return `https://www.peopleforbikes.org${linkResolver(dataObject._meta)}`;
  } else {
    return meta.path;
  }
};

const getDate = (dataObject) => {
  if (dataObject.publication_date) {
    return new Date(prismicH.asDate(dataObject.publication_date));
  } else {
    return new Date(prismicH.asDate(dataObject._meta.lastPublicationDate));
  }
};

const getDateModified = (dataObject) => {
  if (dataObject._meta.lastPublicationDate) {
    return new Date(prismicH.asDate(dataObject._meta.lastPublicationDate));
  } else {
    return null;
  }
};

const getImageData = (dataObject) => {
  if (dataObject.seo_image) {
    return [
      dataObject.seo_image.url,
      dataObject.seo_image.dimensions.width,
      dataObject.seo_image.dimensions.height,
    ];
  } else if (dataObject.header_image) {
    return [
      dataObject.header_image.url,
      dataObject.header_image.dimensions.width,
      dataObject.header_image.dimensions.height,
    ];
  } else {
    return [meta.imgSrc, meta.imgWidth, meta.imgHeight];
  }
};

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

const paraFinder = (array) => {
  const contentFiltered = array.find((section) => section.type === 'paragraph');

  // returns the first paragraph from the rich text field
  return contentFiltered;
};
