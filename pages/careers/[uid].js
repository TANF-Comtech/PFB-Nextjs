import React, { useContext } from 'react';
import { PrismicRichText } from '@prismicio/react';

import { getAllCareers, getSingleCareer } from '~/lib/queries/careers';
import data from '~/data';

import { LegacyPage } from '~/components/legacy-page';
import Wrapper from '~/components/wrapper';
import SiteMetaCustom from '~/components/site-meta-custom';
import MainContent from '~/components/main-content';
import Heading1 from '~/components/h1';
import Rule from '~/components/rule';
import Button from '~/components/button';

export default function CareerPages({ page, preview }) {
  const { job } = page;
  const { meta } = data;

  return (
    <LegacyPage>
      <SiteMetaCustom
        desc={meta.desc}
        title={job.title ? `${job.title[0].text} | PeopleForBikes` : meta.title}
        imgHeight={meta.imgHeight}
        imgSrc={meta.imgSrc}
        imgWidth={meta.imgWidth}
        path={job ? `https://www.peopleforbikes.org/careers/${job._meta.uid}` : meta.path}
      />
      <Wrapper postPath="/careers/" postTitle="Careers" isWide={true}>
        <MainContent>
          {job.title && <Heading1>{job.title[0].text}</Heading1>}

          {job.posting && <PrismicRichText field={job.posting} />}
        </MainContent>
        <MainContent>
          <Button
            buttonAlign="center"
            buttonBg="#D23823"
            buttonBgHover="#D0021B"
            buttonBorder="none"
            buttonColor="white"
            buttonColorHover="white"
            buttonFontSize="18px"
            buttonPadding="10px 20px"
            buttonTextTransform="inherit"
            href="/careers"
          >
            Back to Careers Page
          </Button>
        </MainContent>
      </Wrapper>
    </LegacyPage>
  );
}

/* The return here sends the `page` prop back to the TopicPage component above for rendering */
export async function getStaticProps({ params, preview = false, previewData }) {
  const pageData = await getSingleCareer(params.uid, previewData);

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
  const allCareers = await getAllCareers();
  return {
    paths: allCareers?.map(({ node }) => `/careers/${node._meta.uid}`) || [],
    fallback: false,
  };
}
