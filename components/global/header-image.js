import React from "react"
import styled from "styled-components"

// background-image: url(examples/images/image-384.jpg);
// background-image: 
//   -webkit-image-set(
//     url(examples/images/image-384.jpg) 1x,
//     url(examples/images/image-768.jpg) 2x,
//   );
// background-image: 
//   image-set(
//     url(examples/images/image-384.jpg) 1x,
//     url(examples/images/image-768.jpg) 2x,
//   );

const ImageContainer = styled.section`
  align-items: center;
  background-image: url(${ props => props.source });
  background-position: center center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 50vh;
  margin-bottom: 1vh;
  padding: 0 5vw;
  text-align: center;

  @media screen and (min-width: ${ props => props.theme.sm }) {
    height: 70vh;
  }

  h1 {
    color: rgba(${props => props.headingRGBA ? props.headingRGBA : "255,255,255,1" });
    text-transform: uppercase;
  }

  h3 {
    color: rgba(${props => props.headingRGBA ? props.headingRGBA : "255,255,255,1" });
    font-size: 18px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 1px;
    margin-top: 1vh;
    text-transform: uppercase;
  }
  @media screen and (min-width: 320px) {
    h3 {
      font-size: calc(18px + 8 * ((100vw - 320px) / 880));
      line-height: calc(24px + 8 * ((100vw - 320px) / 880));
    }
  }
  @media screen and (min-width: 1200px) {
    h3 {
      font-size: 26px;
      line-height: 36px;
    }
  } 

`

/**
 * <HeaderImage>
 * 
 * This produces the ultra-wide banners around the site. Probably could be improved but pretty good as is.
 * srcSet param makes sense but responsive background images still doesn't really work in browsers
 * 
 * @param { string } headingRGBA - color of text, can provide transparency
 * @param { string } source - single image to display as a banner/hero
 * @param { obj } srcSet - set of images to display across responsive viewports
 */
const HeaderImage = ({ 
  children,
  headingRGBA,
  source,
  srcSet
}) => {
  return (
    <>
      <ImageContainer
        headingRGBA={ headingRGBA }
        source={ source }
      >
        { children }
      </ImageContainer>
    </>
  )
}

export default HeaderImage