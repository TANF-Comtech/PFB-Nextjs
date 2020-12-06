import React from "react"
import Link from "next/link"
import styled from "styled-components"

import { linkResolver } from "../../lib/utils"

import WhiteArrow from '../../public/white-arrow.svg'
import PromoFallback from '../../public/promo/promo-momentum.jpg'

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

const Arrow = styled.img`
  display: block;
  margin: 0 auto;
  width: 46px;
`

/**
 * <Promo>
 * 
 * Promo is just like a HeaderImage component, except it links to page
 *
 * @param { string } bigWords - large lettering in promo
 * @param { string } headingRGBA - color of text, can provide transparency
 * @param { string } path - where the promo will go around the site (default: homepage)
 * @param { string } smallWords - small lettering in promo
 * @param { string } source - single image to display as a banner/hero (default: PromoFallback)
 */
const Promo = ({ 
  bigWords = "See How Our Work Creates",
  headingRGBA,
  path = 'https://www.peopleforbikes.org',
  smallWords = 'Creates Momentum',
  source = PromoFallback
}) => {
  
  return (
    <Container>
      { path.__typename === '_ExternalLink' ? (
        <a href={ linkResolver(path, true) }>
          <ImageContainer
            headingRGBA={ headingRGBA }
            source={ source }
          >
            <span>{ smallWords }</span>
            <h1>{ bigWords }</h1>
            <Arrow src={ WhiteArrow } width="46px" />
          </ImageContainer>     
        </a>
      ) : (
        <Link href={ linkResolver(path, true) } passHref>
          <a>
            <ImageContainer
              headingRGBA={ headingRGBA }
              source={ source }
            >
              <span>{ smallWords }</span>
              <h1>{ bigWords }</h1>
              <Arrow src={ WhiteArrow } width="46px" />
            </ImageContainer>
          </a>
        </Link>
      )}
    </Container>
  )
}

export default Promo