import { getPrismicData, API_LOCALE } from '~/lib/api';
import { campaignItemFields, newsItemFields, ridespotSliceFields } from '~/lib/queries/fragments';

export async function getNewHomepage(previewData) {
  const data = await getPrismicData(
    `
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
            __typename   
            ... on _Document {
              _meta {
                id
                uid
                type
              }
            }
            ... on _ExternalLink {
              url
              target
            }
            ... on _FileLink {
              name
              url
            }
            ... on Landing_page {
              _meta {
                id
                uid
                type
              }
            }
            ... on Campaign {
              _meta {
                id
                uid
                type
              }
            }
          }
        }
      }
      ... on New_homepageBodyRidespot_promo {
        type
        ${ridespotSliceFields}
      }
    }
    campaigns{
      campaign{
        __typename
        ... on Campaign{
          ${campaignItemFields}
        }
      }
    }
    secondary_campaigns{
      secondary_campaign{
        __typename
        ... on Campaign{
          ${campaignItemFields}
        }
      }
    }
    news{
      news_item{
        __typename
        ... on News{
          ${newsItemFields}
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
    },
  );

  return data;
}
