import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import MainContent from '~/components/main-content';
import GridWide from '~/components/grid-wide';

const ImageContainer = styled.div`
  align-items: center;
  background-image: url(${(props) => props.path1X});
  background-position: center center;
  background-size: cover;
  display: flex;
  height: auto;
  justify-content: center;
  max-width: 100%;
  min-height: 30vh;
  transition: 0.2s ease;
  transform: translateY(0);
`;

const Title = styled.h2`
  color: rgba(255, 255, 255, 0.9);
  font-size: 50px;
  font-weight: 700;
  line-height: 40px;
  padding: 2vh 2vw;
  text-decoration: none !important;
  text-align: center;
  text-transform: uppercase;

  @media screen and (min-width: 320px) {
    font-size: calc(50px + 50 * ((100vw - 320px) / 880));
    line-height: calc(40px + 50 * ((100vw - 320px) / 880));
  }
  @media screen and (min-width: 1200px) {
    font-size: 100px;
    line-height: 90px;
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
      <a>
        <ImageContainer path1X={source1X} path2X={source2X}>
          <Title>{title}</Title>
        </ImageContainer>
      </a>
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
