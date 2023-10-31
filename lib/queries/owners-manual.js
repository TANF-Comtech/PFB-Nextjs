import { getPrismicData, API_LOCALE } from '~/lib/api';

export async function getOwnersManual(previewData) {
  const data = await getPrismicData(
  `
  query OwnersManual($uid: String!, $lang: String!) {
    owners_manual( uid: $uid, lang: $lang ){
      title
      hero 
      main_text
      price_section_title
      price_section_member_title
      price_section_nonmember_title
      price_section_become_a_member_title
      owners_manual_benefits {
        pillar_title
        pillar_content
      }
      disclaimer
      _meta {
        uid
        id
      }
    }
  }        
  `,
    {
      previewData,
      variables: {
        uid: 'owners-manual',
        lang: API_LOCALE,
      },
    },
  );

  return data;
}
 