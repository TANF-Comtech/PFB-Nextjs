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

  console.log('Json Data ', jsonData);

  return (
    <LegacyPage>
      <Wrapper postTitle="Grants" isWide={true}>
        <MainContent maxWidth="1200px">
          <CenteredContainer>
            <input type="file" onChange={handleFileUpload} />
          </CenteredContainer>
        </MainContent>
      </Wrapper>
    </LegacyPage>
  );
}
