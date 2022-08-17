import React from 'react';
import styled from 'styled-components';

const MainContainer = styled.section`
  padding: ${(props) => props.padding || '5px 0'};
`;

const Sizer = styled.div`
  background-color: ${(props) => props.bgColor || props.theme.lightestGray};
  height: 1px;
  margin: 0 auto;
  max-width: ${(props) => props.maxWidthMobile || props.theme.lg};

  @media (min-width: ${(props) => props.theme.sm}) {
    max-width: ${(props) => props.maxWidth || props.theme.lg};
  }
`;

/**
 * <Rule>
 *
 * Horizontal rule that you can adjust the width of.
 * Very useful, very simple.
 *
 * @param { string } bgColor - color for background (default: none)
 * @param { string } className - should allow styled-components to pass down it's styles
 * @param { string } maxWidth - however wide you want the rule (default is 1200px)
 * @param { string } maxWidthMobile - however wide you want the rule on phones
 * @param { string } padding - if you want it come in a bit on the sides (default: 5px 0)
 *
 */
const Rule = ({ bgColor, className, maxWidth, maxWidthMobile, padding }) => {
  return (
    <>
      <MainContainer bgColor={bgColor} className={className} padding={padding}>
        <Sizer maxWidth={maxWidth} maxWidthMobile={maxWidthMobile} />
      </MainContainer>
    </>
  );
};

export default Rule;
