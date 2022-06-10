import styled from 'styled-components';

import MainContent from '../global/main-content';

const Container = styled.section`
  .embed-container {
    position: relative;
    padding-bottom: 100%;
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

/**
 * <AlchemerSurvey>
 *
 * Static iFrame of Alchemer Survey
 * This was only designed to use on /pages/ridership-survey.js
 */
export default function AlchemerSurvey() {
  return (
    <>
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
    </>
  );
}
