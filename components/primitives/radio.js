import React, { useState, useEffect } from "react"
import styled from "styled-components"

import BasicInput from './input'
import BasicLabel from './label'

const RadioWrapper = styled.section`
  display: block;
`

const Container = styled.div`
  align-items: center;
  display: flex;
  margin: 1.5vh 0;
`

/* This is kinda hacky - to abstract <input> into one component, I'm doing the radio overrides */
/* Lesser of two evils - check input.js so see what we're overriding */
const RadioInput = styled(BasicInput).attrs({
  type: 'radio'
})`
  border-radius: 50% !important;

  &:after {
    background: var(--active-inner);
    border-radius: 50%;
    content: '';
    display: block;
    height: 19px !important;
    left: 0 !important;
    top: 0 !important;
    position: absolute;
    transition: transform var(--d-t, .3s) var(--d-t-e, ease), opacity var(--d-o, .2s) !important;
    /* transition: transform .3s ease, opacity .2s */
    transform: scale(var(--s, .7)) !important;
    width: 19px !important;
  }

  /* :checked css variable change creates the animation effect */
  &:checked {
    --s: .5;
  }
`

/**
 * <Radio>
 * 
 * A set of radio inputs, because they are linked together we build them at the same time
 * A <Container> holds the <RadioInput> and <RadioLabel> together in a flexbox for alignment
 * There is a LOT of style and pseudo classes required to pull this off above
 * Comments are mostly in the styled-components above
 * 
 * To make n radio buttons, we have to loop through the label array
 * Then we output each <RadioInput> and <RadioLabel> into a <Container>
 * 
 * @param {array} radioLabels - label for each radio input
 * @param {array} radioValues- value for each radio input
 * @param {string} radioGroupName- name that ties the radio group together
 */
const RadioSet = ({ 
  radioGroupName,
  radioLabels, 
  radioValues
}) => {

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
        <RadioWrapper>

          {/* Loops through each label, effective counts how many inputs we need */}
          {radioLabels.map( (label, i) => {

            // Establish an ID for each input/label pair
            const randomID = Math.round(Math.random() * 10000000)

            // Sets up container for each input/label pair, outputs data
            return(
              <Container key={ randomID }>
                <RadioInput
                  name={ radioGroupName }
                  id={ randomID } 
                  type="radio" 
                  value={ radioValues[i] }
                />
                <BasicLabel htmlFor={ randomID }>
                  { label }
                </BasicLabel>
              </Container>
            )

          })}
        </RadioWrapper>
      </>
    )
  }

  else {
    return(
      <p>Still loading...</p>
    )
  }
}

export default RadioSet