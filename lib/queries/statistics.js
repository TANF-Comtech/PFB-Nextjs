import { getPrismicData, API_LOCALE } from '~/lib/api';
import { resultsReducer } from '~/lib/resultsReducer';

/**
 * !!!!!!!!!!!!!!!!!
 * Test all queries to know what you are getting back
 * https://peopleforbikes.prismic.io/graphql
 */

// getStats() gets us every statistics page, exciting
export async function getStats() {
  const nodeQuery = `{
    title
    main_content
    _meta {
      id
      uid
      type
      lastPublicationDate
    }
  }`;

  // Call reducer so we can have 20+ records
  return resultsReducer(`allStatistic_pages`, `title_ASC`, nodeQuery);
}

export async function getSingleStatsPage(uid, previewData) {
  const data = await getPrismicData(
    `
    query StatsByUID($uid: String!, $lang: String!) {
      statistic_page(uid: $uid, lang: $lang) {
        title
        main_content
        _meta {
          id
          uid
          type
          lastPublicationDate
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
