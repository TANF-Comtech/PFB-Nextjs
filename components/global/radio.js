import React, { useState, useEffect } from "react"
import styled from "styled-components"

const RadioWrapper = styled.section`
  display: block;
`

const Container = styled.div`
  align-items: center;
  display: flex;
  margin: 1.5vh 0;
`

const RadioInput = styled.input.attrs({
  type: 'radio'
})`
  /* The appearance property allows us to do custom form elements without getting too fancy */
  /* But we don't want to do all this work if the browser doesn't support it */
  /* So check appearance: none; support, if browser support - do custom form elements */
  @supports(-webkit-appearance: none) or (-moz-appearance: none) {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: var(--b, var(--background));
    border: 1px solid var(--bc, var(--border));
    border-radius: 50%;
    cursor: pointer;
    height: 21px;
    display: inline-block;
    margin: 0;
    outline: none;
    position: relative;
    transition: background .3s, border-color .3s, box-shadow .2s;
    vertical-align: top;

    &:after {
      background: var(--active-inner);
      border-radius: 50%;
      content: '';
      display: block;
      height: 19px;
      left: 0;
      opacity: 0;
      top: 0;
      position: absolute;
      transition: transform var(--d-t, .3s) var(--d-t-e, ease), opacity var(--d-o, .2s);
      /* transition: transform .3s ease, opacity .2s */
      transform: scale(var(--s, .7));
      width: 19px;
    }

    &:checked {
      --b: var(--active);
      --bc: var(--active);
      --d-o: .3s;
      --d-t: .6s;
      --d-t-e: cubic-bezier(.2, .85, .32, 1.2);
    }

    &:disabled {
      --b: var(--disabled);
      cursor: not-allowed;
      opacity: .9;

      &:checked {
        --b: var(--disabled-inner);
        --bc: var(--border);
      }

      & + label {
        cursor: not-allowed;
      }
    }

    &:hover {
      &:not(:checked) {
        &:not(:disabled) {
          --bc: var(--border-hover);
        }
      }
    }

    &:focus {
      box-shadow: 0 0 0 var(--focus);
    }

    &:not(.switch) {
      flex-basis: 21px;
      flex-shrink: 0;
      width: 21px;

      &:after {
        opacity: var(--o, 0);
      }

      &:checked {
        --o: 1;
      }
    }

    &:checked {
      --s: .5;
    }
  }
`

const RadioLabel = styled.label`
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
                <RadioLabel htmlFor={ randomID }>
                  { label }
                </RadioLabel>
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