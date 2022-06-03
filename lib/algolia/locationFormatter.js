import { linkResolver } from '../utils';
import { dateFormatter } from '../utils/dateFormatter';

/**
 * locationFormatter()
 *
 * Desc: takes full `node` data, makes nodes consistent with algolia shape
 * See readme.md in this folder for generalized information about what's going on below.
 *
 * @param { array } payload - expects prismic data dump
 */
export function locationFormatter(payload) {
  const formattedPayload = [];

  if (payload.length > 1) {
    payload.map((item) => {
      // Build object
      formattedPayload.push({
        title: `${item.node.location[0].text} - Landing Page`,
        objectID: item.node._meta.id,
        path: `https://www.peopleforbikes.org${linkResolver(item.node._meta)}`,
        type: 'Locations',
        content: item.node.intro ? item.node.intro[0].text : null,
        date: dateFormatter(item.node._meta.lastPublicationDate).unixTime,
        topics: null,
        locations: [item.node.location[0].text],
      });
    });
  }

  return formattedPayload;
}
