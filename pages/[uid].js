import ErrorPage from 'next/error'
import { RichText } from 'prismic-reactjs'

import { getSingleLandingPage, 
         getLandingPages } from '../lib/queries/landing-page'
import { newsTopTwenty  } from '../lib/queries/news'
import { getLocations } from '../lib/queries/locations'
import { getTopics } from '../lib/queries/topics'
import { getRides } from '../lib/queries/rides'
import { randomID } from '../lib/utils'

import Wrapper from '../components/global/wrapper'
import BigTitleBanner from '../components/content/big-title-banner'
import SecondaryTitleBanner from '../components/content/secondary-title-banner'
import Heading1 from '../components/primitives/h1'
import HeaderImage from '../components/global/header-image'
import SummaryBlock from '../components/content/summary-block'

import NewsList from '../components/content/news-list'
import LocationsList from '../components/content/locations-list'
import TopicsList from '../components/content/topics-list'
import RidesList from '../components/content/rides-list'
import ActionItemGroup from '../components/slices/action-item-group'
import MissionPillars from '../components/content/mission-pillars'
import Donate from '../components/global/donate'

export default function LandingPage({ page, preview }) {
  
  // If we're missing the page payload, throw error page
  // Otherwise, destructure landing_page from it
  if (!page) {
    return <ErrorPage statusCode={404} />
  } 
  const { landing_page } = page
  // console.log(landing_page)

  return (
    <>
      <Wrapper 
        postTitle={ RichText.asText(landing_page.title) }
        isWide={ true }
      >
        { // If header_image, load special header
          landing_page.header_image ? (
          <>
            <SecondaryTitleBanner
              secondaryText={ landing_page.secondary_text }
              mainText={ landing_page.main_text }
            />
            <HeaderImage 
              srcSet={ landing_page.header_image }
            />
            { landing_page.summary &&
              <SummaryBlock
                bgColor="#002C40"
                textColor="#fff"
              >
                <p>{ landing_page.summary }</p>
              </SummaryBlock>
            }            
          </>
        ) : (
          <>
            <BigTitleBanner>
              <RichText
                elements={{ heading1: Heading1 }}
                render={ landing_page.title }
              />
            </BigTitleBanner>
            { landing_page.summary &&
              <SummaryBlock>
                <p>{ landing_page.summary }</p>
              </SummaryBlock>
            }
          </>
        )}

        { // NEWS
          landing_page._meta.uid === 'news' &&  
          <NewsList 
            nodeName="node"  
            payload={ landing_page.data } 
          />
        }

        { // LOCATIONS
          landing_page._meta.uid === 'locations' &&  
          <LocationsList payload={ landing_page.data } />
        }

        { // TOPICS
          landing_page._meta.uid === 'topics' &&  
          <TopicsList payload={ landing_page.data } />
        }

        { // RIDES
          landing_page._meta.uid === 'rides' && 
          <RidesList payload={ landing_page.data } />
        }        

        { // SLICE CONTENT (in body)
          landing_page.body ? 
          ( landing_page.body.map( (slice) => {

            // TAKE ACTION SLICE
            if (slice.__typename === 'Landing_pageBodyAction_item' &&
              landing_page._meta.uid === 'take-action') {
              return (
                <ActionItemGroup
                  key={ randomID(10000000) }
                  payload={ slice.fields }
                />
              )
            } 

            // MISSION SLICES
            if (slice.__typename === 'Landing_pageBodyContent_block' &&
              landing_page._meta.uid === 'mission') {
                console.log(slice)
              return (
                <SummaryBlock>
                  <RichText render={slice.primary.main_content} />
                </SummaryBlock>
              )
            }
            if (slice.__typename === 'Landing_pageBodyMission_content' &&
              landing_page._meta.uid === 'mission') {
              return (
                <MissionPillars payload={ slice.fields } />
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
  } else if(params.uid === 'rides') {
    pageData.landing_page.data = await getRides(params.uid, previewData)
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