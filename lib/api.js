import Prismic from 'prismic-javascript'

const REPOSITORY = process.env.PRISMIC_REPOSITORY_NAME
const REF_API_URL = `https://${REPOSITORY}.prismic.io/api/v2`
const GRAPHQL_API_URL = `https://${REPOSITORY}.prismic.io/graphql`
export const API_TOKEN = process.env.PRISMIC_API_TOKEN
export const API_LOCALE = process.env.PRISMIC_REPOSITORY_LOCALE

export const PrismicClient = Prismic.client(REF_API_URL, {
  accessToken: API_TOKEN
})

async function fetchAPI(query, { previewData, variables } = {}) {
  const prismicAPI = await PrismicClient.getApi()
  const res = await fetch(
    `${GRAPHQL_API_URL}?query=${query}&variables=${JSON.stringify(variables)}`,
    {
      headers: {
        'Prismic-Ref': previewData?.ref || prismicAPI.masterRef.ref,
        'Content-Type': 'application/json',
        'Accept-Language': API_LOCALE,
        Authorization: `Token ${API_TOKEN}`
      }
    }
  )

  if (res.status !== 200) {
    console.log(await res.text())
    throw new Error('Failed to fetch API')
  }

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
}

// Return a list of all basic pages
// This data gets fed into page/[uid].js so the dynamic routing can work
// We have to tell Next.js what routes to statically generate
export async function getAllBasicPagesWithUID() {
  const data = await fetchAPI(`
    {
      allBasic_pages {
        edges {
          node {
            _meta {
              uid
            }
          }      
        }
      }
    }
  `)
  return data?.allBasic_pages?.edges
}

export async function getSingleBasicPage(uid, previewData) {
  const data = await fetchAPI(`
    query PageByUID($uid: String!, $lang: String!) {
      basic_page(uid: $uid, lang: $lang) {
        _meta {
          uid
          id
        }
        title
        main_content
        parent_page {
          _linkType
        }
        recent_grants
        call_to_action
        body {
          ... on Basic_pageBodyAccordion_list {
            fields {
              accordion_heading
              accordion_content
            }
          }
          ... on Basic_pageBodyMain_image {
            label 
            type
            primary {
              main_image
            }
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
    }
  )
  return data
}

// export async function getData(slug) {
//   const data = await fetchAPI(
//     `
//     query Page($slug: String!, $lang: String!) {
//       allPages(sortBy: title_DESC) {
//         edges {
//           node {
//             _meta {
//               uid
//             }
//             title
//             body
//           }
//         }
//       }
//       page(uid: $slug, lang: $lang) {
//         title
//         body
//       }
//     }
//   `,
//     {
//       variables: {
//         slug,
//         lang: API_LOCALE
//       }
//     }
//   )
//   return {
//     allPages: (data?.allPages?.edges || []).map((edge) => ({
//       slug: edge.node._meta.uid,
//       title: edge.node.title
//     })),
//     page: data.page
//   }
// }