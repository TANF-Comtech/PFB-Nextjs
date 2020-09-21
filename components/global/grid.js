import React from "react"
import styled from "styled-components"

const MainContainer = styled.section`
  display: grid;
  grid-gap: 2vw;
  grid-template-columns: 1fr;

  @media( min-width: ${(props) => props.theme.sm} ) {
    grid-template-columns: 1fr 1fr;
  }

  @media( min-width: ${(props) => props.theme.lg} ) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  a, a:focus, a:visited, a:hover {
    text-decoration: none;
  }
`;

const Grid = ({ children }) => {
  return (
    <>
      <MainContainer>
        {children}
      </MainContainer>
    </>
  )
}

export default Grid