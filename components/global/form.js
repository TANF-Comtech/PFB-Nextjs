import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import BasicTextField from "../primitives/text";
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

const RedInput = styled(BasicTextField)`
  background-color: ${(props) => props.theme.redAccent};
  color: white;

  /* Changing placeholder text remain surreal, even in 2020 */
  ::-webkit-input-placeholder {
    color: white;
  }
  ::-moz-placeholder {
    color: white;
  }
  ::-ms-input-placeholder {
    color: white;
  }
  ::placeholder {
    color: white;
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
        <RedInput
          id="newsletter-name"
          name="name"
          placeholder="Name"
          ref={signup}
        />
        <RedInput
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
