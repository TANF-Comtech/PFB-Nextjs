import styled from "styled-components"
import Flickity from "react-flickity-component"

import { linkResolver } from "../../lib/utils"

import WhiteArrow from '../../public/white-arrow.svg'

const Slide = styled.section`
  align-items: center;
  background-image: url(${ props => props.source });
  background-position: center center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  height: 40vh;
  max-height: 600px;
  justify-content: center;
  max-width: 1100px;
  margin: 0 12.5px;
  padding: 25px;
  width: 90vw;
  @media screen and (min-width: 480px) {
    height: 80vw;
    width: 80vw;
  }
  @media screen and (min-width: 768px) {
    height: 60vw;
  }
  @media screen and (min-width: 1000px) {
    height: 40vw;
  }
  h2 {
    color: rgba(${props => props.headingRGBA ? props.headingRGBA : "255,255,255,1" });
    font-size: 60px;
    font-weight: 600;
    line-height: 50px;
    padding-bottom: 10px;
    text-align: center;
    text-transform: uppercase;
  }
  @media screen and (min-width: 320px) {
    h2 {
      font-size: calc(60px + 60 * ((100vw - 320px) / 880));
      line-height: calc(50px + 60 * ((100vw - 320px) / 880));
    }
  }
  @media screen and (min-width: 1200px) {
    h2 {
      font-size: 120px;
      line-height: 110px;
    }
  }   
  span {
    color: rgba(${props => props.headingRGBA ? props.headingRGBA : "255,255,255,1" });
    font-family: "Tungsten A", "Tungsten B", Arial, Helvetica, sans-serif;
    font-size: 30px;
    font-weight: 600;
    line-height: 25px;
    letter-spacing: 1px;
    padding-bottom: 3px;
    margin: 0;
    text-align: center;
    text-transform: uppercase;
  }
  @media screen and (min-width: 320px) {
    span {
      font-size: calc(30px + 30 * ((100vw - 320px) / 880));
      line-height: calc(25px + 25 * ((100vw - 320px) / 880));
    }
  }
  @media screen and (min-width: 1200px) {
    span {
      font-size: 60px;
      line-height: 50px;
    }
  } 
`

const SlideWrapper = styled.a`
  text-align: center;
  text-decoration: none !important;
  &::hover, &::visited, &:focus {
    text-decoration: none !important;
  }
`

const Arrow = styled.img`
  display: block;
  margin: 0 auto;
  width: 46px;
`

/**
 * <Carousel>
 * 
 * Creates a flickity-based carousel, across site
 *
 * @param { array } payload - list of elements from a campaign typically
 */

const Carousel = ({
  payload
}) => {

  // Figure out the carousel index
  const slideIndex = Math.floor(payload.length / 2)
  const flickityOptions = {
    initialIndex: slideIndex,
    wrapAround: true
  }

  return (
    <Flickity
      options={ flickityOptions }
      static={ true }
    >
      { payload.map( (c) => {
        return(
          <Slide 
            key={ c.campaign._meta.id }
            source={ c.campaign.banner_image.url }
          >
            <SlideWrapper 
              href={ linkResolver(c.campaign.link, true) } 
              rel="noopener"
              target="_blank">
                { c.campaign.small_text && <span>{ c.campaign.small_text }</span> }
                { c.campaign.big_text && <h2>{ c.campaign.big_text }</h2> }
                <Arrow src={ WhiteArrow } width="46px" />
            </SlideWrapper>
          </Slide>
        )
      } ) }
    </Flickity>
  )
}

export default Carousel