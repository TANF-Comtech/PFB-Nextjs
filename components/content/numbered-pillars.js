import React from 'react'
import styled from 'styled-components';
import numWords from 'num-words';

import MainContent from '../global/main-content';
import WayfindingItem from '../slices/wayfinding-item';

const DeepBlue = styled.section`
  background-color: ${(props) => props.theme.midnightBlue};
  color: #fff;
  margin-bottom: 2vh;
  padding: 4vh 0;
`;

const SectionTitle = styled.h2`
  color: #fff;
  margin-bottom: 4vh;
`;

const Title = styled.h3`
  color: ${(props) => props.theme.blueBright};
  font-family: ${(props) => props.theme.dharma};
  font-size: 40px;
  font-weight: 300px;
  line-height: 40px;
  margin-bottom: 0;
  text-transform: uppercase;

  @media screen and (min-width: 320px) {
    font-size: calc(40x + 20 * ((100vw - 320px) / 880));
    line-height: calc(40px + 20 * ((100vw - 320px) / 880));
  }
  @media screen and (min-width: 1200px) {
    font-size: 50px;
    line-height: 50px;
  }

  span {
    color: white;
    font-size: 40px;

    @media screen and (min-width: 320px) {
      font-size: calc(40x + 20 * ((100vw - 320px) / 880));
      line-height: calc(40px + 20 * ((100vw - 320px) / 880));
    }
    @media screen and (min-width: 1200px) {
      font-size: 50px;
      line-height: 50px;
    }
  }
`;

const Text = styled.p`
  color: white;
  margin-bottom: 0;
`;

const Item = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.lightGray};
  margin-bottom: 2vh;
  padding-bottom: 2vh;

  &:last-child {
    border-bottom: none;
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
