import React from "react"
import Link from "next/link"
import styled from "styled-components"

const Container = styled.section`
  a, a:visited, a:focus, a:hover, a:active {
    text-decoration: none;
  }
`

const ImageContainer = styled.section`
  align-items: center;
  background-image: url(${ props => props.source });
  background-position: center center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 50vh;
  margin-bottom: 25px;
  padding: 0 5vw;
  text-align: center;

  @media screen and (min-width: ${ props => props.theme.sm }) {
    height: 70vh;
  }

  h1 {
    color: rgba(${props => props.headingRGBA ? props.headingRGBA : "255,255,255,1" });
    text-transform: uppercase;
  }

  span {
    color: rgba(${props => props.headingRGBA ? props.headingRGBA : "255,255,255,1" });
    font-family: "Tungsten A", "Tungsten B", Arial, Helvetica, sans-serif;
    font-size: 40px;
    font-weight: 600;
    line-height: 30px;
    letter-spacing: 1px;
    margin: 0;
    text-transform: uppercase;
  }
  @media screen and (min-width: 320px) {
    span {
      font-size: calc(40px + 20 * ((100vw - 320px) / 880));
      line-height: calc(30px + 20 * ((100vw - 320px) / 880));
    }
  }
  @media screen and (min-width: 1200px) {
    span {
      font-size: 60px;
      line-height: 50px;
    }
  } 
`

/**
 * <Promo>
 * 
 * Promo is just like a HeaderImage component, except it links to page
 * 
 * @param { string } headingRGBA - color of text, can provide transparency
 * @param { string } path - where the promo will go around the site
 * @param { string } source - single image to display as a banner/hero
 */
const Promo = ({ 
  children,
  headingRGBA,
  path,
  source
}) => {
  return (
    <Container>
      <Link href={ path }>
        <a>
          <ImageContainer
            headingRGBA={ headingRGBA }
            source={ source }
          >
            { children }
          </ImageContainer>
        </a>
      </Link>
    </Container>
  )
}

export default Promo