import { useRouter } from 'next/router'
import { RichText } from 'prismic-reactjs'
import DefaultErrorPage from 'next/error'

import { getSingleLandingPage, 
         getLandingPages } from '../lib/queries/landing-page'
import { newsTopTwenty  } from '../lib/queries/news'
import { getLocations } from '../lib/queries/locations'
import { getTopics } from '../lib/queries/topics'
import { getRides } from '../lib/queries/rides'
import { getTeamMembers, getCEO } from '../lib/queries/team'
import { getAllCareers } from '../lib/queries/careers'
import { linkResolver, randomID } from '../lib/utils'

import Wrapper from '../components/global/wrapper'
import Spinner from '../components/global/spinner'
import BigTitleBanner from '../components/content/big-title-banner'
import SecondaryTitleBanner from '../components/content/secondary-title-banner'
import Heading1 from '../components/primitives/h1'
import HeaderImage from '../components/global/header-image'
import SummaryBlock from '../components/content/summary-block'

import NewsList from '../components/content/news-list'
import LocationsList from '../components/content/locations-list'
import TopicsList from '../components/content/topics-list'
import RidesList from '../components/content/rides-list'
import TeamList from '../components/content/team-list'
import List from '../components/content/list'
import JoinList from '../components/content/join-list'
import TakeActionList from '../components/content/takeaction-list'

import ActionItemGroup from '../components/slices/action-item-group'
import MissionPillars from '../components/content/mission-pillars'
import Promo from '../components/slices/promo'
import ColorBanner from '../components/global/color-banner'

export default function LandingPage({ page, preview }) {
  const router = useRouter()

  if(router.isFallback) {
    return <Spinner />
  }

  // If page hasn't arrived yet, show loader
  if (!page) {
    return (<>
      <DefaultErrorPage statusCode={ 404 } />
    </>)
  } 

  // Then we destructure the main payload once page has arrived
  const { landing_page } = page
  
  console.log(page)

  return (
    <Wrapper 
      postTitle={ RichText.asText(landing_page.title) }
      isWide={ true }
    >
    
      { // HEADER - STYLE COMPLEX: (SecondaryTitleBanner + HeaderImage + SummaryBlock)
        landing_page.header_image || 
        landing_page._meta.uid === 'team' ? (
        <>
          <SecondaryTitleBanner
            secondaryText={ landing_page.secondary_text }
            mainText={ landing_page.main_text }
          />
          { landing_page.header_image &&
            <HeaderImage 
              srcSet={ landing_page.header_image }
            />
          }
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
        // HEADER - STYLE SIMPLE: (BigTitleBanner + SummaryBlock)
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

      { // TEAM
        landing_page._meta.uid === 'team' && 
        <TeamList 
          ceoPayload={ landing_page.dataCEO } 
          teamPayload={ landing_page.dataTeam } 
        />
      }

      { // CAREERS
        landing_page._meta.uid === 'careers' && 
        <List
          payload={ landing_page.data }
          textColor="#3E9FDC"
          title="Career Opportunities"
        />
      }

      { // JOIN
        landing_page._meta.uid === 'join' && 
        <JoinList />
      }

      { // SLICE CONTENT (in body)
        landing_page.body ? 
        ( landing_page.body.map( (slice) => {

          // CONTENT BLOCK
          if (slice.__typename === 'Landing_pageBodyContent_block') {
            return (
              <SummaryBlock key={ randomID(10000000) }>
                <RichText 
                  render={slice.primary.main_content} 
                  linkResolver={ linkResolver }
                />
              </SummaryBlock>
            )
          }    

          // ACTION ITEM SLICE
          if (slice.__typename === 'Landing_pageBodyAction_item') {
            return (
              <ActionItemGroup
                key={ randomID(10000000) }
                payload={ slice.fields }
              />
            )
          }       

          // MISSION SLICE
          if (slice.__typename === 'Landing_pageBodyMission_content' &&
            landing_page._meta.uid === 'mission') {
            return (
              <MissionPillars payload={ slice.fields } />
            )
          }

          // PROMO
          if( slice.__typename === "Landing_pageBodyPromo" ) {
            return ( 
              <Promo 
                bigWords={ slice.primary.bottom_text }
                path={ slice.primary.link }
                smallWords={ slice.primary.top_text }
                source={ slice.primary.main_image.url }
              /> 
            )
          } 
        })) : (<></>)
      }

      { // TAKE ACTION BLOCKS
        landing_page._meta.uid === 'take-action' && 
        <TakeActionList />
      }

      <ColorBanner />
      
    </Wrapper>
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
  } else if(params.uid === 'team') {
    pageData.landing_page.dataTeam = await getTeamMembers(params.uid, previewData)
    pageData.landing_page.dataCEO = await getCEO(params.uid, previewData)
  } else if(params.uid === 'careers') {
    pageData.landing_page.data = await getAllCareers(params.uid, previewData)
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