import React from 'react';
import styled, { keyframes } from 'styled-components';

const skChase = keyframes`
  100% { transform: rotate(360deg) !important; }
`;

const skChaseDot = keyframes`
  80%, 100% { transform: rotate(360deg) !important; }
`;

const skChaseDotBefore = keyframes`
  50% {
    transform: scale(0.4) !important;
  } 100%, 0% {
    transform: scale(1.0) !important;
  }
`;

const Background = styled.main`
  align-items: center !important;
  background-color: ${(props) => (props.bgColor ? props.bgColor : '#fff')} !important;
  display: flex !important;
  justify-content: center !important;
  min-height: ${(props) => (props.minHeight ? props.minHeight : '80vh')} !important;
`;

const Container = styled.section`
  animation: ${skChase} 2.5s infinite linear both !important;
  height: 40px !important;
  position: relative !important;
  width: 40px !important;
`;

const Dot = styled.div`
  animation: ${skChaseDot} 2s infinite ease-in-out both !important;
  height: 100% !important;
  left: 0 !important;
  position: absolute !important;
  top: 0 !important;
  width: 100% !important;

  &:before {
    animation: ${skChaseDotBefore} 2s infinite ease-in-out both !important;
    background-color: #333 !important;
    border-radius: 100% !important;
    content: '' !important;
    display: block !important;
    height: 25% !important;
    width: 25% !important;
  }

  &:nth-child(1) {
    animation-delay: -1.1s !important;
  }
  &:nth-child(2) {
    animation-delay: -1s !important;
  }
  &:nth-child(3) {
    animation-delay: -0.9s !important;
  }
  &:nth-child(4) {
    animation-delay: -0.8s !important;
  }
  &:nth-child(5) {
    animation-delay: -0.7s !important;
  }
  &:nth-child(6) {
    animation-delay: -0.6s !important;
  }
  &:nth-child(1):before {
    animation-delay: -1.1s !important;
  }
  &:nth-child(2):before {
    animation-delay: -1s !important;
  }
  &:nth-child(3):before {
    animation-delay: -0.9s !important;
  }
  &:nth-child(4):before {
    animation-delay: -0.8s !important;
  }
  &:nth-child(5):before {
    animation-delay: -0.7s !important;
  }
  &:nth-child(6):before {
    animation-delay: -0.6s !important;
  }
`;

/**
 * <Spinner>
 *
 * Add a loading spinner to any template you need.
 * The spinner is based off of the SpinKit project
 * https://github.com/tobiasahlin/SpinKit
 *
 */

const Spinner = ({ bgColor, minHeight }) => {
  return (
    <Background bgColor={bgColor} minHeight={minHeight}>
      <Container>
        <Dot />
        <Dot />
        <Dot />
        <Dot />
        <Dot />
        <Dot />
      </Container>
    </Background>
  );
};

export default Spinner;
