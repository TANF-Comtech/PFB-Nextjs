import React from "react"
import styled from "styled-components"

import MainContent from "../global/main-content"

const Container = styled.section`
  a, a:visited, a:focus, a:hover, a:active {
    text-decoration: none;
  }
`

const ColorContainer = styled.section`
  align-items: center;
  background-color: ${ props => props.bgColor || props.theme.redAccent };
  background-position: center center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 25px;
  padding: 0 5vw;
  text-align: center;

  h1 {
    color: white;
    margin-bottom: 10px;
  }

  span {
    color: white;
    display: block;
    font-family: ${ props => props.theme.montserrat };
    font-size: 24px;
    font-weight: 300;
    line-height: 30px;
    margin-bottom: 25px;
  }
  @media screen and (min-width: 320px) {
    span {
      font-size: calc(24px + 4 * ((100vw - 320px) / 880));
      line-height: calc(30px + 8 * ((100vw - 320px) / 880));
    }
  }
  @media screen and (min-width: 1200px) {
    span {
      font-size: 28px;
      line-height: 38px;
    }
  } 
`

/**
 * <Donate>
 * 
 * Donate is the global donation promo well that shows up all over the place.
 * It's super simple - just a big color banner off site.
 * 
 * @param { string } bgColor - color of background, should be dark
 * @param { object } children - react children, you know - come on
 * 
 */
const Donate = ({ 
  bgColor,
  children,
}) => {
  return (
    <Container>
      <a href="https://www.classy.org/give/117371" rel="nofollow" target="_blank">
        <ColorContainer
          bgColor={ bgColor }
        >
          <MainContent maxWidth="800px">
            { children }
          </MainContent>
        </ColorContainer>
      </a>
    </Container>
  )
}

export default Donate