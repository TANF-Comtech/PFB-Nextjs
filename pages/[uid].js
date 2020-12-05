import ErrorPage from 'next/error'
import { RichText } from 'prismic-reactjs'

import { getSingleLandingPage, 
         getLandingPages } from '../lib/queries/landing-page'
import { newsTopTwenty  } from '../lib/queries/news'
import { getLocations } from '../lib/queries/locations'
import { getTopics } from '../lib/queries/topics'
import { randomID } from '../lib/utils'

import Wrapper from '../components/global/wrapper'
import BigTitleBanner from '../components/content/big-title-banner'
import Heading1 from '../components/primitives/h1'
import SummaryBlock from '../components/content/summary-block'
import NewsList from '../components/content/news-list'
import LocationsList from '../components/content/locations-list'
import TopicsList from '../components/content/topics-list'
import ActionItemGroup from '../components/slices/action-item-group'
import Donate from '../components/global/donate'

export default function LandingPage({ page, preview }) {
  const { landing_page } = page
  console.log(landing_page.data)

  // Check to make sure there is actually a page at this UID path
  if (!landing_page) {
    return <ErrorPage statusCode={404} />
  }
  
  return (
    <>
      <Wrapper 
        postTitle={ RichText.asText(landing_page.title) }
        isWide={ true }
      >
        <BigTitleBanner>
          <RichText
            elements={{ heading1: Heading1 }}
            render={ landing_page.title }
          />
        </BigTitleBanner>

        { landing_page.summary &&
          <SummaryBlock>
            { landing_page.summary }
          </SummaryBlock>
        }

        { landing_page._meta.uid === 'news' &&  
          <NewsList 
            nodeName="node"  
            payload={ landing_page.data } 
          />
        }

        { landing_page._meta.uid === 'locations' &&  
          <LocationsList payload={ landing_page.data } />
        }

        { landing_page._meta.uid === 'topics' &&  
          <TopicsList payload={ landing_page.data } />
        }

        { landing_page._meta.uid === 'take-action' && landing_page.body
          ? ( landing_page.body.map( (slice) => {
            switch(slice.__typename) {
              case 'Landing_pageBodyAction_item' :
                return (
                  <ActionItemGroup
                    key={ randomID(10000000) }
                    payload={ slice.fields }
                  />
                )
            } 
          })) : (<></>)
        }

        <Donate />
        
      </Wrapper>
    </>
  )
}

/* The return here sends the `page` prop back to the BasicPage component above for rendering */
export async function getStaticProps({ params, preview = false, previewData }) {
  // Get landing page basic data
  let pageData = await getSingleLandingPage(params.uid, previewData)

  // Certain pages need extra custom queries, add them on
  if(params.uid === 'news') {
    pageData.landing_page.data = await newsTopTwenty(params.uid, previewData)
  } else if(params.uid === 'locations') {
    pageData.landing_page.data = await getLocations(params.uid, previewData)
  } else if(params.uid === 'topics') {
    pageData.landing_page.data = await getTopics(params.uid, previewData)
  } 

  return {
    props: {
      preview,
      page: pageData ?? null,
    },
    revalidate: 1,
  }
}

// getStaticPaths requires a the whole paths argument to be objects of URL it needs to statically render server-side
export async function getStaticPaths() {
  const allPages = await getLandingPages()

  return {
    paths: allPages?.map(({ node }) => `/${node._meta.uid}`) || [],
    fallback: true,
  }
}