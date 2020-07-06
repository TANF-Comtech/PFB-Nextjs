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
  text-transform: uppercase;

  @media (min-width: ${props => props.theme.bm}) {
    font-size: calc(14px + 4 * ((100vw - 320px) / 880));
  }

  @media (min-width: ${props => props.theme.lg}) {
    font-size: 18px;
  }
`

const BasicTextField = ({ className, placeholder }) => {
  return(
    <TextField 
      className={ className }
      placeholder={ placeholder }
    />
  )
}

export default BasicTextField