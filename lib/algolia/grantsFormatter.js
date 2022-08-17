import { linkResolver } from '~/utils';
import { contentConcat } from '~/utils/contentConcat';
import { dateFormatter } from '~/utils/dateFormatter';

/**
 * grantsDate()
 *
 * Desc: grants only display a cycle date ('spring 2017' or 'fall 2003')
 * JS Date() needs at least YYYY-MM-DD, so we transform it in this function
 * Since the grants don't have a specific data, we just pick a middle spring/fall date
 *
 * @param { array } cycleDate - expects ('spring 2017' or 'fall 2003', etc)
 */
export function grantsDate(cycleDate) {
  const splitDate = cycleDate.match(/\w+/g);

  if (splitDate[0].toLowerCase() === 'spring') {
    return `${splitDate[1]}-05-01`;
  } else if (splitDate[0].toLowerCase() === 'summer') {
    return `${splitDate[1]}-08-01`;
  } else if (splitDate[0].toLowerCase() === 'fall') {
    return `${splitDate[1]}-11-01`;
  } else if (splitDate[0].toLowerCase() === 'winter') {
    return `${splitDate[1]}-02-01`;
  } else if (typeof splitDate[0] === 'number') {
    return `${splitDate[0]}-01-01`;
  } else return null;
}

/**
 * grantsFormatter()
 *
 * Desc: takes full `node` data, makes nodes consistent with algolia shape
 * See readme.md in this folder for generalized information about what's going on below.
 *
 * @param { array } payload - expects prismic data dump
 */
export function grantsFormatter(payload) {
  const formattedPayload = [];

  if (payload.length > 1) {
    payload.map((item) => {
      // Build object
      formattedPayload.push({
        title: `${item.node.title[0].text}`,
        objectID: item.node._meta.id,
        path: `https://www.peopleforbikes.org${linkResolver(item.node._meta)}`,
        type: 'Grant',
        content: item.node.main_content ? contentConcat(item.node.main_content) : null,
        date: item.node.cycle ? dateFormatter(grantsDate(item.node.cycle)).unixTime : null,
        topics: null,
        locations: item.node.location1 ? [item.node.location1.location[0].text] : null,
      });
    });
  }

  return formattedPayload;
}

/**
 * grantsOnlyFormatter()
 *
 * Desc: takes full `node` data, makes nodes consistent with algolia shape
 * This powers the grants finder
 *
 * @param { array } payload - expects prismic data dump
 */
export function grantsOnlyFormatter(payload) {
  const formattedPayload = [];

  if (payload.length > 1) {
    payload.map((item) => {
      // Build object
      formattedPayload.push({
        title: `${item.node.title[0].text}`,
        objectID: item.node._meta.id,
        path: `https://www.peopleforbikes.org${linkResolver(item.node._meta)}`,
        type: item.node.type ? item.node.type : null,
        content: item.node.main_content ? contentConcat(item.node.main_content) : null,
        cycle: item.node.cycle ? item.node.cycle : null,
        locations: item.node.location1 ? item.node.location1.location[0].text : null,
      });
    });
  }

  return formattedPayload;
}
