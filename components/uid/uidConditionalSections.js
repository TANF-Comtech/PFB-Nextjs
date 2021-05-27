import React from "react";
import NewsList from "../content/news-list";
import LocationsList from "../content/locations-list";
import TopicsList from "../content/topics-list";
import RidesList from "../content/rides-list";
import TeamList from "../content/team-list";
import List from "../content/list";
import JoinList from "../content/join-list";
import GrantsPillars from "../content/grants-pillars";
import EventsList from "../content/events-list";
import PolicyPillars from "../content/policy-pillars";
import StatsList from "../content/stats-list";
import RedActionItem from "../slices/action-item-red";
import MainContent from "../global/main-content";
import CampaignList from "../content/campaign-list";

export default function ConditionalSections({
  landing_page,
  fallback,
}) {
  return (
    <>
      {
        // MEMBER CENTER PILLAR - Up Front
        landing_page._meta.uid === "members" && (
          <MainContent contentPadding="4vh 4vw 0 4vw">
            <RedActionItem
              path="/members/business-intelligence-hub"
              title="Business Intelligence Hub"
              text="Explore our dashboard for insights into the bicycle industry."
            />
          </MainContent>
        )
      }

      {
        // NEWS
        landing_page._meta.uid === "news" && (
          <NewsList
            fallback={fallback}
            nodeName="node"
            payload={landing_page.data}
          />
        )
      }

      {
        // LOCATIONS
        landing_page._meta.uid === "locations" && (
          <LocationsList payload={landing_page.data} />
        )
      }

      {
        // TOPICS
        landing_page._meta.uid === "topics" && (
          <TopicsList payload={landing_page.data} />
        )
      }

      {
        // RIDES
        landing_page._meta.uid === "rides" && (
          <RidesList payload={landing_page.data} />
        )
      }

      {
        // TEAM
        landing_page._meta.uid === "team" && (
          <TeamList
            ceoPayload={landing_page.dataCEO}
            teamPayload={landing_page.dataTeam}
          />
        )
      }

      {
        // CAMPAIGNS
        landing_page._meta.uid === "campaigns" && (
          <CampaignList payload={landing_page.data} />
        )
      }

      {
        // CAREERS
        landing_page._meta.uid === "careers" && (
          <List
            payload={landing_page.data}
            textColor="#3E9FDC"
            title="Career Opportunities"
          />
        )
      }

      {
        // JOIN
        landing_page._meta.uid === "join" && <JoinList />
      }

      {
        // GRANTS
        landing_page._meta.uid === "grants" && <GrantsPillars />
      }

      {
        // POLICY PILLARS
        landing_page._meta.uid === "policy" && <PolicyPillars />
      }

      {
        // RESEARCH STATS
        landing_page._meta.uid === "research" && (
          <StatsList payload={landing_page.data} />
        )
      }

      {
        // EVENTS
        landing_page._meta.uid === "events" && (
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
