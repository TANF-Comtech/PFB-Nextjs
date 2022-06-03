import { fetchAPI } from '../lib/api';

/**
 * resultsReducer()
 *
 * In Prismic, their GraphQL endpoint will only return 20 results at a time
 * Many pages need more than 20 results, which requires multiple queries
 * This reducer combines all those results into one response
 *
 * @param {string} dataType - whatever the set of records is called (ie, `allTopics`)
 * @param {string} sortParam - tells us how to order the records (ie, `location_ASC`)
 * @param {string} nodeFields - which fields you need from the endpoint (ie, `{ key: value }`)
 */

export async function resultsReducer(dataType, sortParam, nodeFields) {
  let fetch = await fetchAPI(`
    query {
      ${dataType} (sortBy: ${sortParam}) {
        pageInfo {
          hasNextPage
          startCursor
          endCursor
        }
        edges {
          node 
            ${nodeFields}
          cursor
        }
        totalCount
      }
    }
  `);

  // Put all results from fetch into allResults array
  const allResults = fetch[dataType].edges;

  // If we have less than 20 records just
  if (fetch[dataType].totalCount <= 20) {
    return allResults;
  }

  /// More than 20 records...
  else {
    let lastCursor = null; // setup a variable for lastCursor

    // construct a new query to get results, but only if last query says we need more
    while (fetch[dataType].pageInfo.hasNextPage === true) {
      // last cursor comes from last call's endCursor
      lastCursor = fetch[dataType].pageInfo.endCursor;

      fetch = await fetchAPI(
        `
        query MoreResults($cursor: String!){
          ${dataType} (sortBy: ${sortParam}, after: $cursor) {
            pageInfo {
              hasNextPage
              startCursor
              endCursor
            }
            edges {
              node 
                ${nodeFields}
              cursor
            }
            totalCount
          }
        }
        `,
        {
          variables: {
            cursor: lastCursor,
          },
        },
      );

      // Push next block of 20 records into allLocations
      fetch[dataType].edges.map((item) => {
        allResults.push(item);
      });
    }

    return allResults;
  }
}
