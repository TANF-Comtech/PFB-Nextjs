import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import hero from '../../public/sample-images/PFB_HERO_IMAGE_03_BLUE.png';

// set number of circles on top of image
const circles = 4;

// precise placements
const circleArr = [
  [150, 135, 90],
  [38, 150, 225],
  [15, 75, 225],
  [90, 38, 60],
];

// keyframe
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeSlide = keyframes`
  0% {
    opacity: 0;
    transform: translate(0px, 0px) rotateX(0deg) rotateY(0deg) translateX(-100%);
  }
  100% {
    opacity: 1;
    transform: translate(0px, 0px) rotateX(0deg) rotateY(0deg) translateX(0);
  }
`;

const fadeInSlow = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.3;
  }
`;

// Styles
const Wrapper = styled.section`
  align-items: center;
  display: flex;
  justify-content: center;
  height: 400px;
`;

const Container = styled.section`
  align-items: center;
  display: flex;
  height: 240px;
  justify-content: center;
  position: relative;
  width: 360px;

  > * {
    backface-visibility: hidden;
    position: absolute;
    transition: 1s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
`;

const HeroBanner = styled.div`
  animation: ${fadeSlide} 0.75s ease forwards;
  animation-delay: 1s;
  background-color: rgb(1, 163, 258);
  border-radius: 150px;
  mix-blend-mode: multiply;
  height: 300px;
  opacity: 0;
  transform: translate(0px, 0px) rotateX(0deg) rotateY(0deg) translateX(0%);
  width: 300px;
  z-index: 1;

  &:hover {
    transform: translate(0px, 0px) rotateX(-1deg) rotateY(10deg) translateX(0%);
  }
`;

const HeroImage = styled.div`
  animation: ${fadeIn} 0.75s ease forwards;
  animation-delay: 0.6s;
  background-image: url(${hero});
  background-size: cover;
  height: 400px;
  opacity: 0;
  width: 227px;
  z-index: 2;
`;

const HeroCircleContainer = styled.section`
  border-radius: 150px;
  height: 300px;
  position: relative;
  width: 300px;
  z-index: 3;
`;

const HeroCircle = styled.div`
  animation: ${fadeInSlow} 1.25s ease forwards;
  animation-delay: 1.5s;
  background-color: white;
  border-radius: calc(${(props) => props.cirSize}px / 2);
  height: ${(props) => props.cirSize}px;
  left: ${(props) => props.left}px;
  mix-blend-mode: multiply;
  opacity: 0;
  position: absolute;
  transform: translate(0px, 0px) rotateX(0deg) rotateY(0deg);
  top: ${(props) => props.top}px;
  width: ${(props) => props.cirSize}px;
  z-index: 4;
`;

// Component
export default function Graphic({ source }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, [loading]);

  return (
    <Wrapper>
      <Container>
        {loading === true && <HeroImage />}
        {loading === true && <HeroBanner />}
        {loading === true && (
          <HeroCircleContainer>
            {[...Array(circles)].map((circle, i) => {
              return (
                <HeroCircle
                  cirSize={circleArr[i][0]}
                  top={circleArr[i][1]}
                  left={circleArr[i][2]}
                  key={i}
                />
              );
            })}
          </HeroCircleContainer>
        )}
      </Container>
    </Wrapper>
  );
}
