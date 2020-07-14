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
  border-radius: 10px;
  box-shadow: ${props => props.theme.buttonBoxShadow};
  color: ${props => props.buttonColor || props.theme.black};
  cursor: pointer;
  display: inline-block;
  font-family: ${props => props.theme.montserrat};
  font-size: ${props => props.buttonFontSize || '18px'};
  font-weight: 700;
  min-width: 100px;
  margin: 0;
  padding: ${props => props.buttonPadding || '10px 35px'};
  text-align: center;
  text-decoration: none;
  text-transform: ${props => props.buttonTextTransform || 'uppercase'};
  transform: translateY(0);
  transition: all 0.25s ease;
  
  &:hover {
    background-color: ${props => props.buttonBgHover || props.theme.black};
    color: ${props => props.buttonColorHover || 'white'};
    text-decoration: none;
    transform: translateY(-2px);
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
 * @param {string} buttonBg - override for button background (default: white)
 * @param {string} buttonBgHover - override for button background on hover (default: black)
 * @param {string} buttonBorder - override for button border (default: black)
 * @param {string} buttonColor - override for button color (default: black)
 * @param {string} buttonColorHover - override for button text color on hover (default: white)
 * @param {string} buttonFontSize - override for button text size (default: 16-24px)
 * @param {string} buttonPadding - override for button text padding settings (default: 10px 35px)
 * @param {string} buttonPosition - uses { left | center | right } to move button container
 * @param {string} buttonTextTransform - changes casing of button text (default: uppercase)
 */
function BasicButton(
  { buttonBg, 
    buttonBgHover,
    buttonBorder, 
    children, 
    buttonColor, 
    buttonColorHover,
    buttonFontSize,
    buttonPadding,
    buttonPosition,
    buttonTextTransform }) {

  return (
    <>
      <Container buttonPosition={ buttonPosition }>
        <Button
          buttonBg={ buttonBg }
          buttonBgHover={ buttonBgHover }
          buttonBorder={ buttonBorder }
          buttonColor={ buttonColor } 
          buttonColorHover={ buttonColorHover }
          buttonFontSize={ buttonFontSize }
          buttonPadding={ buttonPadding }
          buttonTextTransform={ buttonTextTransform }
        >
          { children }
        </Button>
      </Container>
    </>
  )
}

export default BasicButton