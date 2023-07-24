import React from 'react';
import styled from 'styled-components';
import { PrismicRichText } from '@prismicio/react';

import { randomID } from '~/utils';

import MainContent from '~/components/main-content';
import Rule from '~/components/rule';

const TileImage = styled.img`
  height: auto !important;
  margin: 15px auto !important;
  max-width: 100% !important;

  @media (min-width: ${(props) => props.theme.sm}) {
    margin: 5px !important;
  }
`;

const Container = styled.div`
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  text-align: center !important;

  @media (min-width: ${(props) => props.theme.sm}) {
    text-align: left !important;
    margin-left: 2vw !important;
  }
`;

const Title = styled.h3`
  color: ${(props) => props.theme.blue} !important;
  font-size: 24px !important;
  font-weight: 700 !important;
  line-height: 1.2 !important;
  margin: 20px 0 !important;
  text-align: center !important;
  text-transform: uppercase !important;

  @media (min-width: ${(props) => props.theme.sm}) {
    text-align: left !important;
  }
`;

const Grid = styled.section`
  display: grid !important;
  grid-gap: 15px !important;
  grid-template-columns: 1fr !important;
  margin: 0 4vw !important;

  @media (min-width: ${(props) => props.theme.sm}) {
    grid-template-columns: 1fr 2fr !important;
  }
`;

/**
 * <ImageList>
 *
 * A component that has a square image on the left, text on the right
 * On mobile they stack
 *
 * @param { array } payload - data block image list items
 *
 * @returns { object } - full list of image/text blocks
 */
export default function ImageList({ payload = [] }) {
  return (
    <>
      <MainContent>
        {payload.map((item, i) => {
          return (
            <>
              <Grid key={randomID(1000000)}>
                <TileImage alt={item.square_image?.alt} src={item.square_image?.url} />
                <Container>
                  <Title>{item.item_title}</Title>
                  <PrismicRichText field={item.description} />
                </Container>
              </Grid>
              {i < payload.length - 1 && <Rule key={randomID(34093849018)} padding="4vh 4vw" />}
            </>
          );
        })}
      </MainContent>
    </>
  );
}
