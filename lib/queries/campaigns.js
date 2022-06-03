import { fetchAPI, API_LOCALE } from '../api';
import { linkFields } from './fragments';

export async function getAllCampaigns() {
  const data = await fetchAPI(`
  {
    allCampaigns{
      edges{
        node{
          title
          small_text
          big_text
          description
          banner_image
          link{
            ${linkFields}
          }
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
  
  `);

  return data.allCampaigns.edges;
}

export async function getSingleCampaignPage(uid, previewData) {
  const data = await fetchAPI(
    `query CampaignByUID($uid: String!, $lang: String!) {
    campaign(uid: $uid, lang: $lang) {
      title
      small_text
      big_text
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
