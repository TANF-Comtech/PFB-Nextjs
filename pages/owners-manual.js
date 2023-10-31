import React from 'react';
import { useRouter } from 'next/router';
import { getOwnersManual } from '~/lib/queries/owners-manual';
import * as prismicH from '@prismicio/helpers';
import { PrismicRichText } from '@prismicio/react';

import { linkResolver } from '~/utils';

import { LegacyPage } from '~/components/legacy-page';
import SiteMetaCustom from '~/components/site-meta-custom';
import Wrapper from '~/components/wrapper';
import MainContent from '~/components/main-content';
import SecondaryTitleBanner from '~/components/secondary-title-banner';
import Spinner from '~/components/spinner';
import CustomErrorPage from '~/pages/404';
import NumberedPillars from '~/components/numbered-pillars';
import HeaderImage from '~/components/header-image';
import Button from '~/components/button';

export default function OwnersManual({ page, preview }) {
  const omData = page.owners_manual;

  const router = useRouter();

  // If page hasn't arrived yet, show loader
  if (router.isFallback) {
    return <Spinner />;
  }

  // If page never shows, throw 404
  if (!page) {
    return (
      <>
        <CustomErrorPage />
      </>
    );
  }

  console.log(omData)

  return (
    <LegacyPage>
      <Wrapper postTitle={prismicH.asText(omData.title)} isWide={true}>
        <SiteMetaCustom title="Owner's Manual | PeopleForBikes" />
        <SecondaryTitleBanner
          secondaryText="PeopleForBikes Bicycle"
          mainText="Owner's Manual"
        />
        {omData.hero && <HeaderImage srcSet={omData.hero} />}
        <MainContent>
          {omData.main_text && <PrismicRichText field={omData.main_text} linkResolver={linkResolver} /> }
          <hr style={{ marginBottom: '40px' }} />
          {omData.price_section_title && <h2>{ omData.price_section_title }</h2> }
          {omData.price_section_member_title && <h3>{ omData.price_section_member_title }</h3>}
          <Button 
            buttonBg="#00A2DF"
            buttonBorder="#00A2DF"
            buttonColor="#fff"
            buttonMargin="15px 0"
            href="/login"
          >
            Members: License the Owner's Manual
          </Button>
          {omData.price_section_nonmember_title && <h3>{ omData.price_section_nonmember_title }</h3>}
          <Button 
            buttonBg="#00A2DF"
            buttonBorder="#00A2DF"
            buttonColor="#fff"
            buttonMargin="15px 0"
            href="mailto:ray@peopleforbikes.org,rod@peopleforbikes.org?subject=Interested%20in%20Purchasing%20the%20PeopleForBikes%20Owner's%20Manual&body=PeopleForBikes%20Member%20Team%3A%0D%0A%0D%0AOur%20organization%20would%20like%20to%20express%20our%20interest%20in%20purchasing%20the%20PeopleForBikes%20Owner's%20Manual.%0D%0A%0D%0AWe%20look%20forward%20to%20discussing%20our%20options%20with%20you%2C%0D%0A"
          >
            Non-Members: License the Owner's Manual
          </Button>
          <hr style={{ margin: '40px 0' }} />
          {omData.price_section_become_a_member_title && <h3>{ omData.price_section_become_a_member_title }</h3>}
          <Button 
            buttonBg="#002C40"
            buttonBorder="#00A2DF"
            buttonColor="#fff"
            buttonMargin="15px 0 60px 0"
            href="mailto:mimi@peopleforbikes.org,rod@peopleforbikes.org?subject=Interested%20in%20Becoming%20a%20PeopleForBikes%20Member%20Organization&body=PeopleForBikes%20Member%20Team%3A%0D%0A%0D%0AOur%20organization%20would%20like%20to%20express%20our%20interest%20in%20becoming%20a%20member%20of%20PeopleForBikes.%0D%0A%0D%0AWe%20look%20forward%20to%20discussing%20our%20options%20with%20you%2C%0D%0A"
          >
            Become a Member
          </Button>
        </MainContent>
        <NumberedPillars 
          numbersWanted={ false }
          payload={ omData.owners_manual_benefits }
          title="Owner's Manual Benefits"
        />
        <MainContent>
          { omData.disclaimer && <p style={{ fontWeight: "700" }}>{omData.disclaimer}</p> }
        </MainContent>
      </Wrapper>
    </LegacyPage>
  );
}

export async function getStaticProps({ params, preview = true, previewData }) {
  const pageData = await getOwnersManual();

  if (!pageData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      preview,
      page: pageData ?? null,
    },
    revalidate: 60,
  };
}
