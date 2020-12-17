import Prismic from 'prismic-javascript'

import { fetchAPI, API_LOCALE, REF_API_URL } from '../api'
import { resultsReducer } from '../resultsReducer'

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
    bill_link {
      __typename
      ... on _ExternalLink {
        url
        target
      }
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
      __typename
      ... on _FileLink {
        name
        url
      }
    }
    _meta {
      uid
      id
      type
    }
  }`

  // Call reducer so we can have 20+ records
  return resultsReducer(`allPolicys`, `year_DESC`, nodeQuery);  
}

// export async function getSingleTopicPage(uid, previewData) {
//   const data = await fetchAPI(`
//     query TopicByUID($uid: String!, $lang: String!) {
//       topic(uid: $uid, lang: $lang) {
//         _meta {
//           uid
//           id
//           type
//         }
//         title
//         banner_image
//         intro
//         body {
//           __typename
//           ... on TopicBodyPolicy_pillar {
//             primary {
//               long_name
//             }
//             fields {
//               sub_pillar
//               sub_pillar_summary
//               news_item_1 {
//                 __typename
//                 ... on News {
//                   title
//                   header_image
//                   _meta {
//                     id
//                     uid
//                     type
//                   }
//                 }
//               }
//               news_item_2 {
//                 __typename
//                 ... on News {
//                   title
//                   header_image
//                   _meta {
//                     id
//                     uid
//                     type
//                   }
//                 }
//               }
//               news_item_3 {
//                 __typename
//                 ... on News {
//                   title
//                   header_image
//                   _meta {
//                     id
//                     uid
//                     type
//                   }
//                 }
//               }          
//             }
//           }
//         }
//       }
//     }
//   `,
//     {
//       previewData,
//       variables: {
//         uid,
//         lang: API_LOCALE,
//       },
//     }
//   )

//   // Due to limitations with the GraphQL endpoint (can't query tags in groups)
//   // We need to do a second call to get linked news, policies and grants per topic
//   // Build array for single topic data
//   const topicsResults = [ data ]

//   await Prismic.getApi(REF_API_URL).then(
//     function(api) {  
//       return api.query(
//         [
//           Prismic.Predicates.at('document.type', 'news'),
//           Prismic.Predicates.at('my.news.topics.topic', data.topic._meta.id),
//         ],
//         { 
//           orderings : '[my.news.publication_date desc]',
//           pageSize : 6,  
//         }
//       );
//     }).then(
//     function(resNews) {
//       topicsResults.push(resNews.results)
//     }
//   );


//   return topicsResults
// }



