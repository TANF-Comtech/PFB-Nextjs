import React, { useContext } from 'react';
import styled from 'styled-components';
import { PrismicRichText } from '@prismicio/react';

import { getStats, getSingleStatsPage } from '~/lib/queries/statistics';
import { linkResolver } from '~/utils';
import data from '~/data';

import { LegacyPage } from '~/components/legacy-page';
import Wrapper from '~/components/wrapper';
import SiteMetaCustom from '~/components/site-meta-custom';
import MainContent from '~/components/main-content';
import Header1 from '~/components/h1';
import Promo from '~/components/promo';

import ResearchPromo from '~/public/promo/promo-research.jpg';

const IntroWrapper = styled.div`
  margin: 3vh 0 1vh 0;

  li {
    list-style-type: disc;
    padding-left: 10px;
  }
`;

export default function MembersPage({ page, preview }) {
  // Destructure page payload and meta from global context
  const { statistic_page } = page;
  const { meta } = data;

  return (
    <LegacyPage>
      <SiteMetaCustom
        desc={
          statistic_page.main_content
            ? `${statistic_page.main_content[0].text.substring(0, 180)} ... `
            : meta.desc
        }
        title={
          statistic_page.title
            ? `${statistic_page.title[0].text} Statistics | PeopleForBikes`
            : meta.title
        }
        imgHeight={meta.imgHeight}
        imgSrc={meta.imgSrc}
        imgWidth={meta.imgWidth}
        path={
          statistic_page
            ? `https://www.peopleforbikes.org/statistics/${statistic_page._meta.uid}`
            : meta.path
        }
      />
      <Wrapper postPath="/research" postTitle="Research" isWide="true">
        <MainContent>
          {statistic_page.title && <Header1>{statistic_page.title[0].text} Statistics</Header1>}
          {statistic_page.main_content && (
            <IntroWrapper>
              <PrismicRichText field={statistic_page.main_content} linkResolver={linkResolver} />
            </IntroWrapper>
          )}
        </MainContent>

        <Promo
          bigWords="Research Library"
          path="/research"
          smallWords="Explore More Stats In Our"
          source={ResearchPromo}
        />
      </Wrapper>
    </LegacyPage>
  );
}

/* The return here sends the `page` prop back to the Page component above for rendering */
export async function getStaticProps({ params, preview = false, previewData }) {
  const pageData = await getSingleStatsPage(params.uid, previewData);

  return {
    props: {
      preview,
      page: pageData ?? null,
    },
    revalidate: 60,
  };
}

// getStaticPaths requires the whole paths argument to be objects of URL it needs to statically render server-side
export async function getStaticPaths() {
  const pages = await getStats();
  return {
    paths: pages?.map(({ node }) => `/statistics/${node._meta.uid}`) || [],
    fallback: false,
  };
}
