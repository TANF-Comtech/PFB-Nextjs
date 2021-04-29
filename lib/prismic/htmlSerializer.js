import React from 'react';
import { Elements } from 'prismic-reactjs';

// -- Function to add unique key to props
const propsWithUniqueKey = function(props, key) {
  return Object.assign(props || {}, { key });
};

/**
 * htmlSerializer()
 * 
 * This is another creature of the Prismic lagoon
 * The idea is you can hijack their weird RichText rendering and manipulate the output 
 * See their docs: https://prismic.io/docs/technologies/html-serializer-reactjs
 * 
 * Our main use case is that their rich text field embed functionality is awful, so we can augment it creatively...
 * PFB needs to embed a lot of stuff, so they can just use <pre> tags and we can hijack those and actually render the content
 * Hacky yes, but Prismic is awful for stuff like this so get your hacks out baby
 * 
 * @param {*} type - sniffs type of element
 * @param {*} element - actual el payload 
 * @param {*} content - even more cryptic?
 * @param {*} children - react children
 * @param {*} key - not really sure but it's in their cryptic docs
 * @returns { obj } - react JSX element done up the way you want
 */
export const htmlSerializer = function(type, element, content, children, key) {

  var props = {};

  switch(type) {
    // Converts Preformatted into embed, so we can work around Prismic's limitations
    // Also applies a responsive wrapper into the mix...
    case Elements.preformatted: // Preformatted
      return React.createElement('p', {
        dangerouslySetInnerHTML: {
          __html: element.text 
        },
        className: 'yt-video-container'
      });

    // Return null to stick with the default behavior
    default: 
      return null;
  }
};