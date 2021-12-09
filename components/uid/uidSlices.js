import React from "react";
import { RichText } from 'prismic-reactjs'

import { linkResolver, randomID } from "../../lib/utils";

import Button from "../primitives/button";
import GrantsList from "../content/grant-guidelines-list";
import MissionPillars from "../content/mission-pillars";
import NumberedPillars from "../content/numbered-pillars";
import ReportsList from "../content/reports-list";
import SecondaryCampaign from "../global/secondary-campaign"
import SummaryBlock from "../content/summary-block";
import ToolkitPillars from "../content/toolkit-pillars";
import VisualGrid from "../global/visual-grid"

import ActionItemGroup from "../slices/action-item-group";
import Promo from "../slices/promo";

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

      // RELATED LINKS (CAMPAIGNS)
      if (
        slice.__typename === "Landing_pageBodyRelated_list" &&
        landing_page._meta.uid === "campaigns" ||
        slice.__typename === "Landing_pageBodyRelated_list" &&
        landing_page._meta.uid === "local-innovation" 
      ) {
        return (
          <SecondaryCampaign
            payload={ slice.fields }
          />
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

      // VisualGrid
      if (slice.__typename === "Landing_pageBodyVisual_grid") {
        return(
          <VisualGrid
            payload={ slice.fields }
            title={ slice.primary.grid_title }
          />
        )
      }

    });
  }

  return (
    <>
      { Slice }
    </>
  );
}
