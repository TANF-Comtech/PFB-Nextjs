import React, { useState } from 'react';
import { LegacyPage } from '~/components/legacy-page';
import Wrapper from '~/components/wrapper';
import Heading1 from '~/components/h1';
import Button from '~/components/button';
import MainContent from '~/components/main-content';
import styled from 'styled-components';
import * as XLSX from 'xlsx';

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

const TemplateBtn = styled.div`
  background-color: ${(props) => props.buttonBg || 'rgba(255,255,255,1)'} !important;
  border: ${(props) => props.buttonBorder || `1px solid ${props.theme.black}`} !important;
  border-radius: 10px !important;
  box-shadow: ${(props) => props.theme.buttonBoxShadow} !important;
  color: ${(props) => props.buttonColor || props.theme.black} !important;
  cursor: pointer !important;
  font-family: ${(props) => props.theme.montserrat} !important;
  font-size: ${(props) => props.buttonFontSize || '18px'} !important;
  font-weight: 700 !important;
  min-width: 100px !important;
  margin: 0 !important;
  padding: ${(props) => props.buttonPadding || '10px 35px'} !important;
  text-align: center !important;
  text-decoration: none !important;
  text-transform: ${(props) => props.buttonTextTransform || 'uppercase'} !important;
`;

export default function index({}) {
  const downloadExcelTemplate = () => {
    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Create a worksheet
    const ws = XLSX.utils.aoa_to_sheet([
      // This array represents the first row of your Excel template
      [
        'Org Name',
        'Contact Name',
        'Category',
        'Email',
        'Address',
        'City',
        'State',
        'Phone',
        'Purpose',
        'Request Amount',
        'Date',
      ],
    ]);

    // Make the first row bold
    const boldCellStyle = { font: { bold: true } };
    for (let i = 0; i < 11; i++) {
      // 11 is the number of columns in the first row
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: i });
      ws[cellAddress].s = boldCellStyle;
    }

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Generate a binary string from the workbook
    const wbout = XLSX.write(wb, { type: 'binary', bookType: 'xlsx' });

    // Convert the binary string to a Blob
    const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });

    // Create a link element
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);

    // Set the download attribute to force download
    link.setAttribute('download', 'grant_application_template.xlsx');

    // Append the link to the body
    document.body.appendChild(link);

    // Trigger the click event to start download
    link.click();

    // Clean up
    document.body.removeChild(link);
  };
  // Convert a string to an ArrayBuffer
  const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
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
          <CenteredContainer>
            <TemplateBtn onClick={downloadExcelTemplate}>Download Template</TemplateBtn>
          </CenteredContainer>
        </MainContent>
      </Wrapper>
    </LegacyPage>
  );
}
