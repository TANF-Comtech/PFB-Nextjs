import React from 'react';

import NewsList from '~/components/news-list';
import LocationsList from '~/components/locations-list';
import TopicsList from '~/components/topics-list';
import RidesList from '~/components/rides-list';
import TeamList from '~/components/team-list';
import BasicList from '~/components/basic-list';
import JoinList from '~/components/join-list';
import GrantsPillars from '~/components/grants-pillars';
import EventsList from '~/components/events-list';
import PolicyPillars from '~/components/policy-pillars';
import StatsList from '~/components/stats-list';
import WayfindingItem from '~/components/wayfinding-item';
import MainContent from '~/components/main-content';
import SecondaryCampaign from '~/components/secondary-campaign';

export default function ConditionalSections({ landing_page, fallback, preview }) {
  return (
    <>
      {
        // NEWS
        landing_page._meta.uid === 'news' && (
          <NewsList fallback={fallback} nodeName="node" payload={landing_page.data} />
        )
      }

      {
        // LOCATIONS
        landing_page._meta.uid === 'locations' && <LocationsList payload={landing_page.data} />
      }

      {
        // TOPICS
        landing_page._meta.uid === 'topics' && <TopicsList payload={landing_page.data} />
      }

      {
        // RIDES
        landing_page._meta.uid === 'rides' && <RidesList payload={landing_page.data} />
      }

      {
        // TEAM
        landing_page._meta.uid === 'team' && (
          <TeamList ceoPayload={landing_page.dataCEO} teamPayload={landing_page.dataTeam} />
        )
      }

      {
        // CAMPAIGNS
        landing_page._meta.uid === 'campaigns' && (
          <SecondaryCampaign payload={landing_page.data} isHomepage={true} />
        )
      }

      {
        // CAREERS
        landing_page._meta.uid === 'careers' && (
          <BasicList payload={landing_page.data} textColor="#3E9FDC" title="Career Opportunities" />
        )
      }

      {
        // JOIN
        landing_page._meta.uid === 'join' && <JoinList />
      }

      {
        // GRANTS
        // landing_page._meta.uid === "grants" && <GrantsPillars />
      }

      {
        // POLICY PILLARS
        landing_page._meta.uid === 'policy' && <PolicyPillars />
      }

      {
        // RESEARCH STATS
        landing_page._meta.uid === 'research' && <StatsList payload={landing_page.data} />
      }

      {
        // EVENTS
        landing_page._meta.uid === 'events' && (
          <>
            {landing_page.data[2].allEvents.edges && (
              <EventsList
                eventTitle="Virtual Events"
                payload={landing_page.data[2].allEvents.edges}
              />
            )}
            {landing_page.data[0].allEvents.edges && (
              <EventsList
                eventTitle="PeopleForBikes Events"
                payload={landing_page.data[0].allEvents.edges}
              />
            )}
            {landing_page.data[1].allEvents.edges && (
              <EventsList
                eventTitle="Sponsored Events"
                payload={landing_page.data[1].allEvents.edges}
              />
            )}
          </>
        )
      }
    </>
  );
}
