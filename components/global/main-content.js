import React from "react"
import styled from "styled-components"

const Container = styled.section`
  margin: 2vh 0;
  padding: 0;

  @media (min-width: ${props => props.theme.lg}) {
    padding: 0;
  }
`
const MainContent = ({ children }) => {
  return (
    <>
      <Container className="flow">
        { children }
      </Container>
    </>
  )
}

export default MainContent