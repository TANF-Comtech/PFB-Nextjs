import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import {RedTextField} from "../primitives/text";
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
  const { signup, handleSubmit } = useForm();

  const onSignupSubmit = (data) => console.log(data); // no real processing yet

  return (
    <>
      <FormContainer onSubmit={handleSubmit(onSignupSubmit)}>
        <RedTextField
          id="newsletter-name"
          name="name"
          placeholder="Name"
          ref={signup}
        />
        <RedTextField
          id="newsletter-email"
          name="email"
          placeholder="Email"
          ref={signup}
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
