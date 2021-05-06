import { fetchAPI, API_LOCALE } from '../api'


export async function getNewHomepage(previewData) {
  const data = await fetchAPI(`
  query TheHomepage($uid: String!, $lang: String!) {
    new_homepage( uid: $uid, lang: $lang ){
    title
    body{
      __typename
      ... on New_homepageBodyHero {
        type
        label
        fields {
          hero_image
          hero_text
          hero_link {
            ... on Landing_page {
              _meta{
                id
                uid
                type
              }
              _linkType
            }
          }
        }
      }
    }
      _meta{
        id
        uid
        
      }
      _linkType
    }
  }
  `,
    {
      previewData,
      variables: {
        uid: 'new_homepage',
        lang: API_LOCALE,
      },
    }
  )

  return data
}

