import React from 'react'
import NewsList from '../../components/content/news-list'
import LocationsList from '../../components/content/locations-list'
import TopicsList from '../../components/content/topics-list'
import RidesList from '../../components/content/rides-list'
import TeamList from '../../components/content/team-list'
import List from '../../components/content/list'
import JoinList from '../../components/content/join-list'
import GrantsPillars from '../../components/content/grants-pillars'
import EventsList from '../../components/content/events-list'
import PolicyPillars from '../../components/content/policy-pillars'  
import StatsList from '../../components/content/stats-list'
import RedActionItem from '../../components/slices/action-item-red'
import MainContent from '../../components/global/main-content'

export default function ConditionalSections ({landing_page}){

  return(
    <>
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
        <StatsList />
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
    </>
  )
}