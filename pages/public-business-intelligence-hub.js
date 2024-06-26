import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { LegacyPage } from '~/components/legacy-page';
import SiteMetaCustom from '~/components/site-meta-custom';
import Wrapper from '~/components/wrapper';
import MainContent from '~/components/main-content';

const Container = styled.section`
  .embed-container {
    position: relative !important;
    padding-bottom: 100% !important;
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

export default function PublicBusinessIntelligenceHubPage() {
  return (
    <LegacyPage>
      <Wrapper>
        <SiteMetaCustom title="Public Business Intelligence Hub | PeopleForBikes" />
        <MainContent contentPadding="2vh 4vw 2vh 4vw" maxWidth="1200px">
          <RedHeading>Public Business Intelligence Hub</RedHeading>
          <hr />
          <p>
            PeopleForBikes is providing an overview of the business side of the biking industry for
            the general public with our Business Intelligence Hub.{' '}
            <Link href="/members">PeopleForBikes Coalition Members</Link> can access the full
            Business Intelligence Hub in our <Link href="/members/member-home">Member Center</Link>.
            Browse the content below and learn how we are improving biking for everyone.
          </p>
        </MainContent>
        <MainContent contentPadding="0vh 4vw 4vh 4vw" maxWidth="1200px">
          <Container>
            <div className="embed-container">
              <iframe
                width="600"
                height="1500"
                scrolling="yes"
                src="https://datastudio.google.com/embed/reporting/a7a0cbdd-e6d6-44a5-ae44-78198c03ff76/page/63ESB"
                marginHeight="0"
                marginWidth="0"
                title="Public Business Intelligence Hub"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </Container>
        </MainContent>
        <MainContent contentPadding="4vh 4vw 2vh 4vw" maxWidth="1200px">
          <p style={{ textAlign: 'center' }}>
            Questions about this page? Reach out to{' '}
            <a href="mailto:patrick@peopleforbikes.org,melissa@peopleforbikes.org?subject=Questions%20about%20the%20Public%20Business%20Intelligence%20Hub">
              to our team
            </a>
            .
          </p>
        </MainContent>
      </Wrapper>
    </LegacyPage>
  );
}
