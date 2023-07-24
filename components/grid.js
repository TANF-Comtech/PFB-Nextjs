import React from 'react';
import styled from 'styled-components';

const MainContainer = styled.section`
  display: grid !important;
  grid-gap: ${(props) => props.gridGap || '2vw'} !important;
  grid-template-columns: 1fr !important;

  @media (min-width: ${(props) => props.theme.sm}) {
    grid-template-columns: 1fr 1fr !important;
  }

  @media (min-width: ${(props) => props.theme.lg}) {
    grid-template-columns: 1fr 1fr 1fr !important;
  }

  a,
  a:focus,
  a:visited,
  a:hover {
    text-decoration: none !important;
  }
`;

/**
 * <Grid>
 *
 * This component acts as a CSS Grid wrapper to any set of elements
 * It will accept a bunch of stuff via { children } so be careful
 * Very useful, very simple.
 *
 * @param { object } children - nested components beneath this component
 * @param { object } gridGap - how big of a gap in the grid you want (default: 2vw)
 *
 */
const Grid = ({ children, gridGap }) => {
  return (
    <>
      <MainContainer gridGap={gridGap}>{children}</MainContainer>
    </>
  );
};

export default Grid;
