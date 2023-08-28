import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import MainContent from '~/components/main-content';
import GridWide from '~/components/grid-wide';

const ImageContainer = styled.div`
  align-items: center !important;
  background-image: url(${(props) => props.path1X}) !important;
  background-position: center center !important;
  background-size: cover !important;
  display: flex !important;
  height: auto !important;
  justify-content: center !important;
  max-width: 100% !important;
  min-height: 30vh !important;
  transition: 0.2s ease !important;
  transform: translateY(0) !important;
`;

const Title = styled.h2`
  color: rgba(255, 255, 255, 0.9) !important;
  font-size: 50px !important;
  font-weight: 700 !important;
  line-height: 40px !important;
  padding: 2vh 2vw !important;
  text-decoration: none !important;
  text-align: center !important;
  text-transform: uppercase !important;

  @media screen and (min-width: 320px) {
    font-size: calc(50px + 50 * ((100vw - 320px) / 880)) !important;
    line-height: calc(40px + 50 * ((100vw - 320px) / 880)) !important;
  }
  @media screen and (min-width: 1200px) {
    font-size: 100px !important;
    line-height: 90px !important;
  }
`;

/**
 * <ImageTextOverlay>
 *
 * Presents a square image with some text on top of it
 *
 * @param { string } imageLink - Next path for the image square
 * @param { string } source1X - image source for the bg image
 * @param { string } source2X - image source for the bg image, twice as big
 * @param { string } title - text that goes on top
 */
const ImageTextOverlay = ({ imageLink, source1X, source2X, title }) => {
  return (
    <Link href={imageLink} passHref>
      <ImageContainer path1X={source1X} path2X={source2X}>
        <Title>{title}</Title>
      </ImageContainer>
    </Link>
  );
};

/**
 * <LocationsList>
 *
 * Provides locations landing page list content (all locations)
 *
 * @param { array } payload - list of locations from Prismic API
 */
const LocationsList = ({ payload }) => {
  return (
    <MainContent>
      <GridWide>
        {payload.map((location) => {
          return (
            <ImageTextOverlay
              imageLink={`/locations/${location.node._meta.uid}`}
              source1X={location.node.header_image?.main1x.url}
              source2X={location.node.header_image?.url}
              title={location.node.location[0].text}
              key={location.node._meta.id}
            />
          );
        })}
      </GridWide>
    </MainContent>
  );
};

export default LocationsList;
