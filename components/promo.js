import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { linkResolver } from '~/utils';

import BgImage from '~/components/bg-image';

import PromoFallback from '~/public/promo/promo-momentum.jpg';
import WhiteArrow from '~/public/white-arrow.svg';

const Container = styled.section`
  a,
  a:visited,
  a:focus,
  a:hover,
  a:active {
    text-decoration: none !important;
  }
`;

const PromoTextContainer = styled.div`
  align-items: center !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  height: 50vh !important;
  margin-bottom: 25px !important;
  padding: 0 5vw !important;
  text-align: center !important;
  width: 100vw !important;

  @media screen and (min-width: ${(props) => props.theme.sm}) {
    height: 70vh !important;
  }

  h1 {
    color: rgba(${(props) => (props.headingRGBA ? props.headingRGBA : '255,255,255,1')}) !important;
    text-transform: uppercase !important;
  }

  span {
    color: rgba(${(props) => (props.headingRGBA ? props.headingRGBA : '255,255,255,1')}) !important;
    font-family: ${(props) => props.theme.dharma} !important;
    font-size: 40px !important;
    font-weight: 600 !important;
    line-height: 40px !important;
    letter-spacing: 1px !important;
    margin: 0 !important;
    text-transform: uppercase !important;
  }
  @media screen and (min-width: 320px) {
    span {
      font-size: calc(40px + 20 * ((100vw - 320px) / 880)) !important;
      line-height: calc(40px + 20 * ((100vw - 320px) / 880)) !important;
    }
  }
  @media screen and (min-width: 1200px) {
    span {
      font-size: 60px !important;
      line-height: 60px !important;
    }
  }
`;

const Arrow = styled.img`
  display: block !important;
  margin: 10px auto !important;
  width: 46px !important;
`;

/**
 * <Promo>
 *
 * Promo is just like a HeaderImage component, except it links to page
 *
 * @param { string } bigWords - large lettering in promo
 * @param { string } headingRGBA - color of text, can provide transparency
 * @param { string } path - where the promo will go around the site (default: homepage)
 * @param { string } smallWords - small lettering in promo
 * @param { string } source - single image to display as a banner/hero (default: PromoFallback)
 */
const Promo = ({
  bigWords = 'See How Our Work',
  headingRGBA,
  path = 'https://www.peopleforbikes.org',
  smallWords = 'Creates Momentum',
  source = PromoFallback,
}) => {
  return (
    <Container>
      {path ? (
        <>
          {path.__typename === '_ExternalLink' ? (
            <a href={linkResolver(path)}>
              <BgImage imgsrc={source}>
                <PromoTextContainer headingRGBA={headingRGBA}>
                  <span>{smallWords}</span>
                  <h1>{bigWords}</h1>
                  <Arrow src={WhiteArrow} />
                </PromoTextContainer>
              </BgImage>
            </a>
          ) : (
            <Link href={linkResolver(path)} passHref>
              <a>
                <BgImage imgsrc={source}>
                  <PromoTextContainer headingRGBA={headingRGBA}>
                    <span>{smallWords}</span>
                    <h1>{bigWords}</h1>
                    <Arrow src={WhiteArrow} />
                  </PromoTextContainer>
                </BgImage>
              </a>
            </Link>
          )}
        </>
      ) : (
        <BgImage imgsrc={source}>
          <PromoTextContainer headingRGBA={headingRGBA}>
            <span>{smallWords}</span>
            <h1>{bigWords}</h1>
            <Arrow src={WhiteArrow} />
          </PromoTextContainer>
        </BgImage>
      )}
    </Container>
  );
};

export default Promo;
