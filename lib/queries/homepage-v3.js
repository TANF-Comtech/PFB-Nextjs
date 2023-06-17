import { getPrismicData, API_LOCALE } from '~/lib/api';

export async function getHomepageV3(previewData) {
  const data = await getPrismicData(
  `
  query TheHomepageV3($uid: String!, $lang: String!) {
    homepage_v3( uid: $uid, lang: $lang ){
      hero {
        hero_title
        hero_dek
        hero_link {
          __typename   
          ... on _ExternalLink {
            url
            target
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
      infrastructure_pillar {
        infrastructure_title
        infrastructure_dek
        infrastructure_image
        infrastructure_link {
          __typename   
          ... on _ExternalLink {
            url
            target
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
          ... on Topic {
            _meta {
              id
              uid
              type
            }          
          }
        }
      }
      infrastructure_news {
        infrastructure_news_item {
          __typename 
          ... on News {
            _meta {
              id
              uid
              type
            }
            title
            publication_date
          }
        }
      }
      policy_pillar {
        policy_title
        policy_dek
        policy_image 
        policy_link {
          __typename   
          ... on _ExternalLink {
            url
            target
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
          ... on Topic {
            _meta {
              id
              uid
              type
            }          
          }
        }        
      }
      policy_news {
        policy_news_item {
          __typename 
          ... on News {
            _meta {
              id
              uid
              type
            }
            title
            publication_date
          }        
        }
      }
      participation_pillar {
        participation_title
        participation_dek
        participation_image 
        participation_link {
          __typename   
          ... on _ExternalLink {
            url
            target
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
          ... on Topic {
            _meta {
              id
              uid
              type
            }          
          }
        }        
      }  
      participation_news {
        participation_news_item {
          __typename 
          ... on News {
            _meta {
              id
              uid
              type
            }
            title
            publication_date
          }           
        }
      }    
      
      news {
        news_item {
          __typename 
          ... on News {
            _meta {
              id
              uid
              type
            }
            header_image
            publication_date
            title
          }
        }
      }
    }
  }   
  `,
    {
      previewData,
      variables: {
        uid: 'homepage-v3',
        lang: API_LOCALE,
      },
    },
  );

  return data;
}
