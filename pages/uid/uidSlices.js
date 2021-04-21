import React from "react";
import NumberedPillars from '../../components/content/numbered-pillars'
import GrantsList from '../../components/content/grant-guidelines-list'
import ReportsList from '../../components/content/reports-list'
import ResearchBanners from '../../components/content/research-banners'
import SummaryBlock from '../../components/content/summary-block'
import Button from '../../components/primitives/button'
import { linkResolver, randomID } from '../../lib/utils'
import ToolkitPillars from '../../components/content/toolkit-pillars'
import ActionItemGroup from '../../components/slices/action-item-group'
import MissionPillars from '../../components/content/mission-pillars'
import Promo from '../../components/slices/promo'

export default function UidSlices({ landing_page }) {
  // SLICE CONTENT (in body)

  let Slice;

  if (landing_page.body) {
    Slice = landing_page.body.map((slice) => {
      // CONTENT BLOCK
      if (slice.__typename === "Landing_pageBodyContent_block") {
        return (
          <SummaryBlock key={randomID(10000000)}>
            <RichText
              render={slice.primary.main_content}
              linkResolver={linkResolver}
            />
          </SummaryBlock>
        );
      }

      // ACTION ITEM SLICE
      if (slice.__typename === "Landing_pageBodyAction_item") {
        return (
          <ActionItemGroup key={randomID(10000000)} payload={slice.fields} />
        );
      }

      // ACCORDION SLICE
      if (slice.__typename === "Landing_pageBodyAccordion_list") {
        return <GrantsList payload={slice.fields} />;
      }

      // MISSION SLICE
      if (
        slice.__typename === "Landing_pageBodyMission_content" &&
        landing_page._meta.uid === "mission"
      ) {
        return (
          <>
            <NumberedPillars
              payload={slice.fields}
              title={slice.primary.pillar_title}
            />
            <MissionPillars />
          </>
        );
      }

      // ORIENTATION
      if (
        slice.__typename === "Landing_pageBodyMission_content" &&
        landing_page._meta.uid === "board-orientation"
      ) {
        return (
          <>
            <NumberedPillars
              payload={slice.fields}
              title={slice.primary.pillar_title}
            />
            <ToolkitPillars />
          </>
        );
      }

      // MISSION SLICE FOR LOCAL INNOVATION
      if (
        slice.__typename === "Landing_pageBodyMission_content" &&
        landing_page._meta.uid === "local-innovation"
      ) {
        return (
          <>
            <NumberedPillars
              numbersWanted="false"
              payload={slice.fields}
              title={slice.primary.pillar_title}
            />
          </>
        );
      }

      // RESEARCH CAMPAIGN BANNERS
      if (slice.__typename === "Landing_pageBodyResearch") {
        return <ResearchBanners payload={slice.fields} />;
      }

      // RESEARCH REPORTS
      if (slice.__typename === "Landing_pageBodyResearch__reports") {
        return (
          <>
            <ReportsList payload={slice.fields} />
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
        );
      }

      // PROMO
      // logic to catch policy and grant finder custom promos (with internal links)
      if (slice.__typename === "Landing_pageBodyPromo") {
        return (
          <Promo
            bigWords={slice.primary.bottom_text}
            path={
              (landing_page._meta.uid === "policy" && "/policy/finder") ||
              (landing_page._meta.uid === "grants" && "/grants/finder") ||
              (landing_page._meta.uid === "grant-application" &&
                "/grants/finder") ||
              (landing_page._meta.uid === "grant-guidelines" &&
                "/grants/finder") ||
              (landing_page._meta.uid === "grant-funding" &&
                "/grants/finder") ||
              slice.primary.link
            }
            smallWords={slice.primary.top_text}
            source={slice.primary.main_image.url}
          />
        );
      }
    });
  }

  return { Slice };
}
