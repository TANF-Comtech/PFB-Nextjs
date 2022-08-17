import React, { useContext } from 'react';
import { RichText } from 'prismic-reactjs';
import styled, { ThemeContext } from 'styled-components';

import { linkResolver, randomID } from '~/utils';

import Button from '~/components/button';
import NumberedPillars from '~/components/numbered-pillars';
import SecondaryCampaign from '~/components/secondary-campaign';
import SummaryBlock from '~/components/summary-block';
import VisualGrid from '~/components/visual-grid';
import MainContent from '~/components/main-content';
import ActionItemGroup from '~/components/action-item-group';
import Promo from '~/components/promo';
import MissionPillars from '~/components/uid/parts/mission-pillars';
import ReportsList from '~/components/uid/parts/reports-list';
import ToolkitPillars from '~/components/uid/parts/toolkit-pillars';

const RedHeading = styled.h2`
  color: ${(props) => props.theme.red};
  font-weight: 700;
  text-transform: uppercase;
`;

export default function UidSlices({ landing_page }) {
  const themeProps = useContext(ThemeContext);

  // SLICE CONTENT (in body)
  let Slice;

  if (landing_page.body) {
    Slice = landing_page.body.map((slice) => {
      // CONTENT BLOCK
      if (slice.__typename === 'Landing_pageBodyContent_block') {
        return (
          <SummaryBlock key={randomID(10000000)}>
            <RichText render={slice.primary.main_content} linkResolver={linkResolver} />
          </SummaryBlock>
        );
      }

      // ACTION ITEM SLICE
      if (slice.__typename === 'Landing_pageBodyAction_item') {
        return <ActionItemGroup key={randomID(10000000)} payload={slice.fields} />;
      }

      // MISSION SLICE
      if (
        slice.__typename === 'Landing_pageBodyMission_content' &&
        landing_page._meta.uid === 'mission'
      ) {
        return (
          <>
            <NumberedPillars payload={slice.fields} title={slice.primary.pillar_title} />
            <MissionPillars />
          </>
        );
      }

      // ORIENTATION
      if (
        slice.__typename === 'Landing_pageBodyMission_content' &&
        landing_page._meta.uid === 'board-orientation'
      ) {
        return (
          <>
            <NumberedPillars payload={slice.fields} title={slice.primary.pillar_title} />
            <ToolkitPillars />
          </>
        );
      }

      // RELATED LINKS (CAMPAIGNS)
      if (
        (slice.__typename === 'Landing_pageBodyRelated_list' &&
          landing_page._meta.uid === 'campaigns') ||
        (slice.__typename === 'Landing_pageBodyRelated_list' &&
          landing_page._meta.uid === 'local-innovation')
      ) {
        return (
          <>
            <MainContent contentPadding="4vh 4vw 4vh 4vw">
              <RedHeading>Programs</RedHeading>
              <hr />
            </MainContent>
            <SecondaryCampaign payload={slice.fields} />
          </>
        );
      }

      // MISSION SLICE FOR LOCAL INNOVATION
      if (
        slice.__typename === 'Landing_pageBodyMission_content' &&
        landing_page._meta.uid === 'local-innovation'
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
      if (slice.__typename === 'Landing_pageBodyResearch__reports') {
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
      if (slice.__typename === 'Landing_pageBodyPromo') {
        // SUMMARY BLOCK, (manual, just for Grants as of 2022/04)
        if (landing_page._meta.uid === 'grants') {
          return (
            <>
              <SummaryBlock
                bgColor={themeProps.midnightBlue}
                buttons={[
                  {
                    button_link: 'mailto:nancy@peopleforbikes.org',
                    button_text: 'Questions? Contact Nancy Hershfield',
                  },
                ]}
                key={randomID(10000000)}
                fontSize="28px"
                lineHeight="42px"
                maxWidth="800px"
                textColor="#fff"
              >
                <p>
                  We&apos;re updating our community grants process and ask for your patience. Please
                  check back in the next few months.
                </p>
              </SummaryBlock>
              <Promo
                bigWords={slice.primary.bottom_text}
                path={
                  (landing_page._meta.uid === 'policy' && '/policy/finder') ||
                  (landing_page._meta.uid === 'grants' && '/grants/finder') ||
                  (landing_page._meta.uid === 'grant-application' && '/grants/finder') ||
                  (landing_page._meta.uid === 'grant-guidelines' && '/grants/finder') ||
                  (landing_page._meta.uid === 'grant-funding' && '/grants/finder') ||
                  slice.primary.link
                }
                smallWords={slice.primary.top_text}
                source={slice.primary.main_image.url}
              />
            </>
          );
        } else {
          return (
            <Promo
              bigWords={slice.primary.bottom_text}
              path={
                (landing_page._meta.uid === 'policy' && '/policy/finder') ||
                (landing_page._meta.uid === 'grants' && '/grants/finder') ||
                (landing_page._meta.uid === 'grant-application' && '/grants/finder') ||
                (landing_page._meta.uid === 'grant-guidelines' && '/grants/finder') ||
                (landing_page._meta.uid === 'grant-funding' && '/grants/finder') ||
                slice.primary.link
              }
              smallWords={slice.primary.top_text}
              source={slice.primary.main_image.url}
            />
          );
        }
      }

      // VisualGrid
      if (slice.__typename === 'Landing_pageBodyVisual_grid') {
        return (
          <>
            <MainContent contentPadding="4vh 4vw 4vh 4vw">
              <RedHeading>Partners</RedHeading>
              <hr />
            </MainContent>
            <VisualGrid payload={slice.fields} title={slice.primary.grid_title} />
          </>
        );
      }
    });
  }

  return <>{Slice}</>;
}
