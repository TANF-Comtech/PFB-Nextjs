import React, { useState } from 'react';
import { LegacyPage } from '~/components/legacy-page';
import Wrapper from '~/components/wrapper';
import MainContent from '~/components/main-content';
import styled from 'styled-components';
import { handleSubmit } from '../api/grant-application';
import Heading1 from '~/components/h1';

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const AppInput = styled.input`
  margin: 2% 0;
  width: 60vw;
`;

const FieldLabel = styled.label`
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 320px) {
    margin-bottom: 0 !important;
  }
`;

const PurposeTA = styled.textarea`
  width: 60vw;
`;

const SubmitBtn = styled.input`
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
  margin: 20px !important;
  padding: ${(props) => props.buttonPadding || '10px 35px'} !important;
  text-align: center !important;
  text-decoration: none !important;
  text-transform: ${(props) => props.buttonTextTransform || 'uppercase'} !important;
`;

export default function index({}) {
  const [applicationData, setApplicationData] = useState({
    org_name: null,
    org_address: null,
    org_city: null,
    org_state: null,
    org_zipcode: null,
    org_type: null,
    contact_name: null,
    contact_phone: null,
    contact_email: null,
    purpose: null,
    request_amount: null,
  });

  return (
    <LegacyPage>
      <Wrapper postTitle="Grants" isWide={true}>
        <MainContent maxWidth="1200px">
          <CenteredContainer>
            <HeaderContainer>
              <Heading1>Grant Application Form</Heading1>
              <p>
                In order to apply for a grant, fill out the following fields and submit when
                finished.
              </p>
            </HeaderContainer>
            <form
              onSubmit={(e) => {
                console.log('application data', applicationData);
                handleSubmit(e, applicationData);
              }}
            >
              <InputContainer>
                <FieldLabel for={'request_amount'}>Request Amount</FieldLabel>
                <AppInput
                  type={'number'}
                  placeholder={'Request Amount'}
                  id={'request_amount'}
                  required={true}
                  onChange={(e) =>
                    setApplicationData((prevState) => {
                      return {
                        ...prevState,
                        request_amount: e.target.value,
                      };
                    })
                  }
                />
              </InputContainer>
              <InputContainer>
                <FieldLabel for={'org_name'}>Organization Name</FieldLabel>
                <AppInput
                  type={'text'}
                  placeholder={'Organization Name'}
                  id={'org_name'}
                  required={true}
                  onChange={(e) =>
                    setApplicationData((prevState) => {
                      return {
                        ...prevState,
                        org_name: e.target.value,
                      };
                    })
                  }
                />
              </InputContainer>
              <InputContainer>
                <FieldLabel for={'org_address'}>Organization Address</FieldLabel>
                <AppInput
                  type={'text'}
                  placeholder={'Organization Address'}
                  id={'org_address'}
                  required={true}
                  onChange={(e) =>
                    setApplicationData((prevState) => {
                      return {
                        ...prevState,
                        org_address: e.target.value,
                      };
                    })
                  }
                />
              </InputContainer>
              <InputContainer>
                <FieldLabel for={'org_city'}>Organization City</FieldLabel>
                <AppInput
                  type={'text'}
                  placeholder={'Organization City'}
                  id={'org_city'}
                  required={true}
                  onChange={(e) =>
                    setApplicationData((prevState) => {
                      return {
                        ...prevState,
                        org_city: e.target.value,
                      };
                    })
                  }
                />
              </InputContainer>
              <InputContainer>
                <FieldLabel for={'org_state'}>Organization State</FieldLabel>
                <AppInput
                  type={'text'}
                  placeholder={'Organization State'}
                  id={'org_state'}
                  required={true}
                  onChange={(e) =>
                    setApplicationData((prevState) => {
                      return {
                        ...prevState,
                        org_state: e.target.value,
                      };
                    })
                  }
                />
              </InputContainer>
              <InputContainer>
                <FieldLabel for={'org_zipcode'}>Organization Zipcode</FieldLabel>
                <AppInput
                  type={'text'}
                  placeholder={'Organization Zipcode'}
                  id={'org_zipcode'}
                  required={true}
                  onChange={(e) =>
                    setApplicationData((prevState) => {
                      return {
                        ...prevState,
                        org_zipcode: e.target.value,
                      };
                    })
                  }
                />
              </InputContainer>
              <InputContainer>
                <FieldLabel for={'org_type'}>Organization Type</FieldLabel>
                <AppInput
                  type={'text'}
                  placeholder={'Organization Type'}
                  id={'org_type'}
                  required={true}
                  onChange={(e) =>
                    setApplicationData((prevState) => {
                      return {
                        ...prevState,
                        org_type: e.target.value,
                      };
                    })
                  }
                />
              </InputContainer>
              <InputContainer>
                <FieldLabel for={'contact_name'}>Contact Name</FieldLabel>
                <AppInput
                  type={'text'}
                  placeholder={'Contact Name'}
                  id={'contact_name'}
                  required={true}
                  onChange={(e) =>
                    setApplicationData((prevState) => {
                      return {
                        ...prevState,
                        contact_name: e.target.value,
                      };
                    })
                  }
                />
              </InputContainer>
              <InputContainer>
                <FieldLabel for={'contact_phone'}>Contact Phone</FieldLabel>
                <AppInput
                  type={'tel'}
                  placeholder={'Contact Phone'}
                  id={'contact_phone'}
                  required={true}
                  onChange={(e) =>
                    setApplicationData((prevState) => {
                      return {
                        ...prevState,
                        contact_phone: e.target.value,
                      };
                    })
                  }
                />
              </InputContainer>
              <InputContainer>
                <FieldLabel for={'contact_email'}>Contact Email</FieldLabel>
                <AppInput
                  type={'email'}
                  placeholder={'Contact Email'}
                  id={'contact_email'}
                  required={true}
                  onChange={(e) =>
                    setApplicationData((prevState) => {
                      return {
                        ...prevState,
                        contact_email: e.target.value,
                      };
                    })
                  }
                />
              </InputContainer>
              <InputContainer>
                <FieldLabel for={'purpose'}>Purpose</FieldLabel>
                <PurposeTA
                  type={'text'}
                  placeholder={'Purpose'}
                  id={'purpose'}
                  style={{ height: '20vh' }}
                  required={true}
                  onChange={(e) =>
                    setApplicationData((prevState) => {
                      return {
                        ...prevState,
                        purpose: e.target.value,
                      };
                    })
                  }
                />
              </InputContainer>
              <CenteredContainer>
                <SubmitBtn
                  type="submit"
                  value="Submit Application"
                  onClick={(e) => handleSubmit(e, jsonData)}
                />
              </CenteredContainer>
            </form>
          </CenteredContainer>
        </MainContent>
      </Wrapper>
    </LegacyPage>
  );
}
