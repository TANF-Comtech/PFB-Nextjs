import React from "react"
import styled from "styled-components"

// spacer constrains the layout on big screens but keeps it tight on mobile
const IconContainer = styled.div`
  align-items: center;
  background-color: ${props => props.theme.black};
  border-radius: 19px;
  display: flex;
  height: 38px;
  justify-content: center;
  width: 38px;

  @media screen and (min-width: 320px) {
    border-radius: calc(19px + 11 * ((100vw - 320px) / 880));
    height: calc(38px + 22 * ((100vw - 320px) / 880));
    width: calc(38px + 22 * ((100vw - 320px) / 880));
  }
  @media screen and (min-width: 1200px) {
    border-radius: 30px;
    height: 60px;
    width: 60px;
  }
`

const Icon = styled.img`
  height: 19px;
  width: 19px;

  @media screen and (min-width: 320px) {
    height: calc(19px + 11 * ((100vw - 320px) / 880));
    width: calc(19px + 11 * ((100vw - 320px) / 880));
  }
  @media screen and (min-width: 1200px) {
    height: 30px;
    width: 30px;
  }
`

/**
 * <SocialIcon>
 * 
 * This is basic social icon look established for the footer of the site
 * The icon container is a black circle 60x60px
 * The incoming icon should be white on a transparent bg
 * 
 * @param {object} children - SVG file, should come in as a React Fragment
 * 
 */
const SocialIcon = ({ source, text, url }) => {
  return (
    <a href={ url } target="_blank" rel="noopener">
      <IconContainer>
        <Icon src={ source } alt={ text } />
      </IconContainer>
    </a>
  )
}

export default SocialIcon