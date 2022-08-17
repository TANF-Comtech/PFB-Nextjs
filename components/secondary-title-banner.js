import React from 'react';
import styled from 'styled-components';

import MainContent from '~/components/main-content';

const Container = styled.section`
  padding: 2vh 0 4vh 0;

  @media (min-width: ${(props) => props.theme.lg}) {
    padding: 2vh 0 4vh 0;
  }
`;

const MainText = styled.h1`
  color: ${(props) => props.theme.red};
  display: inline;
  font-weight: 700;
  margin: 0 0 0 0;
  text-transform: none;
`;

const SecondaryText = styled.h1`
  color: ${(props) => props.theme.darkGray};
  display: inline;
  font-weight: 300;
  margin: 0 12px 0 0;
  text-transform: none;
`;

/**
 * <SecondaryTitleBanner>
 *
 * This puts a smaller impact title just above the <HeaderImage> on landing pages
 *
 * @param { string } mainColor - main text color (default: red)
 * @param { string } mainText - main text
 * @param { string } secondaryColor - secondary text color (default: darkest gray)
 * @param { string } secondaryText - secondary text
 *
 */

const SecondaryTitleBanner = ({ mainText, secondaryText }) => {
  return (
    <MainContent maxWidth="1000px">
      <Container>
        <SecondaryText>{secondaryText}</SecondaryText>
        <MainText>{mainText}</MainText>
      </Container>
    </MainContent>
  );
};

export default SecondaryTitleBanner;
