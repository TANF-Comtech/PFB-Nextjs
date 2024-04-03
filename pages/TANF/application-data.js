import React, { useState } from 'react';
import { LegacyPage } from '~/components/legacy-page';
import Wrapper from '~/components/wrapper';
import Heading1 from '~/components/h1';
import Button from '~/components/button';
import MainContent from '~/components/main-content';
import styled from 'styled-components';
import { PieChart } from 'react-chartkick';
import 'chartkick/chart.js';

const CenteredContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin: 5% 0;
`;
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

export default function ApplicationData({}) {
  return (
    <LegacyPage>
      <Wrapper postTitle="Grants" isWide={true}>
        <MainContent maxWidth="1200px">
          <HeaderContainer>
            <Heading1>Grant Application Data</Heading1>
            <p>Below is data regarding the applications submitted for grants.</p>
          </HeaderContainer>
          <CenteredContainer>
            <PieChart
              data={[
                ['>$100,000', 44],
                ['$100,000 - $500,000', 23],
                ['$500,000 - $1M', 18],
                ['<$1M', 5],
              ]}
            />
          </CenteredContainer>
        </MainContent>
      </Wrapper>
    </LegacyPage>
  );
}
