import React from "react"
import styled from "styled-components"

const Heading = styled.h1`
  margin: 4vh 0;
  padding: 0;

  @media (min-width: ${props => props.theme.lg}) {
    padding: 0;
  }
`
const Heading1 = ({ children }) => {
  return (
    <>
      <Heading>
        { children }
      </Heading>
    </>
  )
}

export default Heading1