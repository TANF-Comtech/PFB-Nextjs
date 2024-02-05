import React from 'react';

import NewsList from '~/components/news-list';
import SecondaryCampaign from '~/components/secondary-campaign';
import BasicList from '~/components/uid/parts/basic-list';
import EventsList from '~/components/uid/parts/events-list';
import GrantsPillars from '~/components/uid/parts/grants-pillars';
import JoinList from '~/components/uid/parts/join-list';
import LocationsList from '~/components/uid/parts/locations-list';
import PolicyPillars from '~/components/uid/parts/policy-pillars';
import StatsList from '~/components/uid/parts/stats-list';
import TeamList from '~/components/uid/parts/team-list';
import TopicsList from '~/components/uid/parts/topics-list';

export default function ConditionalSections({ landing_page, fallback, preview }) {
  return (
    <>
      {
        // GRANTS
        landing_page._meta.uid === 'grants' && <GrantsPillars />
      }

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
