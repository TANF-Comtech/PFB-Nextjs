import React from 'react';
import Script from 'next/script';
import styled from 'styled-components';

import SiteMetaCustom from '~/components/site-meta-custom';
import Wrapper from '~/components/wrapper';
import MainContent from '~/components/main-content';

const Container = styled.section`
  .embed-container {
    position: relative;
    padding-bottom: 80%;
    height: 0;
    max-width: 100%;
  }

  .embed-container iframe,
  .embed-container object,
  .embed-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  small {
    position: absolute;
    z-index: 40;
    bottom: 0;
    margin-bottom: -15px;
  }
`;

const RedHeading = styled.h2`
  color: ${(props) => props.theme.red};
  font-weight: 700;
  text-transform: uppercase;
`;

// API Key for the DoubleTheDonation Script
const DDCONF = { API_KEY: 'R1fTLU2ixqyOvcdB' };

export default function DoubleYourDonation() {
  return (
    <Wrapper>
      <SiteMetaCustom title="Double Your Donation to PeopleForBikes" />
      <MainContent contentPadding="2vh 4vw 2vh 4vw" maxWidth="1200px">
        <RedHeading>Double Your Donation to PeopleForBikes</RedHeading>
        <hr />
        <p>
          Did you know that <strong>thousands of companies match donations by employees</strong> to
          PeopleForBikes? Please use the search tool below to see if your company will match your
          donation and the <strong>follow the provided links if they do</strong>.
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
  );
}
