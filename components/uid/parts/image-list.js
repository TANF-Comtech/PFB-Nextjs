import React from 'react';
import styled from 'styled-components';
import { RichText } from 'prismic-reactjs';

import { randomID } from '~/utils';

import MainContent from '~/components/main-content';
import Rule from '~/components/rule';

const TileImage = styled.img`
  height: auto;
  margin: 15px auto;
  max-width: 100%;

  @media (min-width: ${(props) => props.theme.sm}) {
    margin: 5px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  @media (min-width: ${(props) => props.theme.sm}) {
    text-align: left;
    margin-left: 2vw;
  }
`;

const Title = styled.h3`
  color: ${(props) => props.theme.blue};
  font-size: 24px;
  font-weight: 700;
  line-height: 1.2;
  margin: 20px 0;
  text-align: center;
  text-transform: uppercase;

  @media (min-width: ${(props) => props.theme.sm}) {
    text-align: left;
  }
`;

const Grid = styled.section`
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 1fr;
  margin: 0 4vw;

  @media (min-width: ${(props) => props.theme.sm}) {
    grid-template-columns: 1fr 2fr;
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
                  <RichText render={item.description} />
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
