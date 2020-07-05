import React, { useState, useEffect } from "react"
import styled from "styled-components"

import BasicInput from './input'

const Container = styled.div`
  align-items: center;
  display: flex;
  margin: 1.5vh 0;
`

const CheckboxInput = styled(BasicInput).attrs({
  type: 'checkbox'
})`
  display: inline;
`

const CheckboxLabel = styled.label`
  cursor: pointer;
  font-size: 14px;
  line-height: 21px;
  margin-left: 8px;

  @media (min-width: ${props => props.theme.bm}) {
    font-size: calc(14px + 4 * ((100vw - 320px) / 880));
  }

  @media (min-width: ${props => props.theme.lg}) {
    font-size: 18px;
  }
`

/**
 * <CheckboxSwitch>
 * 
 * A checkbox component for forms that can appear like a checkbox or switch
 * A container holds the <input> and <label> together in a flexbox for alignment
 * There is a LOT of style and pseudo classes required to pull this off above
 * Comments are mostly in the styled-components above
 * 
 * @param {string} checkboxLabel - words that appear next to the input
 * @param {string} checked - value for the input
 * @param {string} className - should just be 'switch' if you want to see a switch
 * @param {string} disabled - makes the input visible but invalid
 */
const CheckboxSwitch = ({ 
  checkboxLabel, 
  checked, 
  className, 
  disabled 
}) => {

  // Assigns a random identifier to each input/label pair
  const randomID = Math.round(Math.random() * 10000000)

  // Check to make sure this is rendered
  const [rendered, setRendered] = useState(false);

  // useEffect() is similar to componentDidMount
  // so when the component gets mounted, we set it true
  useEffect(() => {
    setRendered(true),
    () => { setRendered(false); }
  });

  // Now we conditionally render to avoid SSR issues
  if(rendered) {
    return (
      <>
        <Container>
          <CheckboxInput
            checked={ checked }
            className={ className } 
            disabled={ disabled } 
            id={ randomID } 
            type="checkbox" 
          />
          <CheckboxLabel htmlFor={ randomID }>
            { checkboxLabel }
          </CheckboxLabel>
        </Container>
      </>
    )
  }

  // If rendering fails
  else {
    return (
      <p>Still loading...</p>
    )
  }

}

export default CheckboxSwitch