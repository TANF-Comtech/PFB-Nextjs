import React from 'react';
import styled from 'styled-components';

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

export default function BikingSurveyPage() {
  return (
    <LegacyPage>
      <Wrapper>
        <SiteMetaCustom title="Biking Survey | PeopleForBikes" />
        <MainContent contentPadding="2vh 4vw 2vh 4vw" maxWidth="1200px">
          <RedHeading>Biking in Your Town Survey</RedHeading>
          <hr />
          <p>
            PeopleForBikes wants to what its like to bike in your city/town. The information you
            provide will help us improve the bike riding experience. There are no right or wrong
            answers and your <strong>information will be kept strictly confidential</strong>.
          </p>
        </MainContent>
        <MainContent contentPadding="0vh 4vw 4vh 4vw" maxWidth="800px">
          <Container>
            <div className="embed-container">
              <iframe
                width="700"
                height="400"
                frameBorder="0"
                scrolling="yes"
                marginHeight="0"
                marginWidth="0"
                title="Biking In Your Town Survey"
                src="https://survey.alchemer.com/s3/6769415/PFB-CommSvy23"
              />
            </div>
          </Container>
        </MainContent>
        <MainContent contentPadding="4vh 4vw 2vh 4vw" maxWidth="1200px">
          <p style={{ textAlign: 'center' }}>
            Questions about the survey? Reach out to{' '}
            <a href="mailto:melissa@peopleforbikes.org?subject=Questions%20about%20PeopleForBikes%20Survey">
              Melissa
            </a>{' '}
            on our team.
          </p>
        </MainContent>
      </Wrapper>
    </LegacyPage>
  );
}
