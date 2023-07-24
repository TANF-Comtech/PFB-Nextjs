import React from 'react';
import styled from 'styled-components';

import MainContent from '~/components/main-content';

const Background = styled.header`
  background-color: ${(props) => props.bgColor || props.theme.midnightBlue} !important;
  color: ${(props) => props.color || 'white'} !important;

  h1 {
    color: ${(props) => props.color || 'white'} !important;
    text-transform: uppercase !important;
  }

  li {
    list-style-type: disc !important;
    padding-left: 10px !important;
  }
`;

/**
 * <BigTitleBanner>
 *
 * Give those pages some pop! Put a big title banner at the top.
 *
 * @param { string } bgColor - background color for element (default: midnight blue)
 * @param { string } color - text color (default: white)
 * @param { object } children - React child elements
 */

const BigTitleBanner = ({ bgColor, color, children }) => {
  return (
    <Background bgColor={bgColor} color={color}>
      <MainContent>{children}</MainContent>
    </Background>
  );
};

export default BigTitleBanner;
