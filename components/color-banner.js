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
    text-decoration: none;
  }
`;

const ColorContainer = styled.section`
  align-items: center;
  background-color: ${(props) => props.bgColor || props.theme.redAccent};
  background-position: center center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2vh 5vw;
  text-align: center;

  h1 {
    color: white;
    margin-bottom: 10px;
  }

  span {
    color: white;
    display: block;
    font-family: ${(props) => props.theme.montserrat};
    font-size: 24px;
    font-weight: 300;
    line-height: 30px;
    margin-bottom: 25px;
  }
  @media screen and (min-width: 320px) {
    span {
      font-size: calc(24px + 4 * ((100vw - 320px) / 880));
      line-height: calc(30px + 8 * ((100vw - 320px) / 880));
    }
  }
  @media screen and (min-width: 1200px) {
    span {
      font-size: 28px;
      line-height: 38px;
    }
  }
`;

const Arrow = styled.img`
  display: block;
  margin: 0 auto;
  width: 46px;
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
            <h1 className="!no-underline">{bannerTitle}</h1>
            <span>{bannerContent}</span>
            <Arrow src={RedArrowWhiteBlock} />
          </MainContent>
        </ColorContainer>
      </a>
    </Container>
  );
};

export default ColorBanner;
