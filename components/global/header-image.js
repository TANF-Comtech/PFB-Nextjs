import React from "react"
import styled from "styled-components"

const ResponsiveImage = styled.section`
  align-items: center;
  background-image: url(${ props => props.source });
  background-position: center center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 70vh;
  margin-bottom: 1vh;
  padding: 0 2vw;

  h1 {
    color: rgba(${props => props.headingRGBA ? props.headingRGBA : "255,255,255,1" });
  }

  h3 {
    color: rgba(${props => props.headingRGBA ? props.headingRGBA : "255,255,255,1" });
    font-size: 18px;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: 1px;
    margin-top: 1vh;
    text-transform: uppercase;
  }
  @media screen and (min-width: 320px) {
    h3 {
      font-size: calc(18px + 8 * ((100vw - 320px) / 880));
      line-height: calc(18px + 8 * ((100vw - 320px) / 880));
    }
  }
  @media screen and (min-width: 1200px) {
    h3 {
      font-size: 26px;
      line-height: 26px;
    }
  } 

`

/**
 * <HeaderImage>
 * 
 * This produces the ultra-wide banners around the site.
 * 
 * @param { string } headingRGBA - color of text, can provide transparency
 * @param { string } headingText - big text that appears in the middle of the image
 * @param { string } source - single image to display as a banner/hero
 * @param { obj } srcSet - set of images to display across responsive viewports
 * @param { string } subheadingText - small text that appears just beneath the big stuff
 */
const HeaderImage = ({ 
  headingRGBA,
  headingText,
  source,
  srcSet,
  subheadingText
}) => {
  return (
    <>
      <ResponsiveImage
        headingRGBA={ headingRGBA }
        source={ source }
      >
        { headingText && (
          <h1>{ headingText }</h1>
        )}
        { subheadingText && (
          <h3>{ subheadingText }</h3>
        )}
      </ResponsiveImage>
    </>
  )
}

export default HeaderImage