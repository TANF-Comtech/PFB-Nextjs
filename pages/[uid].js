import { useRouter } from 'next/router'
import { RichText } from 'prismic-reactjs'
import CustomErrorPage from '../components/global/404'

import { getSingleLandingPage, 
         getLandingPages } from '../lib/queries/landing-page'
import { getAllNewsForLandingPage } from '../lib/queries/news'
import { getLocations } from '../lib/queries/locations'
import { getTopics } from '../lib/queries/topics'
import { getRides } from '../lib/queries/rides'
import { getTeamMembers, getCEO } from '../lib/queries/team'
import { getAllCareers } from '../lib/queries/careers'
import { getEventsByCategory } from '../lib/queries/events'
import { linkResolver, randomID } from '../lib/utils'
import { getStats } from '../lib/queries/statistics'

import Wrapper from '../components/global/wrapper'
import Spinner from '../components/global/spinner'
import BigTitleBanner from '../components/content/big-title-banner'
import SecondaryTitleBanner from '../components/content/secondary-title-banner'
import Heading1 from '../components/primitives/h1'
import HeaderImage from '../components/global/header-image'
import SummaryBlock from '../components/content/summary-block'
import Button from '../components/primitives/button'

import NewsList from '../components/content/news-list'
import LocationsList from '../components/content/locations-list'
import TopicsList from '../components/content/topics-list'
import RidesList from '../components/content/rides-list'
import TeamList from '../components/content/team-list'
import List from '../components/content/list'
import JoinList from '../components/content/join-list'
import TakeActionList from '../components/content/takeaction-list'
import GrantsPillars from '../components/content/grants-pillars'
import GrantsIconGrid from '../components/content/grants-icon-grid'
import EventsList from '../components/content/events-list'
import PolicyPillars from '../components/content/policy-pillars'
import MemberPillars from '../components/content/member-pillars'
import NumberedPillars from '../components/content/numbered-pillars'
import GrantsList from '../components/content/grant-guidelines-list'
import ReportsList from '../components/content/reports-list'
import StatsList from '../components/content/stats-list'
import ResearchBanners from '../components/content/research-banners'
import ResearchPillars from '../components/content/reesearch-pillars'
import ToolkitPillars from '../components/content/toolkit-pillars'

import ActionItemGroup from '../components/slices/action-item-group'
import RedActionItem from '../components/slices/action-item-red'
import MissionPillars from '../components/content/mission-pillars'
import Promo from '../components/slices/promo'
import ColorBanner from '../components/global/color-banner'
import MainContent from '../components/global/main-content'

import { AlgoliaIndex } from '../lib/algolia/algoliaClient'
import { newsFormatter } from '../lib/algolia/newsFormatter'
import { topicFormatter } from '../lib/algolia/topicFormatter'
import { statsFormatter } from '../lib/algolia/statsFormatter'

/**
 * TheMonster()
 * 
 * You know, there comes a time in every man's life
 * When he looks in the mirror
 * And realizes that something has grown out of his control
 * And it was in this moment that I renamed this page TheMonster
 * 
 * It was born of a great idea - simply the UX for admins
 * They can have one spot for all their landing pages
 * But then, no two landing pages looked alike
 * And Prismic's Slice system turned out to be half baked
 * 
 * So here we find ourselves, with all these imports
 * And all this conditional logic
 * It's a wonder this page runs
 * Where it goes from here is only in the realm of dream or nightmare
 * 
 */
