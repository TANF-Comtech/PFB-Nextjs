import React from 'react';
import styled from 'styled-components';

import MainContent from '~/components/main-content';

const Container = styled.section`
  padding: 2vh 0 4vh 0 !important;

  @media (min-width: ${(props) => props.theme.lg}) {
    padding: 2vh 0 4vh 0 !important;
  }
`;

const MainText = styled.h1`
  color: ${(props) => props.theme.red} !important;
  display: inline !important;
  font-weight: 700 !important;
  margin: 0 0 0 0 !important;
  text-transform: none !important;
`;

const SecondaryText = styled.h1`
  color: ${(props) => props.theme.darkGray} !important;
  display: inline !important;
  font-weight: 300 !important;
  margin: 0 12px 0 0 !important;
  text-transform: none !important;
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
 * @param { string } path - which page uid this relates to
 *
 */

const SecondaryTitleBanner = ({ mainText, secondaryText, path }) => {
  return (
    <MainContent maxWidth="1000px">
      <Container>
        { path === 'grants' ? 
          <>
            <MainText>{mainText}{` `}</MainText>          
            <SecondaryText>
              {secondaryText}
            </SecondaryText>
            
          </> :
          <>
            <SecondaryText>
              {secondaryText}
              {` `}
            </SecondaryText>
            <MainText>{mainText}</MainText>
          </>
        }
        
      </Container>
    </MainContent>
  );
};

export default SecondaryTitleBanner;
