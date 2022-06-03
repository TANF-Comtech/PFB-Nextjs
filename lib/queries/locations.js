import Prismic from '@prismicio/client';

import { fetchAPI, API_LOCALE, REF_API_URL } from '../api';
import { actionitemSliceFields, ridespotSliceFields } from './fragments';
import { resultsReducer } from '../resultsReducer';

/**
 * !!!!!!!!!!!!!!!!!
 * Test all queries to know what you are getting back
 * https://peopleforbikes.prismic.io/graphql
 */

/**
 * getLocations()
 *
 * Prismic only does 20 entries per call, so if you have more, you have to get creative
 * resultsReducer() allows us to get more than 20 results and combines all results into one array
 *
 */

export async function getLocations() {
  // Set up what we need in at the node level from a Location
  const nodeQuery = `{
    intro
    location
    header_image
    _linkType
    _meta {
      id
      type
      lastPublicationDate
      uid
    }
  }`;

  // Call reducer so we can have 20+ records
  return resultsReducer(`allLocationss`, `location_ASC`, nodeQuery);
}

/**
 * getLocationsNoImages()
 *
 * resultsReducer() allows us to get more than 20 results and combines all results into one array
 * But in this case we only don't want the image payload, very similar to query above
 *
 */
export async function getLocationsNoImages() {
  // Set up what we need in at the node level from a Location
  const nodeQuery = `{
    location
      _linkType
      _meta {
        id
        lastPublicationDate
        type
        uid
      }
  }`;

  // Call reducer so we can have 20+ records
  return resultsReducer(`allLocationss`, `location_ASC`, nodeQuery);
}

/**
 * getSingleLocationsPage()
 *
 * Prismic only does 20 entries per call, so if you have more, you have to get creative
 * resultsReducer() allows us to get more than 20 results and combines all results into one array
 *
 */
export async function getSingleLocationsPage(uid, previewData) {
  const data = await fetchAPI(
    `
    query LocationByUID($uid: String!, $lang: String!) {
      locations(uid: $uid, lang: $lang) {
        header_image
        location
        intro
        _meta {
          id
          lastPublicationDate
          type
          uid
        }
        body {
          ... on LocationsBodyAction_item {
            type
            fields {
              ${actionitemSliceFields}
            }
          }
          ... on LocationsBodyRidespot_promo {
            ${ridespotSliceFields}
          }
        }
      }
    }
  `,
    {
      previewData,
      variables: {
        uid,
        lang: API_LOCALE,
      },
    },
  );

  // Due to limitations with the GraphQL endpoint (can't query tags in groups)
  // We need to do a second call to get linked news, topics and grants per location
  // Build array for single location data
  const locationResults = [data];

  await Prismic.getApi(REF_API_URL)
    .then(function (api) {
      return api.query(
        [
          Prismic.Predicates.at('document.type', 'news'),
          Prismic.Predicates.at('my.news.locations.location', data.locations._meta.id),
        ],
        { orderings: '[my.news.publication_date desc]' },
      );
    })
    .then(function (resNews) {
      locationResults.push(resNews.results);
    });

  return locationResults;
}
