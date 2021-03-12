import React from "react";
import styled from "styled-components";

import { RedTextField } from "../primitives/text";
import InputButton from "../primitives/input-button";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin: 2vh 0;
  padding: 0;

  @media (min-width: ${(props) => props.theme.lg}) {
    padding: 0;
  }
`;

const WhiteButton = styled(InputButton)`
  margin-top: 2vh;
`;

function SignUpForm() {
  return (
    <>
      <FormContainer>
        <RedTextField
          id="newsletter-name"
          name="name"
          placeholder="Name"
        />
        <RedTextField
          id="newsletter-email"
          name="email"
          placeholder="Email"
        />
        <WhiteButton
          buttonBg="rgba(255,255,255,0)"
          buttonBgHover="rgba(255,255,255,1)"
          buttonBorder="1px solid white"
          buttonColor="white"
          buttonColorHover="#404040"
          buttonText="Submit"
          name="submit"
        />
      </FormContainer>
    </>
  );
}

export default SignUpForm;
