import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const Container = styled.div`
  display: flex !important;
  margin: ${(props) => props.buttonMargin || '0'} !important;
  justify-content: ${(props) => props.buttonAlign || 'flex-start'} !important;
`;

/* !important is needed to override when next/link applies global-css.js styles to anchors */
/* This pattern allows the props we pass into our styled-component to override those styles */
const Button = styled.a`
  background-color: ${(props) => props.buttonBg || 'rgba(255,255,255,1)'} !important;
  border: ${(props) => props.buttonBorder || `1px solid ${props.theme.black}`} !important;
  border-radius: 10px !important;
  box-shadow: ${(props) => props.theme.buttonBoxShadow} !important;
  color: ${(props) => props.buttonColor || props.theme.black} !important;
  cursor: pointer !important;
  font-family: ${(props) => props.theme.montserrat} !important;
  font-size: ${(props) => props.buttonFontSize || '18px'} !important;
  font-weight: 700 !important;
  min-width: 100px !important;
  margin: 0 !important;
  padding: ${(props) => props.buttonPadding || '10px 35px'} !important;
  text-align: center !important;
  text-decoration: none !important;
  text-transform: ${(props) => props.buttonTextTransform || 'uppercase'} !important;
  transform: translateY(0) !important;
  transition: all 0.25s ease !important;

  &:hover,
  &::visited,
  &::focus,
  &:active {
    background-color: ${(props) => props.buttonBgHover || props.theme.black} !important;
    color: ${(props) => props.buttonColorHover || 'white'} !important;
    text-decoration: none !important;
  }

  &:hover {
    transform: translateY(-2px) !important;
  }
`;

/**
 * <BasicButton>
 *
 * Simple button that optionally takes props to modify it
 * The construction wraps two styled-components with a regular React component
 * Then we pass the props from <BasicButton> down to <Container> and <Anchor> in this file
 * <Container> controls button position <Button> controls button look and feel
 * See how it works: https://styled-components.com/docs/basics#passed-props
 *
 * @param {string} buttonAlign - move the button's main axis via flexbox justify-content (default: flex-start)
 * @param {string} buttonBg - override for button background (default: white)
 * @param {string} buttonBgHover - override for button background on hover (default: black)
 * @param {string} buttonBorder - override for button border (default: black)
 * @param {string} buttonColor - override for button color (default: black)
 * @param {string} buttonColorHover - override for button text color on hover (default: white)
 * @param {string} buttonFontSize - override for button text size (default: 16-24px)
 * @param {string} buttonMargin - override for button margins (default: 16-24px)
 * @param {string} buttonPadding - override for button text padding settings (default: 10px 35px)
 * @param {string} buttonTextTransform - changes casing of button text (default: uppercase)
 * @param {string} className - allows styled-components to extend this component
 */
function BasicButton({
  buttonAlign,
  buttonBg,
  buttonBgHover,
  buttonBorder,
  buttonColor,
  buttonColorHover,
  buttonFontSize,
  buttonMargin,
  buttonPadding,
  buttonTextTransform,
  children,
  className,
  href,
}) {
  return (
    <Container buttonAlign={buttonAlign} buttonMargin={buttonMargin}>
      <Link href={href} passHref>
        <Button
          buttonBg={buttonBg}
          buttonBgHover={buttonBgHover}
          buttonBorder={buttonBorder}
          buttonColor={buttonColor}
          buttonColorHover={buttonColorHover}
          buttonFontSize={buttonFontSize}
          buttonPadding={buttonPadding}
          buttonTextTransform={buttonTextTransform}
          className={className}
        >
          {children}
        </Button>
      </Link>
    </Container>
  );
}

export default BasicButton;
