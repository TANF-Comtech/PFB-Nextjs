import React from 'react';
import { PrismicRichText } from '@prismicio/react';

import getMetadata from '~/utils/getMetadata';

import BigTitleBanner from '~/components/big-title-banner';
import SecondaryTitleBanner from '~/components/secondary-title-banner';
import Heading1 from '~/components/h1';
import HeaderImage from '~/components/header-image';
import SummaryBlock from '~/components/summary-block';
import SiteMetaCustom from '~/components/site-meta-custom';

export default function UidHeader({ landing_page }) {
  const { theTitle, theDesc, theKeywords, thePath, theImage, theImageWidth, theImageHeight } =
    getMetadata(landing_page);

  return (
    <>
      {/* // HEADER - STYLE COMPLEX: (SecondaryTitleBanner + HeaderImage + */}
      {/* SummaryBlock */}
      {landing_page.header_image || landing_page._meta.uid === 'team' ? (
        <>
          <SiteMetaCustom
            desc={theDesc}
            keywords={theKeywords}
            title={theTitle}
            imgHeight={theImageHeight}
            imgSrc={theImage}
            imgWidth={theImageWidth}
            path={thePath}
          />
          <SecondaryTitleBanner
            secondaryText={landing_page.secondary_text}
            mainText={landing_page.main_text}
          />
          {landing_page.header_image && <HeaderImage srcSet={landing_page.header_image} />}
          {landing_page.summary && (
            <SummaryBlock bgColor="#002C40" textColor="#fff">
              <p>{landing_page.summary}</p>
            </SummaryBlock>
          )}
        </>
      ) : (
        // HEADER - STYLE SIMPLE: (BigTitleBanner + SummaryBlock)
        <>
          <SiteMetaCustom
            desc={theDesc}
            keywords={theKeywords}
            title={theTitle}
            imgHeight={theImageHeight}
            imgSrc={theImage}
            imgWidth={theImageWidth}
            path={thePath}
          />
          <BigTitleBanner>
            <PrismicRichText elements={{ heading1: Heading1 }} field={landing_page.title} />
          </BigTitleBanner>
          {landing_page.summary && (
            <SummaryBlock>
              <p>{landing_page.summary}</p>
            </SummaryBlock>
          )}
        </>
      )}
    </>
  );
}
