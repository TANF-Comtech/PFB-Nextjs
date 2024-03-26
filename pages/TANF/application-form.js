import React, { useState } from 'react';
import { LegacyPage } from '~/components/legacy-page';
import Wrapper from '~/components/wrapper';
import Button from '~/components/button';
import MainContent from '~/components/main-content';
import styled from 'styled-components';

const CenteredContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

export default function index({}) {
  return (
    <LegacyPage>
      <Wrapper postTitle="Grants" isWide={true}>
        <MainContent maxWidth="1200px">
          <CenteredContainer>
            <input type="file" onChange={handleFileUpload} />
            <Button href={'/'}>Fill Out Application</Button>
          </CenteredContainer>
        </MainContent>
      </Wrapper>
    </LegacyPage>
  );
}
