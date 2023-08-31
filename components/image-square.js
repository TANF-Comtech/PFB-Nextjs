import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import BgImage from '~/components/bg-image';

import ArrowIcon from '~/public/red-arrow.svg';

const ImageContentContainer = styled.div`
  align-items: center !important;
  display: flex !important;
  height: 100% !important;
  justify-content: ${(props) => (props.isNavItem === true ? 'center' : 'space-between')} !important;
`;

const Title = styled.h2`
  background-color: rgba(208, 2, 27, 0.9) !important;
  color: #fff !important;
  font-size: 40px !important;
  line-height: 36px !important;
  margin: 0 20px 0 0 !important;
  padding: 10px 20px !important;
  text-decoration: none !important;
  width: calc(100% - 60px) !important;
`;

const NavTitle = styled.h3`
  color: #fff !important;
  font-size: 12px !important;
  line-height: 18px !important;
  margin: 0 !important;
  text-align: center !important;
  text-decoration: none !important;
  text-transform: uppercase !important;
`;

const Arrow = styled.img`
  background-color: #fff !important;
  display: ${(props) => (props.isNavItem === true ? 'none' : 'block')} !important;
  flex-shrink: 0 !important;
  padding: 10px !important;
  width: 40px !important;
`;

/**
 * <ImageSquare>
 *
 * Presents a square image with some text on top of it
 *
 * @param { string } imageSquareLink - Next path for the image square
 * @param { boolean } isNavItem - checks to see if this is being used as a nav item
 * @param { obj } handleMr - closes main menu when clicked
 * @param { string } source1X - image source for the bg image
 * @param { string } source2X - image source for the bg image, twice as big
 * @param { string } title - text that goes on top
 */
const ImageSquare = ({ handler, imageSquareLink, isNavItem, source1X, source2X, title }) => {
  return (
    <Link href={imageSquareLink} passHref onClick={handler && handler}>
      <BgImage
        height={isNavItem === true ? '150px' : '450px'}
        heightTablet={isNavItem === true ? '150px' : '450px'}
        heightDesktop={isNavItem === true ? '150px' : '450px'}
        imgsrc={source1X}
        margin={isNavItem === true ? '0 20px 2vh 20px' : '0'}
        quality={isNavItem === true ? 80 : 95}
        width={isNavItem === true ? '150px' : '100%'}
      >
        <ImageContentContainer isNavItem={isNavItem}>
          {isNavItem === true ? <NavTitle>{title}</NavTitle> : <Title>{title}</Title>}
          <Arrow isNavItem={isNavItem} src={ArrowIcon} />
        </ImageContentContainer>
      </BgImage>
    </Link>
  );
};

export default ImageSquare;
