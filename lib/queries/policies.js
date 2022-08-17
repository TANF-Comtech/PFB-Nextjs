import { fetchAPI, API_LOCALE } from '~/lib/api';
import { resultsReducer } from '~/lib/resultsReducer';
import { linkFields } from '~/lib/queries/fragments';

/**
 * !!!!!!!!!!!!!!!!!
 * Test all queries to know what you are getting back
 * https://peopleforbikes.prismic.io/graphql
 *
 */

// getPolicies is getting all of the policies for us, dumping onto one page
export async function getPolicies() {
  const nodeQuery = `{
    title
    main_content
    year
    government_level
    location {
      __typename
      ... on Locations {
        location
        _meta {
          id
          uid
          type
        }
      }
    }
    city
    _meta {
      uid
      id
      type
    }
  }`;

  // Call reducer so we can have 20+ records
  return resultsReducer(`allPolicys`, `year_DESC`, nodeQuery);
}

export async function getSinglePolicyPage(uid, previewData) {
  const data = await fetchAPI(
    `
    query PolicyByUID($uid: String!, $lang: String!) {
      policy(uid: $uid, lang: $lang) {
        title
        main_content
        bill_link {
          ${linkFields}
        }
        year
        government_level
        location {
          __typename
          ... on Locations {
            location
            _meta {
              id
              uid
              type
            }
          }
        }
        city
        status
        supporting_document {
          ${linkFields}
        }
        _meta {
          uid
          id
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
