import React from "react"
import styled from "styled-components"
import Link from "next/link"

/* !important is needed to override when next/link applies global-css.js styles to anchors */
/* This pattern allows the props we pass into our styled-component to override those styles */
const Button = styled.a`
  background-color: ${props => props.buttonBg || 'rgba(255,255,255,1)'}; 
  border: ${props => props.buttonBorder || `1px solid ${props.theme.black}`};
  border-radius: 10px;
  box-shadow: ${props => props.theme.buttonBoxShadow};
  color: ${props => props.buttonColor || props.theme.black} !important;
  cursor: pointer;
  font-family: ${props => props.theme.montserrat};
  font-size: ${props => props.buttonFontSize || '18px'};
  font-weight: 700;
  min-width: 100px;
  margin: 0;
  padding: ${props => props.buttonPadding || '10px 35px'};
  text-align: center;
  text-decoration: none !important;
  text-transform: ${props => props.buttonTextTransform || 'uppercase'};
  transform: translateY(0);
  transition: all 0.25s ease;
  
  &:hover, &::visited, &::focus, &:active {
    background-color: ${props => props.buttonBgHover || props.theme.black};
    color: ${props => props.buttonColorHover || 'white'} !important;
    text-decoration: none;
  }

  &:hover {
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
 * When using a button as a 
 * 
 * @param {string} buttonBg - override for button background (default: white)
 * @param {string} buttonBgHover - override for button background on hover (default: black)
 * @param {string} buttonBorder - override for button border (default: black)
 * @param {string} buttonColor - override for button color (default: black)
 * @param {string} buttonColorHover - override for button text color on hover (default: white)
 * @param {string} buttonFontSize - override for button text size (default: 16-24px)
 * @param {string} buttonPadding - override for button text padding settings (default: 10px 35px)
 * @param {string} buttonTextTransform - changes casing of button text (default: uppercase)
 * @param {string} className - allows styled-components to extend this component
 */
function BasicButton(
  { buttonBg, 
    buttonBgHover,
    buttonBorder, 
    buttonColor, 
    buttonColorHover,
    buttonFontSize,
    buttonPadding,
    buttonTextTransform,
    children, 
    className,
    href 
  }) {

  return (
    <Link href={ href } passHref>
      <Button
        buttonBg={ buttonBg }
        buttonBgHover={ buttonBgHover }
        buttonBorder={ buttonBorder }
        buttonColor={ buttonColor } 
        buttonColorHover={ buttonColorHover }
        buttonFontSize={ buttonFontSize }
        buttonPadding={ buttonPadding }
        buttonTextTransform={ buttonTextTransform }
        className={ className }
      >
        { children }
      </Button>
    </Link>
  )
}

export default BasicButton