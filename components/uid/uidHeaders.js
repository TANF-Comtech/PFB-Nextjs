import React from "react";
import BigTitleBanner from "../content/big-title-banner";
import SecondaryTitleBanner from "../content/secondary-title-banner";
import Heading1 from "../primitives/h1";
import HeaderImage from "../global/header-image";
import SummaryBlock from "../content/summary-block";
import { RichText } from "prismic-reactjs";

export default function UidHeader({ landing_page }) {
  return (
    <>
      {/* // HEADER - STYLE COMPLEX: (SecondaryTitleBanner + HeaderImage + */}
      {/* SummaryBlock */}
      {landing_page.header_image || landing_page._meta.uid === "team" ? (
        <>
          <SecondaryTitleBanner
            secondaryText={landing_page.secondary_text}
            mainText={landing_page.main_text}
          />
          {landing_page.header_image && (
            <HeaderImage srcSet={landing_page.header_image} />
          )}
          {landing_page.summary && (
            <SummaryBlock bgColor="#002C40" textColor="#fff">
              <p>{landing_page.summary}</p>
            </SummaryBlock>
          )}
        </>
      ) : (
        // HEADER - STYLE SIMPLE: (BigTitleBanner + SummaryBlock)
        <>
          <BigTitleBanner>
            <RichText
              elements={{ heading1: Heading1 }}
              render={landing_page.title}
            />
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
