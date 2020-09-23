import React from "react";
import styled from "styled-components";

import Link from "next/link"

const ImageContainer = styled.div`
  align-items: center;
  background-image: url(${props => props.path1X});
  background-image: 
    image-set(
      url(${props => props.path1X}) 1x,
      url(${props => props.path2X}) 2x,
    );
  background-position: center center;
  background-size: cover;
  display: flex;
  height: auto;
  justify-content: center;
  max-width: 100%;
  min-height: 30vh;
  transition: 0.2s ease;
  transform: translateY(0);
}
`

const Title = styled.h2`
  color: rgba(255,255,255,0.9);
  font-size: 50px;
  font-weight: 700;
  line-height: 40px;
  padding: 2vh 2vw;
  text-decoration: none !important;
  text-align: center;
  text-transform: uppercase;
    
  @media screen and (min-width: 320px) {
    font-size: calc(50px + 50 * ((100vw - 320px) / 880));
    line-height: calc(40px + 50 * ((100vw - 320px) / 880));
  }
  @media screen and (min-width: 1200px) {
    font-size: 100px;
    line-height: 90px;
  } 
`

/**
 * <ImageTextOverlay>
 * 
 * Presents a square image with some text on top of it
 *
 * @param { string } imageLink - Next path for the image square
 * @param { string } source1X - image source for the bg image
 * @param { string } source2X - image source for the bg image, twice as big
 * @param { string } title - text that goes on top 
 */
const ImageTextOverlay = ({
  imageLink,
  source1X,
  source2X,
  title
}) => {
  return (
    <Link href={ imageLink } passHref>
      <a>
        <ImageContainer
          path1X={ source1X }
          path2X={ source2X }
        >
          <Title>{ title }</Title>
        </ImageContainer>
      </a>
    </Link>
  )
}

export default ImageTextOverlay