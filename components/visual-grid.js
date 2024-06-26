import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { linkResolver } from '~/utils';

import MainContent from '~/components/main-content';
import GridWide from '~/components/grid-wide';
import Button from '~/components/button';

const Box = styled.div`
  align-items: center !important;
  background-color: #fff !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  padding: 50px 25px !important;
`;

const GridImage = styled.img`
  max-width: 250px !important;
`;

const SectionTitle = styled.h3`
  font-size: 28px !important;
  font-weight: 300 !important;
  line-height: 38px !important;
  margin: 6vh auto !important;
  text-align: center !important;
`;

const Para = styled.p`
  margin: 4vh auto !important;
`;

/**
 * <VisualGrid>
 *
 * Component that takes visuals + text and puts them into a grid

 * @param { bool } isOneItem - if grid only has one item, this centers it
 * @param { array } payload - group of the img/text combos
 * @param { string } title - visual grid heading
 *
 */
const VisualGrid = ({ isOneItem = false, payload, title }) => {
  const themeProps = useContext(ThemeContext);

  return (
    <MainContent maxWidth="800px">
      {title && <SectionTitle>{title}</SectionTitle>}
      {payload && (
        <GridWide
          gridGap={isOneItem === true ? '0' : '1px'}
          gridGapColor="rgb(225,225,225)"
          isOneItem={isOneItem}
        >
          {payload.map((item) => {
            return (
              // @TODO add valid key prop from payload
              // eslint-disable-next-line react/jsx-key
              <Box>
                {item.graphic && <GridImage alt={item.graphic.alt} src={item.graphic.url} />}
                {item.button_link && (
                  <Button
                    buttonAlign="center"
                    buttonBg={themeProps.darkGray}
                    buttonBorder="none"
                    buttonColor="#fff"
                    buttonFontSize="14px"
                    buttonMargin="3vh"
                    href={linkResolver(item.button_link)}
                  >
                    {item.button_text ? item.button_text : 'View'}
                  </Button>
                )}
                {item.label && <Para>{item.label}</Para>}
              </Box>
            );
          })}
          {evenOrOdd(payload.length) === 'odd' && <Box />}
        </GridWide>
      )}
    </MainContent>
  );
};

export default VisualGrid;

function evenOrOdd(x) {
  return x & 1 ? 'odd' : 'even';
}
