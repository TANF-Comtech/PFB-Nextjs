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

  @media screen and (min-width: ${ props => props.theme.lg }) {
    height: 80vh;
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