export default function TheMonster({ page, preview }) {
  const router = useRouter()

  // If page hasn't arrived yet, show loader
  if(router.isFallback) {
    return <Spinner />
  }

  // If page never shows, throw 404
  if (!page) {
    return (<>
      <CustomErrorPage />
    </>)
  } 

  // Then we destructure the main payload once page has arrived
  const { landing_page } = page

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

      { // MEMBER CENTER PILLAR - Up Front
        landing_page._meta.uid === 'members' && 
        <MainContent
          contentPadding="4vh 4vw 0 4vw"
        >
          
          <RedActionItem 
            path="/members/business-intelligence-hub"
            title="Business Intelligence Hub"
            text="Explore our dashboard for insights into the bicycle industry."
          />
        </MainContent>
      }   

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

      { // GRANTS
        landing_page._meta.uid === 'grants' && 
        <GrantsPillars />
      }     
      
      { // POLICY PILLARS
        landing_page._meta.uid === 'policy' && 
        <PolicyPillars />
      }    

      { // RESEARCH STATS
        landing_page._meta.uid === 'research' && 
        <StatsList payload={ landing_page.data } />
      }            

      { // EVENTS
        landing_page._meta.uid === 'events' && 
        <>
          { landing_page.data[2].allEvents.edges && <EventsList
            eventTitle="Virtual Events"
            payload={ landing_page.data[2].allEvents.edges }
          /> }
          { landing_page.data[0].allEvents.edges && <EventsList 
            eventTitle="PeopleForBikes Events"
            payload={ landing_page.data[0].allEvents.edges }
          /> }
          { landing_page.data[1].allEvents.edges && <EventsList
            eventTitle="Sponsored Events"
            payload={ landing_page.data[1].allEvents.edges }
          /> }
        </>
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
          
          // ACCORDION SLICE
          if (slice.__typename === 'Landing_pageBodyAccordion_list') {
            return (
              <GrantsList
                payload={ slice.fields }
              />
            )
          }  
          

          // MISSION SLICE
          if (slice.__typename === 'Landing_pageBodyMission_content' &&
            landing_page._meta.uid === 'mission') {
            return (
              <>
                <NumberedPillars 
                  payload={ slice.fields } 
                  title={ slice.primary.pillar_title }
                />
                <MissionPillars />
              </>
            )
          }

          // ORIENTATION
          if (slice.__typename === 'Landing_pageBodyMission_content' &&
            landing_page._meta.uid === 'board-orientation') {
            return (
              <>
                <NumberedPillars 
                  payload={ slice.fields } 
                  title={ slice.primary.pillar_title }
                />
                <ToolkitPillars />
              </>
            )
          }          

          // MISSION SLICE FOR LOCAL INNOVATION
          if (slice.__typename === 'Landing_pageBodyMission_content' &&
            landing_page._meta.uid === 'local-innovation') {
            return (
              <>
                <NumberedPillars 
                  numbersWanted="false"
                  payload={ slice.fields } 
                  title={ slice.primary.pillar_title }
                />
              </>
            )
          }    
          
          // RESEARCH CAMPAIGN BANNERS
          if (slice.__typename === 'Landing_pageBodyResearch') {
            return(
              <ResearchBanners 
                payload={ slice.fields } 
              />
            )
          }

          // RESEARCH REPORTS
          if (slice.__typename === 'Landing_pageBodyResearch__reports') {
            return(
              <>
                <ReportsList 
                  payload={ slice.fields }
                />
                <Button
                  buttonAlign="center"
                  buttonBg="#D0021B"
                  buttonBorder="none"
                  buttonColor="white"
                  buttonFontSize="24px"
                  buttonMargin="0 0 50px 0"
                  buttonPadding="10px 30px"
                  buttonTextTransform="uppercase"
                  href="/reports"
                >
                  See Full Report Library
                </Button>  
                <ResearchPillars />
              </>         
            )
          }          

          // PROMO
          // logic to catch policy and grant finder custom promos (with internal links)
          if( slice.__typename === "Landing_pageBodyPromo" ) {
            return ( 
              <Promo 
                bigWords={ slice.primary.bottom_text }
                path={ landing_page._meta.uid === 'policy' && '/policy/finder' || 
                       landing_page._meta.uid === 'grants' && '/grants/finder' ||
                       landing_page._meta.uid === 'grant-application' && '/grants/finder' ||
                       landing_page._meta.uid === 'grant-guidelines' && '/grants/finder' ||
                       landing_page._meta.uid === 'grant-funding' && '/grants/finder' || 
                       slice.primary.link }
                smallWords={ slice.primary.top_text }
                source={ slice.primary.main_image.url }
              /> 
            )
          } 
        })) : (<></>)
      }
      
      { // MEMBER CENTER PILLARS
        landing_page._meta.uid === 'members' && 
        <MemberPillars />
      }    

      { // LOCAL INNOVATION RESEARCH PILLARS
        landing_page._meta.uid === 'local-innovation' &&
        <ResearchPillars />
      }

      { // TAKE ACTION BLOCKS
        landing_page._meta.uid === 'take-action' && 
        <TakeActionList />
      }

      { // GRANTS LOGO GRID
        landing_page._meta.uid === 'grants' && 
        <GrantsIconGrid />
      }  

      { // COLOR BANNER - not on member page
        landing_page._meta.uid !== 'members' && 
        <ColorBanner />
      }  
      
    </Wrapper>
  )
}

