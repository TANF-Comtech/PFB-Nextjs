import React, { useState } from 'react';
import { LegacyPage } from '~/components/legacy-page';
import Wrapper from '~/components/wrapper';
import Heading1 from '~/components/h1';
import Button from '~/components/button';
import MainContent from '~/components/main-content';
import styled from 'styled-components';

const CenteredContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

export default function index({}) {
  const downloadTemplate = () => {
    // Replace 'YOUR_GOOGLE_SHEETS_EXPORT_LINK' with the actual export link from Google Sheets
    const fileUrl =
      'https://docs.google.com/spreadsheets/d/1DJPCOO2M9xPax0ODqvkytqJXjj497cT5/edit?usp=sharing&ouid=118321811252013373912&rtpof=true&sd=true';

    // Create a link element
    const link = document.createElement('a');
    link.href = fileUrl; // Set the link to the Google Sheets export
    link.setAttribute('download', 'grant-template.xlsx'); // Set the file name
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Cleanup
    document.body.removeChild(link);
  };
  return (
    <LegacyPage>
      <Wrapper postTitle="Grants" isWide={true}>
        <MainContent maxWidth="1200px">
          <HeaderContainer>
            <Heading1>Apply For Grants!</Heading1>
            <p>
              You can choose to fill out the application form on our website by clicking{' '}
              <strong>Fill Out Application</strong>, or you may choose to download the provided
              excel template file and upload your application automatically by clicking{' '}
              <strong>Upload Your Application</strong>
            </p>
          </HeaderContainer>
          <CenteredContainer>
            <Button href={'/TANF/file-upload'}>Upload Your Application</Button>
            <Button href={'/TANF/application-form'}>Fill Out Application</Button>
          </CenteredContainer>
          <button onClick={downloadTemplate}>Download Template</button>
        </MainContent>
      </Wrapper>
    </LegacyPage>
  );
}
