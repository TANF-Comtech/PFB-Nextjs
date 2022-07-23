import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import BgImage from '../primitives/bg-image';

import ArrowIcon from '../../public/red-arrow.svg';

const ImageContentContainer = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: ${(props) => (props.isNavItem === true ? 'center' : 'space-between')};
`;

const Title = styled.h2`
  background-color: rgba(208, 2, 27, 0.9);
  color: #fff;
  font-size: 40px;
  line-height: 36px;
  margin: 0 20px 0 0;
  padding: 10px 20px;
  text-decoration: none !important;
  width: calc(100% - 60px);
`;

const NavTitle = styled.h3`
  color: #fff;
  font-size: 12px;
  line-height: 18px;
  margin: 0;
  text-align: center;
  text-decoration: none !important;
  text-transform: uppercase;
`;

const Arrow = styled.img`
  background-color: #fff;
  display: ${(props) => (props.isNavItem === true ? 'none' : 'block')};
  flex-shrink: 0;
  padding: 10px;
  width: 40px;
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
    <Link href={imageSquareLink} passHref>
      <a onClick={handler && handler}>
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
      </a>
    </Link>
  );
};

export default ImageSquare;
