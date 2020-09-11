import React from "react"
import styled from "styled-components"

const MainContainer = styled.section`
  padding: 2vh 4vw; 
`;

const Sizer = styled.div`
  margin: 2vh auto;
  max-width: ${(props) => props.theme.lg};
`;

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