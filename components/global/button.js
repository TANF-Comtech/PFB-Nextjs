import React from "react"
import styled from "styled-components"

// This component is the base styles of the button
const Container = styled.div`
  display: block;
  text-align: ${props => props.buttonPosition || 'left'};
`

const Button = styled.div`
  background-color: ${props => props.buttonBg || 'rgba(255,255,255,1)'}; 
  border: ${props => props.buttonBorder || `1px solid ${props.theme.black}`};
  box-shadow: ${props => props.theme.buttonBoxShadow};
  color: ${props => props.buttonColor || props.theme.black};
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
  transform: translateY(0);
  transition: all 0.25s ease;
  
  &:hover {
    background-color: ${props => props.buttonBgHover || props.theme.black};
    color: ${props => props.buttonColorHover || 'white'};
    text-decoration: none;
    transform: translateY(-2px);
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
 * <BasicButton>
 * 
 * Simple button that optionally takes props to modify it
 * The construction wraps two styled-components with a regular React component
 * Then we pass the props from <BasicButton> down to <Container> and <Anchor> in this file
 * <Container> controls button position <Button> controls button look and feel
 * See how it works: https://styled-components.com/docs/basics#passed-props
 * 
 * @param {string} buttonBg - override for button background
 * @param {string} buttonBgHover - override for button background on hover
 * @param {string} buttonBorder - override for button border
 * @param {string} buttonColor - override for button color
 * @param {string} buttonColorHover - override for button text color on hover
 * @param {string} buttonPosition - uses { left | center | right } to move button container
 */
function BasicButton(
  { buttonBg, 
    buttonBgHover,
    buttonBorder, 
    children, 
    buttonColor, 
    buttonColorHover,
    buttonPosition }) {

  return (
    <>
      <Container buttonPosition={ buttonPosition }>
        <Button
          buttonBg={ buttonBg }
          buttonBgHover={ buttonBgHover }
          buttonBorder={ buttonBorder }
          buttonColor={ buttonColor } 
          buttonColorHover={ buttonColorHover }
        >
          { children }
        </Button>
      </Container>
    </>
  )
}

export default BasicButton