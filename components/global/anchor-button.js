import React from "react"
import styled from "styled-components"

// This component is the base styles of the button
const Container = styled.div`
  display: block;
`

const Anchor = styled.a`
  background: rgba(255,255,255,1); 
  border: 1px solid ${props => props.theme.black};
  color: ${props => props.theme.black};
  cursor: pointer;
  display: inline-block;
  font-family: ${props => props.theme.montserrat};
  font-size: 16px;
  font-weight: 700;
  min-width: 200px;
  margin: 0;
  padding: 10px 35px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  transition: 0.2s ease-in-out;
  
  &:hover {
    background: ${props => props.theme.black};
    color: white;
    text-decoration: none;
  }

  @media (min-width: ${props => props.theme.bm}) {
    font-size: calc(16px + 8 * ((100vw - 320px) / 880));
    padding: 10px calc(35px + 15 * ((100vw - 320px) / 880));
  }

  @media (min-width: ${props => props.theme.lg}) {
    font-size: 24px;
    padding: 10px 60px;
  }
`

/**
 * <AnchorButton>
 * 
 * Simple button that optionally takes props to modify it
 * The construction of this wraps a styled-component with a regular React component
 * We did this because you can't pass values directly into styled-components, just booleans
 *
 * There is a huge discussion in styled-components repo about how to handle this: 
 * https://github.com/styled-components/styled-components/pull/2093
 * 
 * For now, we the overrides use JSX style objects
 * 
 * @param {string} buttonBackground - override for button background
 * @param {string} buttonBorder - override for button border
 * @param {string} buttonColor - override for button color
 * @param {string} buttonLink - URL for the button
 * @param {string} buttonMargin - override for button margin
 */
function AnchorButton({ buttonBackground, buttonBorder, children, buttonColor, buttonLink, buttonMargin, buttonPosition }) {
  const buttonOverrideStyles = {
    background: buttonBackground, 
    border: buttonBorder,
    color: buttonColor,
    margin: buttonMargin
  }

  const buttonPlacement = {
    textAlign: buttonPosition
  }

  return (
    <>
      <Container style={ buttonPlacement }>
        <Anchor
          style={ buttonOverrideStyles } 
          href={ buttonLink }
        >
          { children }
        </Anchor>
      </Container>
    </>
  )
}

export default AnchorButton