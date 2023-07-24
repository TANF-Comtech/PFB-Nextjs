import React from 'react';
import styled from 'styled-components';
import Flickity from 'react-flickity-component';

import { linkResolver } from '~/utils';

import WhiteArrow from '~/public/white-arrow.svg';

const Slide = styled.section`
  align-items: center !important;
  background-image: url(${(props) => props.source}) !important;
  background-position: center center !important;
  background-size: cover !important;
  display: flex !important;
  flex-direction: column !important;
  height: 40vh !important;
  max-height: 600px !important;
  justify-content: center !important;
  margin: 0 200px !important;
  padding: 25px !important;
  width: 100vw !important;

  @media screen and (min-width: 480px) {
    height: 80vw !important;
  }
  @media screen and (min-width: 768px) {
    height: 60vw !important;
  }
  @media screen and (min-width: 1000px) {
    height: 40vw !important;
  }
  h2 {
    color: rgba(${(props) => (props.headingRGBA ? props.headingRGBA : '255,255,255,1')}) !important;
    font-size: 60px !important;
    font-weight: 600 !important;
    line-height: 50px !important;
    padding-bottom: 10px !important;
    text-align: center !important;
    text-transform: uppercase !important;
  }
  @media screen and (min-width: 320px) {
    h2 {
      font-size: calc(60px + 60 * ((100vw - 320px) / 880)) !important;
      line-height: calc(50px + 60 * ((100vw - 320px) / 880)) !important;
    }
  }
  @media screen and (min-width: 1200px) {
    h2 {
      font-size: 120px !important;
      line-height: 110px !important;
    }
  }
  span {
    color: rgba(${(props) => (props.headingRGBA ? props.headingRGBA : '255,255,255,1')}) !important;
    font-family: ${(props) => props.theme.dharma} !important;
    font-size: 30px !important;
    font-weight: 600 !important;
    line-height: 25px !important;
    letter-spacing: 1px !important;
    padding-bottom: 3px !important;
    margin: 0 !important;
    text-align: center !important;
    text-transform: uppercase !important;
  }
  @media screen and (min-width: 320px) {
    span {
      font-size: calc(30px + 30 * ((100vw - 320px) / 880)) !important;
      line-height: calc(25px + 25 * ((100vw - 320px) / 880)) !important;
    }
  }
  @media screen and (min-width: 1200px) {
    span {
      font-size: 60px !important;
      line-height: 50px !important;
    }
  }
`;

const SlideWrapper = styled.a`
  margin: 0 46px !important;
  text-align: center !important;
  text-decoration: none !important;
  &:hover,
  &:visited,
  &:focus {
    text-decoration: none !important;
  }
  @media screen and (max-width: 350px) {
    margin: 0 !important;
  }
`;

const Arrow = styled.img`
  display: block !important;
  margin: 0 auto !important;
  width: 46px !important;
`;

const Wrapper = styled.div`
  margin-left: 5.5vw !important;
  margin-right: 5.5vw !important;
`;

const BigText = styled.h2`
  padding: 0 4vw !important;
  font-size: 50px !important;
  line-height: 0.9 !important;
  margin-bottom: 0 !important;

  @media screen and (min-width: ${(props) => props.theme.xs}) {
    font-size: 80px !important;
  }

  @media screen and (min-width: ${(props) => props.theme.md}) {
    font-size: 100px !important;
  }
`;

const SmallText = styled.span`
  @media screen and (max-width: 480px) {
    font-size: 28px !important;
  }
`;

/**
 * <Carousel>
 *
 * Creates a flickity-based carousel, across site
 *
 * @param { array } payload - list of elements from a campaign typically
 */

const Carousel = ({ payload }) => {
  // Figure out the carousel index
  const slideIndex = Math.floor(payload.length / 2);
  const flickityOptions = {
    initialIndex: slideIndex,
    wrapAround: true,
    pageDots: false,
  };

  return (
    <Wrapper>
      <Flickity options={flickityOptions} static={true}>
        {payload.map((c) => {
          return (
            <Slide key={c.campaign._meta.id} source={c.campaign.banner_image.url}>
              <SlideWrapper
                href={linkResolver(c.campaign.link, true)}
                rel="noopener"
                target="_blank"
              >
                {c.campaign.small_text && <SmallText>{c.campaign.small_text}</SmallText>}
                {c.campaign.big_text && <BigText>{c.campaign.big_text}</BigText>}
                <Arrow src={WhiteArrow} />
              </SlideWrapper>
            </Slide>
          );
        })}
      </Flickity>
    </Wrapper>
  );
};

export default Carousel;