/**
 * The Monster - server side processing
 * 
 * Next wants to render from the server side via getServerSideProps or getStaticProps
 * This function serves that purpose for the entire Monster page
 * Because this page is crazy, there is a lot of logic to send in as props
 * Read about this here: https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 * 
 * We're essentially making our queries to Prismic here (see /lib/queries)
 * Then we send the data into the page via the `pageData` variable to the `page` prop
 * Every landing page gets at least that much data
 * 
 * Some pages have an additional payload that gets a second query
 * We figure this out by looking at the `uid` key of the `pageData.landing_page` payload
 * If there is a second payload, we add it to the `data` key of `pageData.landing_page`
 * We then return those two payloads together, and send it back to the `TheMonster` page above
 * 
 * For certain routes, we're also formatting and sending the query payload to Algolia for indexing
 * More here: https://www.algolia.com/doc/api-client/methods/indexing/
 * 
 * @param { obj } params - Nextjs rout params for dynamic routes
 * @param { boolean } preview - boolean that tells us if we're looking at a preview page or the real thing
 * @param { obj } previewData - data payload for the preview page (not used, yet)
 * 
 * @returns 
 */
/* The return here sends the `page` prop back to the BasicPage component above for rendering */
export async function getStaticProps({ params, preview = false, previewData }) {
  
  // ALL LANDING PAGES
  let pageData = await getSingleLandingPage(params.uid, previewData)

  // PAGE-SPECIFIC PAYLOADS
  if(params.uid === 'news') {
    pageData.landing_page.data = await getAllNewsForLandingPage(params.uid, previewData)
    const algoliaFormattedData = newsFormatter(pageData.landing_page.data)
    await AlgoliaIndex.saveObjects(algoliaFormattedData)
  } 
  
  else if(params.uid === 'locations') {

    pageData.landing_page.data = await getLocations(params.uid, previewData)

  } 
  
  else if(params.uid === 'topics') {
    pageData.landing_page.data = await getTopics(params.uid, previewData)
    const algoliaFormattedData = topicFormatter(pageData.landing_page.data)
    await AlgoliaIndex.saveObjects(algoliaFormattedData)
  } 
  
  else if(params.uid === 'rides') {

    pageData.landing_page.data = await getRides(params.uid, previewData)

  } 
  
  else if(params.uid === 'team') {

    pageData.landing_page.dataTeam = await getTeamMembers(params.uid, previewData)
    pageData.landing_page.dataCEO = await getCEO(params.uid, previewData)

  } 
  
  else if(params.uid === 'careers') {

    pageData.landing_page.data = await getAllCareers(params.uid, previewData)

  } 
  
  else if(params.uid === 'events') {
    pageData.landing_page.data = await getEventsByCategory(params.uid, previewData)
  }

  else if(params.uid === 'research') {
    pageData.landing_page.data = await getStats()
    const algoliaFormattedData = statsFormatter(pageData.landing_page.data)
    await AlgoliaIndex.saveObjects(algoliaFormattedData)
  }  

  // Return the data payload and preview boolean to the page
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
    fallback: false,
  }
}