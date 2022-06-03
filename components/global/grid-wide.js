import React from 'react';
import styled from 'styled-components';

// minmax makes the content respect the size of the columns
const MainContainer = styled.section`
  background-color: ${(props) => props.gridGapColor || 'transparent'};
  display: grid;
  grid-gap: ${(props) => props.gridGap || '2vw'};
  grid-template-columns: repeat(1, minmax(0, 1fr));

  @media (min-width: ${(props) => props.theme.md}) {
    grid-template-columns: ${(props) =>
      props.isOneItem ? 'repeat(1, minmax(0, 1fr))' : 'repeat(2, minmax(0, 1fr))'};
  }

  a,
  a:focus,
  a:visited,
  a:hover {
    text-decoration: none;
  }
`;

/**
 * <GridWide>
 *
 * You guessed it, it's a wide version of <Grid>
 * This component acts as a CSS Grid wrapper to any set of elements
 * It will accept a bunch of stuff via { children } so be careful
 * Very useful, very simple.
 *
 * @param { object } children - nested components beneath this component
 * @param { object } gridGap - how big of a gap in the grid you want (default: 2vw)
 * @param { object } gridGapColor - you can apply a color to the background for a grid
 * @param { bool } isOneItem - lets you know if the system has only one sponsor
 *
 */
const GridWide = ({ children, gridGap, gridGapColor, isOneItem = false }) => {
  return (
    <>
      <MainContainer gridGap={gridGap} gridGapColor={gridGapColor} isOneItem={isOneItem}>
        {children}
      </MainContainer>
    </>
  );
};

export default GridWide;
