import React from 'react';
import Script from 'next/script';
import styled from 'styled-components';

import { LegacyPage } from '~/components/legacy-page';
import SiteMetaCustom from '~/components/site-meta-custom';
import Wrapper from '~/components/wrapper';
import MainContent from '~/components/main-content';

const Container = styled.section`
  .embed-container {
    position: relative !important;
    padding-bottom: 80% !important;
    height: 0 !important;
    max-width: 100% !important;
  }

  .embed-container iframe,
  .embed-container object,
  .embed-container iframe {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
  }

  small {
    position: absolute !important;
    z-index: 40 !important;
    bottom: 0 !important;
    margin-bottom: -15px !important;
  }
`;

const RedHeading = styled.h2`
  color: ${(props) => props.theme.red} !important;
  font-weight: 700 !important;
  text-transform: uppercase !important;
`;

// API Key for the DoubleTheDonation Script
const DDCONF = { API_KEY: 'R1fTLU2ixqyOvcdB' };

export default function DoubleYourDonation() {
  return (
    <LegacyPage>
      <Wrapper>
        <SiteMetaCustom title="Double Your Donation to PeopleForBikes" />
        <MainContent contentPadding="2vh 4vw 2vh 4vw" maxWidth="1200px">
          <RedHeading>Double Your Donation to PeopleForBikes</RedHeading>
          <hr />
          <p>
            Did you know that <strong>thousands of companies match donations by employees</strong>{' '}
            to PeopleForBikes? Please use the search tool below to see if your company will match
            your donation and the <strong>follow the provided links if they do</strong>.
          </p>
        </MainContent>
        <MainContent contentPadding="0vh 4vw 4vh 4vw" maxWidth="800px">
          <Container>
            <Script
              src="https://doublethedonation.com/api/js/ddplugin.js"
              strategy="afterInteractive"
            />
            <div id="dd-container">
              <a href="https://doublethedonation.com/matching-grant-resources/matching-gift-basics/">
                Matching Gift
              </a>{' '}
              and{' '}
              <a href="https://doublethedonation.com/matching-grant-resources/volunteer-grant-basics/">
                Volunteer Grant
              </a>{' '}
              information provided by <br />
              <a href="https://doublethedonation.com">
                <img
                  alt="Powered by Double the Donation"
                  src="https://doublethedonation.com/api/img/powered-by.png"
                />
              </a>
            </div>
          </Container>
        </MainContent>
        <MainContent contentPadding="4vh 4vw 2vh 4vw" maxWidth="1200px">
          <p style={{ textAlign: 'center' }}>
            Questions about this page? Reach out to{' '}
            <a href="mailto:info@peopleforbikes.org?subject=Questions%20about%20PeopleForBikes%20DoubleTheDonation%20Service">
              our team
            </a>{' '}
            for more details.
          </p>
        </MainContent>
      </Wrapper>
    </LegacyPage>
  );
}
