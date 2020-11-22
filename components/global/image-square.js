import React from "react";
import styled from "styled-components";

import Link from "next/link"
import ArrowIcon from '../../public/red-arrow.svg'

const ImageContainer = styled.div`
  align-items: center;
  background-image: 
    image-set(
      url(${props => props.path1X}) 1x,
      url(${props => props.path2X}) 2x
    );
  background-image: url(${props => props.path1X});
  background-position: center center;
  background-size: cover;
  display: flex;
  height: auto;
  justify-content: space-between;
  max-width: 100%;
  transition: 0.2s ease;
  transform: translateY(0);

  &::before {
    content: "";
    padding-bottom: 100%;
    display: inline-block;
    vertical-align: top;
  }
`

const Title = styled.h2`
  background-color: rgba(208, 2, 27, 0.9);
  color: #fff;
  font-size: 40px;
  line-height: 36px;
  margin: 0 20px 0 0;
  padding: 10px 20px;
  text-decoration: none !important;
  width: calc(100% - 60px);
`

const Arrow = styled.img`
  background-color: #fff;
  display: block;
  flex-shrink: 0;
  padding: 10px;
  width: 40px;
`

/**
 * <ImageSquare>
 * 
 * Presents a square image with some text on top of it
 *
 * @param { string } imageSquareLink - Next path for the image square
 * @param { string } source1X - image source for the bg image
 * @param { string } source2X - image source for the bg image, twice as big
 * @param { string } title - text that goes on top 
 */
const ImageSquare = ({
  imageSquareLink,
  source1X,
  source2X,
  title
}) => {
  return (
    <Link href={ imageSquareLink } passHref>
      <a>
        <ImageContainer
          path1X={ source1X }
          path2X={ source2X }
        >
          <Title>{ title }</Title>
          <Arrow src={ ArrowIcon } />
        </ImageContainer>
      </a>
    </Link>
  )
}

export default ImageSquare