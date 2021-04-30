import React, { useState, useEffect } from "react"
import styled from "styled-components"

const TextField = styled.input.attrs({
  type: 'text'
})`
  border: none;
  color: white;
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
`

const BasicTextField = ({ className, placeholder, onChange }) => {
  return(
    <TextField 
      className={ className }
      placeholder={ placeholder }
      onChange={ onChange }
    />
  )
}

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

const RedTextField = ({ className, placeholder, onChange }) => {
  return(
    <RedInput 
      className={ className }
      placeholder={ placeholder }
      onChange={ onChange }
    />
  )
}

export {BasicTextField, RedTextField}