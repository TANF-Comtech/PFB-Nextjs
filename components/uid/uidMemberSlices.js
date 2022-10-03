import React, { useContext } from 'react';
import { PrismicRichText } from '@prismicio/react';
import { ThemeContext } from 'styled-components';

import { linkResolver, randomID } from '~/utils';

import NumberedPillars from '~/components/numbered-pillars';
import MainContent from '~/components/main-content';
import SummaryBlock from '~/components/summary-block';
import Promo from '~/components/promo';
import ImageList from '~/components/uid/parts/image-list';

export default function UidMemberSlices({ landing_page }) {
  const themeProps = useContext(ThemeContext);

  // SLICE CONTENT (in body)
  let Slice;

  if (landing_page.body) {
    Slice = landing_page.body.map((slice) => {
      // SUMMARY BLOCK - TOP /MEMBERS PAGE
      if (slice.__typename === 'Landing_pageBodySummary_block' && slice.primary.summary_id === 1) {
        return (
          <SummaryBlock
            bgColor={themeProps.midnightBlue}
            buttons={slice.fields}
            key={randomID(10000000)}
            fontSize="28px"
            lineHeight="42px"
            maxWidth="800px"
            textColor="#fff"
          >
            <PrismicRichText field={slice.primary.summary_area} linkResolver={linkResolver} />
          </SummaryBlock>
        );
      }

      // MEMBER BENEFITS - Image List
      if (slice.__typename === 'Landing_pageBodyImage_list') {
        return (
          <MainContent contentPadding="6vh 4vw">
            <h2 style={{ textAlign: 'center' }}>Membership Benefits</h2>
            <ImageList key={randomID(10000000)} payload={slice.fields} />
          </MainContent>
        );
      }

      // SUMMARY BLOCK 2 - MEMBER RENEW
      if (
        (slice.__typename === 'Landing_pageBodySummary_block' && slice.primary.summary_id === 2) ||
        slice.primary.summary_id === 3
      ) {
        return (
          <SummaryBlock
            bgColor={themeProps.midnightBlue}
            buttons={slice.fields}
            key={randomID(10000000)}
            fontSize="28px"
            lineHeight="42px"
            marginBottom="2vh"
            maxWidth="800px"
            textColor="#fff"
            title={slice.primary.summary_title}
          >
            <PrismicRichText field={slice.primary.summary_area} linkResolver={linkResolver} />
          </SummaryBlock>
        );
      }

      // PROMO
      if (slice.__typename === 'Landing_pageBodyPromo') {
        return (
          <Promo
            bigWords={slice.primary.bottom_text}
            path={slice.primary.link}
            smallWords={slice.primary.top_text}
            source={slice.primary.main_image.url}
          />
        );
      }
    });
  }

  return <>{Slice}</>;
}
