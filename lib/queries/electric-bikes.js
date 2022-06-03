import { fetchAPI, API_LOCALE } from '../api';

import { resultsReducer } from '../resultsReducer';

/**
 * !!!!!!!!!!!!!!!!!
 * Test all queries to know what you are getting back
 * https://peopleforbikes.prismic.io/graphql
 */

// getStats() gets us every statistics page, exciting
export async function getEBikesPages() {
  const nodeQuery = `{
    main_content
    title
    _meta {
      lastPublicationDate
      id
      type
      uid
    }
  }`;

  // Call reducer so we can have 20+ records
  return resultsReducer(`allElectric_bikess`, `title_ASC`, nodeQuery);
}

export async function getSingleEBikesPage(uid, previewData) {
  const data = await fetchAPI(
    `
    query EBikesPageByUID($uid: String!, $lang: String!) {
      electric_bikes(uid: $uid, lang: $lang) {
        title
        main_content
        _meta {
          id
          lastPublicationDate
          type
          uid
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

  return data;
}

export async function getEBikeLaws() {
  const nodeQuery = `{
    location
    ebike_laws {
      _linkType
      __typename
      ... on _FileLink {
        url
        size
      }
    }
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
