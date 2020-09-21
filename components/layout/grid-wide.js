import React from "react"
import styled from "styled-components"

// minmax makes the content respect the size of the columns
const MainContainer = styled.section`
  display: grid;
  grid-gap: 2vw;
  grid-template-columns: repeat(1, minmax(0, 1fr));

  @media( min-width: ${(props)  => props.theme.md} ) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  a, a:focus, a:visited, a:hover {
    text-decoration: none;
  }
`;

const GridWide = ({ children }) => {
  return (
    <>
      <MainContainer>
        {children}
      </MainContainer>
    </>
  )
}

export default GridWide