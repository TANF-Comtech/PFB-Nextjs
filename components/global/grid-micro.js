import React from "react"
import styled from "styled-components"

const MainContainer = styled.section`
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 1fr 1fr;

  a, a:focus, a:visited, a:hover {
    text-decoration: none;
  }
`;

const GridMicro = ({ children }) => {
  return (
    <>
      <MainContainer>
        {children}
      </MainContainer>
    </>
  )
}

export default GridMicro