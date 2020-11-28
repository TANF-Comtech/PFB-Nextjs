import React from "react"
import styled from "styled-components"

const MainContainer = styled.section`
  padding: 2vh 4vw; 
`;

const Sizer = styled.div`
  margin: 2vh auto;
  max-width: ${(props) => props.theme.lg};
`;

/**
 * <MainContent>
 * 
 * For pages where <Wrapper> is full-width, you probably want some sections tight
 * This component just brings content sections inline with the max-width around the site
 * Very useful, very simple.
 * 
 * @param { object } children - nested components beneath this component
 * 
 */
const MainContent = ({ children }) => {
  return (
    <>
      <MainContainer>
        <Sizer>{children}</Sizer>
      </MainContainer>
    </>
  )
}

export default MainContent