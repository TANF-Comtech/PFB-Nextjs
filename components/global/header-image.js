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
  position: relative;
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

const ForegroundImg = styled.img`
  margin-bottom: 2vh;
  max-height: 70vh;
  object-fit: cover;
  width: 100%;
`

/**
 * <HeaderImage>
 * 
 * This produces the ultra-wide banners around the site.
 * It can handle background imagery with text or just foreground images
 * 
 * @param { object } children - React child components, content for this component
 * @param { string } headingRGBA - color of text, can provide transparency
 * @param { string } source - single image to display as a banner/hero in background
 * @param { object } srcSet - set of images to display across responsive viewports in foreground
 */

const HeaderImage = ({ 
  children,
  headingRGBA,
  source,
  srcSet
}) => {
  return (
    <>
      { source &&
        <ImageContainer
          headingRGBA={ headingRGBA }
          source={ source }
        >
          { children }
        </ImageContainer>
      }
      { srcSet &&
        <ForegroundImg
          alt={ srcSet.alt ? srcSet.alt : "Bike-oriented image" }
          loading="lazy"
          src={ srcSet.url }
          srcSet={ `${srcSet.url} 1600w, ${srcSet.mobile.url} 800w`  }
          sizes="100vw"
        />
      }
    </>
  )
}

export default HeaderImage