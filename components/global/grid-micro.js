import React from "react"
import styled from "styled-components"

const MainContainer = styled.section`
  display: grid;
  grid-gap: ${props => props.gridGap || '15px'}; 
  grid-template-columns: 1fr;

  @media( min-width: ${(props) => props.theme.xs} ) {
    grid-template-columns: 1fr 1fr;
  }

  a, a:focus, a:visited, a:hover {
    text-decoration: none;
  }
`;

/**
 * <GridMicro>
 * 
 * This is a small version of <Grid> so...
 * it acts as a CSS Grid wrapper to any set of elements 
 * It will accept a bunch of stuff via { children } so be careful
 * Very useful, very simple.
 * 
 * @param { object } children - nested components beneath this component
 * @param { object } gridGap - how big of a gap in the grid you want (default: 2vw)
 * 
 */
const GridMicro = ({ children, gridGap }) => {
  return (
    <>
      <MainContainer gridGap={ gridGap }>
        {children}
      </MainContainer>
    </>
  )
}

export default GridMicro