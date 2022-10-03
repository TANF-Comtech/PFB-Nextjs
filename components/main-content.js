import React from 'react';
import styled from 'styled-components';

const MainContainer = styled.section`
  background-color: ${(props) => props.bgColor || 'transparent'};
  color: ${(props) => props.textColor || 'black'};
  padding: ${(props) => props.contentPadding || '2vh 4vw'};
`;

const Sizer = styled.div`
  margin: 0 auto;
  max-width: ${(props) => props.maxWidth || props.theme.lg};

  li {
    list-style-type: disc;
    padding-left: 10px;
  }
`;

/**
 * <MainContent>
 *
 * For pages where <Wrapper> is full-width, you probably want some sections tight
 * This component just brings content sections inline with the max-width around the site
 * Very useful, very simple.
 *
 * @param { string } bgColor - color for background (default: none)
 * @param { object } children - nested components beneath this component
 * @param { string } contentPadding - how much you want, yo? (default 2vh 4vw)
 * @param { string } className - should allow styled-components to pass down it's styles
 * @param { string } maxWidth - however wide you want the container (default is 1200px)
 * @param { string } textColor - color for text (default: black)
 *
 */
const MainContent = ({ bgColor, children, className, contentPadding, textColor, maxWidth }) => {
  return (
    <>
      <MainContainer
        bgColor={bgColor}
        className={className}
        contentPadding={contentPadding}
        textColor={textColor}
      >
        <Sizer maxWidth={maxWidth}>{children}</Sizer>
      </MainContainer>
    </>
  );
};

export default MainContent;
