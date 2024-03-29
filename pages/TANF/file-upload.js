import React, { useState } from 'react';
import { LegacyPage } from '~/components/legacy-page';
import Wrapper from '~/components/wrapper';
import Button from '~/components/button';
import MainContent from '~/components/main-content';
import styled from 'styled-components';
import * as XLSX from 'xlsx';

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export default function FileUpload({}) {
  const [jsonData, setJsonData] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryString = event.target.result;
      const workbook = XLSX.read(binaryString, { type: 'binary' });
      const sheetName = workbook.SheetNames[0]; // Assuming the first sheet is what you need
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 2 });
      console.log('data ', data);

      setJsonData(data);
    };

    reader.readAsBinaryString(file);
  };

  const UploadLabel = styled.label`
    border: 1px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
    background-color: #f8f8f8;
    color: #333;
    border-radius: 4px;
  `;

  const FileInput = styled.input.attrs({
    type: 'file',
  })`
    display: none;
  `;

  const SubmitBtn = styled.div`
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://localhost:8080/api/grant_applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });

      if (response.ok) {
        console.log('Data submitted successfully');
        // You may redirect the user or show a success message here
      } else {
        console.error('Failed to submit data');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <LegacyPage>
      <Wrapper postTitle="Grants" isWide={true}>
        <MainContent maxWidth="1200px">
          <CenteredContainer>
            <UploadLabel>
              Upload File
              <FileInput type="file" onChange={handleFileUpload} />
            </UploadLabel>
          </CenteredContainer>
          <CenteredContainer>
            <SubmitBtn type="submit" onClick={handleSubmit}>
              Submit
            </SubmitBtn>
          </CenteredContainer>
        </MainContent>
      </Wrapper>
    </LegacyPage>
  );
}
