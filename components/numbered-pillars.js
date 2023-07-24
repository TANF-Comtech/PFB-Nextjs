import React from 'react';
import styled from 'styled-components';
import numWords from 'num-words';

import MainContent from '~/components/main-content';
import WayfindingItem from '~/components/wayfinding-item';

const DeepBlue = styled.section`
  background-color: ${(props) => props.theme.midnightBlue} !important;
  color: #fff !important;
  margin-bottom: 2vh !important;
  padding: 4vh 0 !important;
`;

const SectionTitle = styled.h2`
  color: #fff !important;
  margin-bottom: 4vh !important;
`;

const Title = styled.h3`
  color: ${(props) => props.theme.blueBright} !important;
  font-family: ${(props) => props.theme.dharma} !important;
  font-size: 40px !important;
  font-weight: 300px !important;
  line-height: 40px !important;
  margin-bottom: 0 !important;
  text-transform: uppercase !important;

  @media screen and (min-width: 320px) {
    font-size: calc(40x + 20 * ((100vw - 320px) / 880)) !important;
    line-height: calc(40px + 20 * ((100vw - 320px) / 880)) !important;
  }
  @media screen and (min-width: 1200px) {
    font-size: 50px !important;
    line-height: 50px !important;
  }

  span {
    color: white !important;
    font-size: 40px !important;

    @media screen and (min-width: 320px) {
      font-size: calc(40x + 20 * ((100vw - 320px) / 880)) !important;
      line-height: calc(40px + 20 * ((100vw - 320px) / 880)) !important;
    }
    @media screen and (min-width: 1200px) {
      font-size: 50px !important;
      line-height: 50px !important;
    }
  }
`;

const Text = styled.p`
  color: white !important;
  margin-bottom: 0 !important;
`;

const Item = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.lightGray} !important;
  margin-bottom: 2vh !important;
  padding-bottom: 2vh !important;

  &:last-child {
    border-bottom: none !important;
  }
`;

/**
 * <NumberedPillars>
 *
 * This creates the container for NumberedPillars
 *
 * @param { bool } numbersWanted - indication if lettered numbers are printed
 * @param { array } payload - array of the mission pillars
 * @param { array } title - what to display over the section
 */
const NumberedPillars = ({ numbersWanted = true, payload, title }) => {
  return (
    <>
      <DeepBlue>
        <MainContent>
          {title && <SectionTitle>{title}</SectionTitle>}
          {payload.map((item, i) => {
            return (
              <Item key={i}>
                <Title>
                  {numbersWanted === true && <span>{numWords(i + 1)}&nbsp;</span>}
                  {item.pillar_title}
                </Title>
                <Text>{item.pillar_content}</Text>
              </Item>
            );
          })}
        </MainContent>
      </DeepBlue>
    </>
  );
};

export default NumberedPillars;
