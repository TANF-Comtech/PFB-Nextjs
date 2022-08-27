import { getPrismicData, API_LOCALE } from '~/lib/api';

/**
 * !!!!!!!!!!!!!!!!!
 * Test all queries to know what you are getting back
 * https://peopleforbikes.prismic.io/graphql
 *
 * allCareers()
 *
 * Gets us the latest careers, will limit to twenty at a time
 *
 */

export async function getAllCareers() {
  const data = await getPrismicData(`
    {
      allJobs(sortBy: title_ASC) {
        edges {
          node {
            title
            _meta {
              id
              uid
              type
            }
          }
        }
      }
    }
  `);

  return data.allJobs.edges;
}

/**
 * getSingleCareer()
 *
 * Gives us a single career entry back, depends on what you pass in as variables
 */
export async function getSingleCareer(uid, previewData) {
  const data = await getPrismicData(
    `
    query CareerByUID($uid: String!, $lang: String!) {
      job(uid: $uid, lang: $lang) {
        title
        posting
        _meta {
          id
          uid
          type
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
