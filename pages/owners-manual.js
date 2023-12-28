import React, { useContext, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getOwnersManual } from '~/lib/queries/owners-manual';
import * as prismicH from '@prismicio/helpers';
import { PrismicRichText } from '@prismicio/react';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';

import { AlgoliaIndex, AlgoliaReactClient } from '~/lib/algolia/algoliaClient';
import { memberFormatter } from '~/lib/algolia/memberFormatter';
import getCorporateMembers from '~/lib/salesforce/getCorporateMembers';
import { linkResolver } from '~/utils';
import { ThemeContext } from 'styled-components';

import { ownersManualModalAtom } from '~/atoms';

import { LegacyPage } from '~/components/legacy-page';
import SiteMetaCustom from '~/components/site-meta-custom';
import Wrapper from '~/components/wrapper';
import MainContent from '~/components/main-content';
import SecondaryTitleBanner from '~/components/secondary-title-banner';
import Spinner from '~/components/spinner';
import CustomErrorPage from '~/pages/404';
import NumberedPillars from '~/components/numbered-pillars';
import HeaderImage from '~/components/header-image';
import { Button } from '~/components/simple-button';
import { Modal } from '~/components/modal';
import { OwnersManual } from '~/components/owners-manual';

export default function OwnersManualPage({ corporateMembers, page, preview }) {
  const themeProps = useContext(ThemeContext);
  const router = useRouter();
  const omData = page.owners_manual;

  // pulls in modal atom, sets modal behavior on initial load
  const [isOwnersManualModalOpen, setIsOwnersManualModalOpen] = useAtom(ownersManualModalAtom);

  const handleOpen = useCallback(() => {
    setIsOwnersManualModalOpen(true);
  }, [setIsOwnersManualModalOpen]);

  // handleClose is for the OM sequence
  const handleClose = useCallback(() => {
    setIsOwnersManualModalOpen(false);
  }, [setIsOwnersManualModalOpen]);

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

  return (
    <LegacyPage>
      <Wrapper postTitle={prismicH.asText(omData.title)} isWide={true}>
        <SiteMetaCustom title="Owner's Manual | PeopleForBikes" />
        <SecondaryTitleBanner secondaryText="PeopleForBikes Bicycle" mainText="Owner's Manual" />
        {omData.hero && <HeaderImage srcSet={omData.hero} />}
        <MainContent bgColor={themeProps.midnightBlue} textColor="#fff">
          <div className="flex flex-col items-center p-5 sm:flex-row sm:justify-evenly">
            <a
              className="block pb-5 font-bold sm:pb-0 sm:pr-2"
              href="https://pfb-main-site-assets.s3.amazonaws.com/peopleforbikes_ebike_owners_manual_v1_sample.pdf"
              target="_blank"
            >
              <Button label="Preview the Owner's Manual" size="large" />
            </a>
            <div className="block font-bold">
              <Button label="Purchase the Owner's Manual" size="large" onClick={handleOpen} />
            </div>
          </div>
        </MainContent>
        <MainContent contentPadding="6vh 2vw 2vh 2vw">
          {omData.main_text && (
            <PrismicRichText field={omData.main_text} linkResolver={linkResolver} />
          )}
          {omData.price_section_title && <h2>{omData.price_section_title}</h2>}
          {omData.price_section_member_title && <h3>{omData.price_section_member_title}</h3>}
          {omData.price_section_nonmember_title && <h3>{omData.price_section_nonmember_title}</h3>}
        </MainContent>
        <MainContent contentPadding="2vh 2vw 6vh 2vw">
          <div className="flex flex-col items-center p-5 sm:flex-row sm:justify-evenly">
            <div className="block font-bold">
              <Button label="Purchase the Owner's Manual" size="large" onClick={handleOpen} />
            </div>
          </div>
        </MainContent>
        <NumberedPillars
          numbersWanted={false}
          payload={omData.owners_manual_benefits}
          title="Owner's Manual Benefits"
        />
        <MainContent>
          {omData.disclaimer && <p style={{ fontWeight: '700' }}>{omData.disclaimer}</p>}
        </MainContent>
      </Wrapper>
      <Modal
        show={isOwnersManualModalOpen}
        onClose={handleClose}
        className="aspect-video overflow-y-scroll"
      >
        <OwnersManual memberData={corporateMembers} />
      </Modal>
    </LegacyPage>
  );
}

export async function getStaticProps({ params, preview = true, previewData }) {
  const pageData = await getOwnersManual();
  const memberData = await getCorporateMembers();

  if (process.env.ALGOLIA_INDEXING_ENABLED === 'true') {
    const algoliaFormattedData = memberFormatter(memberData);
    await AlgoliaIndex('PFB_COALITION_MEMBERS').replaceAllObjects(algoliaFormattedData);
  }

  if (!pageData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      preview,
      page: pageData ?? null,
      corporateMembers: memberData ?? null,
    },
    revalidate: 60,
  };
}
