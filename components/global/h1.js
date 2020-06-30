import React from "react"
import styled from "styled-components"

// spacer constrains the layout on big screens but keeps it tight on mobile
const Heading = styled.h1`
  margin: 2vh 0;
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