import React from "react"
import styled from "styled-components"

const MainContainer = styled.section`
  padding: 2vh 4vw; 
`;

const Sizer = styled.div`
  margin: 2vh auto;
  max-width: ${props => props.maxWidth || props.theme.lg};
`;

/**
 * <MainContent>
 * 
 * For pages where <Wrapper> is full-width, you probably want some sections tight
 * This component just brings content sections inline with the max-width around the site
 * Very useful, very simple.
 * 
 * @param { object } children - nested components beneath this component
 * @param { string } maxWidth - however wide you want the container (default is 1200px)
 * 
 */
const MainContent = ({ children, maxWidth }) => {
  return (
    <>
      <MainContainer maxWidth={maxWidth} >
        <Sizer>{children}</Sizer>
      </MainContainer>
    </>
  )
}

export default MainContent