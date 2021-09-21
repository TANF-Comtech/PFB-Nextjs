import React from "react"
import styled from "styled-components"

const TextField = styled.input.attrs({
  type: 'text'
})`
  border: none;
  color: white;
  display: block;
  font-family: ${ props => props.theme.montserrat };
  font-size: 14px;
  font-weight: 700;
  margin-bottom: ${ props => props.marginBottom ? props.marginBottom : '1vh' };
  min-width: ${ props => props.minWidth ? props.minWidth : '300px' };
  padding: 10px 16px;

  @media (min-width: ${props => props.theme.bm}) {
    font-size: calc(14px + 4 * ((100vw - 320px) / 880));
  }

  @media (min-width: ${props => props.theme.lg}) {
    font-size: 18px;
  }
`

const BasicTextField = ({ 
  className, 
  marginBottom,
  minWidth,
  placeholder, 
  onChange 
}) => {
  return(
    <TextField 
      className={ className }
      marginBottom={ marginBottom }
      minWidth={ minWidth }
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

const RedTextField = ({ 
  className, 
  marginBottom,
  placeholder, 
  onChange 
}) => {
  return(
    <RedInput 
      className={ className }
      marginBottom={ marginBottom }
      placeholder={ placeholder }
      onChange={ onChange }
    />
  )
}

export {BasicTextField, RedTextField}