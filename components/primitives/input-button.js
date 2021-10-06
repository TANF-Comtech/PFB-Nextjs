import React from "react"
import styled from "styled-components"

// This component is the base styles of the button
const Container = styled.div`
  display: block;
  text-align: ${props => props.buttonPosition || 'left'};
`

const Button = styled.input`
  background-color: ${props => props.buttonBg || 'rgba(255,255,255,1)'}; 
  border: ${props => props.buttonBorder || `1px solid ${props.theme.black}`};
  box-shadow: ${props => props.theme.buttonBoxShadow};
  color: ${props => props.buttonColor || props.theme.black};
  cursor: pointer;
  display: inline-block;
  font-family: ${props => props.theme.montserrat};
  font-size: 14px;
  font-weight: 700;
  min-width: ${ props => props.minWidth ? props.minWidth : '200px' };
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
    font-size: calc(14px + 4 * ((100vw - 320px) / 880));
    padding: 10px calc(35px + 15 * ((100vw - 320px) / 880));
  }

  @media (min-width: ${props => props.theme.lg}) {
    font-size: 18px;
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
 * @param {string} buttonText - because <input> is a void element, we can't pass in text, must be a prop instead
 * @param {string} className - helps styled-components extend, and obviously passes a class 
 * @param {string} margin - how much margin (default is 1vh on bottom)
 * @param {string} minWidth - how wide should it go (default is 300px)
 * @param {string} name - input name param, just passed down
 * 
 * #################!!!!!!!!####################
 * readOnly flag on component in place because no real data handling has been set up
 * #################!!!!!!!!####################
 */
function InputButton({ 
  buttonBg, 
  buttonBgHover,
  buttonBorder, 
  buttonColor, 
  buttonColorHover,
  buttonPosition,
  buttonText,
  className,
  minWidth,
  name,
  onClick
}) {
  return (
    <>
      <Container buttonPosition={ buttonPosition }>
        <Button
          buttonBg={ buttonBg }
          buttonBgHover={ buttonBgHover }
          buttonBorder={ buttonBorder }
          buttonColor={ buttonColor } 
          buttonColorHover={ buttonColorHover }
          className={ className }
          minWidth={ minWidth }
          name={ name }
          value={ buttonText }
          readOnly
          onClick={onClick}
        />
      </Container>
    </>
  )
}

export default InputButton