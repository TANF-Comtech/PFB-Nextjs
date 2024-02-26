import React, { useContext, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getOwnersManual } from '~/lib/queries/owners-manual';
import * as prismicH from '@prismicio/helpers';
import { PrismicRichText } from '@prismicio/react';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import { AlgoliaIndex, AlgoliaReactClient } from '~/lib/algolia/algoliaClient';
import { memberFormatter } from '~/lib/algolia/memberFormatter';
import getCorporateMembers from '~/lib/salesforce/getCorporateMembers';
import { linkResolver } from '~/utils';
import { ThemeContext } from 'styled-components';

import { ownersManualModalAtom, corporateMembersAtom } from '~/atoms';

import { Page } from '~/components/new/page';

import MainContent from '~/components/main-content';
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

  // assigns data to corporateMemberAtom, cleans them for react-select value/label syntax
  const [corporateMembersData, setCorporateMembersData] = useAtom(corporateMembersAtom);
  useEffect(() => {
    const cleanedCorporateMembersData = corporateMembers.map((item) => ({
      value: item.Id,
      label: item.Published_Name__c,
    }));
    cleanedCorporateMembersData.unshift({ value: null, label: 'Find Your Organization' });
    setCorporateMembersData(cleanedCorporateMembersData);
  }, [corporateMembers]);

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
    <>
      <Page title="Owner's Manual" hasHero showDonate={false} className="min-h-[100vh]">
        <TextHero omData={omData} />
        <PurchaseOptions handleOpen={handleOpen} omData={omData} themeProps={themeProps} />
        <InformationSection handleOpen={handleOpen} omData={omData} />
      </Page>
      <Modal
        show={isOwnersManualModalOpen}
        onClose={handleClose}
        className="aspect-video overflow-y-scroll"
      >
        <OwnersManual />
      </Modal>
    </>
  );
}

// Radial Gradient with thin text overlay
const TextHero = ({ omData }) => {
  return (
    <>
      <div className="pfb-gradient h-100vh mt-36 flex min-h-[200px] flex-col items-center justify-center px-5 sm:px-10">
        <div className="m-0 text-center font-dharma text-[50px] uppercase leading-[60px] text-white xs:tracking-[2px] sm:text-[70px] sm:leading-[90px]">
          Bicycle Owner's Manual
        </div>
        <div className="text-center font-montserrat text-[18px] font-[700] uppercase text-white xs:tracking-[2px] sm:text-[22px]">
          <span className="text-yellow">Now Featuring</span> E-Bike Content
        </div>
      </div>
      {omData.price_section_title && (
        <div className="mx-auto my-10 max-w-6xl px-5 text-base leading-[36px] sm:px-10 sm:text-xl">
          {omData.price_section_title}
        </div>
      )}
    </>
  );
};

const PurchaseOptions = ({ handleOpen, omData, themeProps }) => {
  return (
    <>
      <div className="bg-lightestGray">
        {omData.main_text && (
          <>
            <div className="mx-auto max-w-[1000px] px-8 py-10">
              <div className="prismic-rich-text">
                <PrismicRichText
                  field={omData.main_text}
                  linkResolver={linkResolver}
                  className="prismic-rich-text"
                />
              </div>
            </div>
            <div className="mx-auto max-w-[1000px] px-8 pb-10">
              <div className="block">
                <a
                  className="mb-2 inline-block cursor-pointer rounded border border-solid border-gray/50 bg-white px-8 py-4 text-center text-[20px] uppercase leading-[26px] text-black focus:outline-none"
                  href="https://pfb-main-site-assets.s3.amazonaws.com/peopleforbikes_ebike_owners_manual_v1_sample.pdf"
                  target="_blank"
                >
                  Preview the Owner's Manual
                </a>
              </div>
            </div>
          </>
        )}
        <div className="mx-auto h-[2px] max-w-[940px] bg-blue max-[960px]:mx-8"></div>
        <div className="mx-auto max-w-[1000px] px-8 py-10">
          <div className="flex flex-col items-start justify-around md:flex-row md:items-center">
            <div
              className="mb-2 inline-block cursor-pointer rounded bg-blue px-8 py-4 text-center text-[20px] font-bold uppercase leading-[26px] text-white focus:outline-none xs:mr-5 md:w-[50%]"
              onClick={handleOpen}
            >
              Purchase the Owner's Manual
            </div>
            <div className="md:w-[50%]">
              {omData.price_section_member_title && (
                <h3 className="text- mb-2 mt-0 text-[20px] leading-[32px]">
                  {omData.price_section_member_title}
                </h3>
              )}
              {omData.price_section_nonmember_title && (
                <h3 className="text- mb-2 mt-0 text-[20px] leading-[32px]">
                  {omData.price_section_nonmember_title}
                </h3>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const InformationSection = ({ handleOpen, omData }) => {
  return (
    <div className="bg-lightestGray">
      <div className="mx-auto max-w-[1000px] px-8 pt-10">
        <div className="mx-auto mb-[15px] h-[2px] max-w-[940px] max-[960px]:mx-8 sm:bg-blue"></div>
        <h2 className="text-darkBlue relative m-0 mx-auto flex -translate-y-[40px] justify-center font-montserrat text-[30px] font-semibold uppercase leading-[45px] xs:tracking-[2px] sm:-translate-y-[45px] sm:text-[40px] sm:leading-[60px]">
          <span className="block bg-lightestGray sm:px-4">Owner's Manual Benefits</span>
        </h2>
        <div className="flex flex-col items-start justify-around md:flex-row md:items-center">
          <div className="md:w-[40%]">{omData.hero && <HeaderImage srcSet={omData.hero} />}</div>
          <ul className="md:w-[60%]">
            {omData.owners_manual_benefits.map((item) => {
              return (
                <li className="mb-7 border-b border-lightGray pb-7 last:border-0">
                  <span className="block font-bold">{item.pillar_title}</span>
                  <span className="block">{item.pillar_content}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="mx-auto h-[2px] max-w-[940px] bg-blue max-[960px]:mx-8"></div>
      <div className="mx-auto max-w-[1000px] px-8 py-10">
        <div className="flex flex-col items-start justify-around md:flex-row md:items-center">
          <div
            className="mb-2 inline-block cursor-pointer rounded bg-blue px-8 py-4 text-center text-[20px] font-bold uppercase leading-[26px] text-white focus:outline-none xs:mr-5 md:w-[50%]"
            onClick={handleOpen}
          >
            Purchase the Owner's Manual
          </div>
          <div className="md:w-[50%]">
            {omData.price_section_member_title && (
              <h3 className="text- mb-2 mt-0 text-[20px] leading-[32px]">
                {omData.price_section_member_title}
              </h3>
            )}
            {omData.price_section_nonmember_title && (
              <h3 className="text- mb-2 mt-0 text-[20px] leading-[32px]">
                {omData.price_section_nonmember_title}
              </h3>
            )}
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-[1000px] px-8 pb-10">
        <div className="mx-auto mb-10 h-[2px] max-w-[940px] bg-blue"></div>
        {omData.disclaimer && <p>{omData.disclaimer}</p>}
      </div>
    </div>
  );
};

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
