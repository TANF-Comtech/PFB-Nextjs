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



  dt {
    display: none;
  }

  label[for=cf-privacy-terms7104], 
  label[for=cf-general-consent1667] {
    display: inline;
  }

  input[type=text],
  input[type=email],
  select {
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
    border: none;
    display: block;
    font-family: ${props => props.theme.montserrat};
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 1vh;
    min-width: 300px;
    padding: 10px 16px;
    text-transform: capitalize;

    @media (min-width: ${props => props.theme.bm}) {
      font-size: calc(14px + 4 * ((100vw - 320px) / 880));
    }

    @media (min-width: ${props => props.theme.lg}) {
      font-size: 18px;
    }
  }

  select {
    width: 95%;
  }

  input[type=submit] {
    background-color: transparent; 
    border: 1px solid white;
    border-radius: 0px;
    color: white;
    cursor: pointer;
    display: inline-block;
    font-family: ${props => props.theme.montserrat};
    font-size: 14px;
    font-weight: 700;
    min-width: 200px;
    margin: 2vh 0 0 0;
    padding: 10px 35px;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    transform: translateY(0);
    transition: all 0.25s ease;
    
    &:hover {
      background-color: white;
      color: ${props => props.theme.black};
      text-decoration: none;
      transform: translateY(-2px);
    }

    @media (min-width: ${props => props.theme.bm}) {
      font-size: calc(14px + 4 * ((100vw - 320px) / 880));
      padding: 10px calc(35px + 15 * ((100vw - 320px) / 880));
    }

    @media (min-width: ${props => props.theme.lg}) {
      font-size: 18px;
      padding: 10px 60px;
    }
  }
`;

const WhiteButton = styled(InputButton)`
  margin-top: 2vh;
`;

function SignUpForm() {
  return (
    <>
      <FormContainer>
        <div id="wsd-root" class="spkactionform"></div>
        <script
          src="https://code.jquery.com/jquery-3.5.1.min.js"
          integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
          crossOrigin="anonymous"></script>
        <script src="https://action.peopleforbikes.org/assets/js/widget.js/?id=111276" async="" type="text/javascript"></script>
      </FormContainer>
      
    </>
  );
}

export default SignUpForm;
