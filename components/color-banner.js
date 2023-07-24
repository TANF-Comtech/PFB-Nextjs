import React from 'react';
import styled from 'styled-components';

import MainContent from '~/components/main-content';

import RedArrowWhiteBlock from '~/public/red-arrow-white-block.svg';

const Container = styled.section`
  a,
  a:visited,
  a:focus,
  a:hover,
  a:active {
    text-decoration: none !important;
  }
`;

const ColorContainer = styled.section`
  align-items: center !important;
  background-color: ${(props) => props.bgColor || props.theme.redAccent} !important;
  background-position: center center !important;
  background-size: cover !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  padding: 2vh 5vw !important;
  text-align: center !important;

  h1 {
    color: white !important;
    margin-bottom: 10px !important;
  }

  span {
    color: white !important;
    display: block !important;
    font-family: ${(props) => props.theme.montserrat} !important;
    font-size: 24px !important;
    font-weight: 300 !important;
    line-height: 30px !important;
    margin-bottom: 25px !important;
  }
  @media screen and (min-width: 320px) {
    span {
      font-size: calc(24px + 4 * ((100vw - 320px) / 880)) !important;
      line-height: calc(30px + 8 * ((100vw - 320px) / 880)) !important;
    }
  }
  @media screen and (min-width: 1200px) {
    span {
      font-size: 28px !important;
      line-height: 38px !important;
    }
  }
`;

const Arrow = styled.img`
  display: block !important;
  margin: 0 auto !important;
  width: 46px !important;
`;

/**
 * <ColorBanner>
 *
 * ColorBanner is the global donation promo well that shows up all over the place.
 * It's super simple - just a big color banner off site.
 *
 * @param { string } bannerContent -  main content
 * @param { string } bannerTitle - title
 * @param { string } bgColor - color of background, should be dark
 *
 */
const ColorBanner = ({
  bannerContent = 'Bring Better Biking to Your Community',
  bannerTitle = 'Donate Now',
  bgColor,
}) => {
  return (
    <Container>
      <a href="https://www.classy.org/give/117371" rel="nofollow" target="_blank">
        <ColorContainer bgColor={bgColor}>
          <MainContent maxWidth="800px">
            <h1 className="!no-underline" style={{ textDecoration: 'none !important' }}>
              {bannerTitle}
            </h1>
            <span className="!no-underline" style={{ textDecoration: 'none !important' }}>
              {bannerContent}
            </span>
            <Arrow src={RedArrowWhiteBlock} />
          </MainContent>
        </ColorContainer>
      </a>
    </Container>
  );
};

export default ColorBanner;
