import React from "react"
import styled from "styled-components"

import NavBar from '../global/navbar'

// spacer constrains the layout on big screens but keeps it tight on mobile
const Spacer = styled.section`
  margin: 2vh auto;
  padding: 0 4vw;

  @media (min-width: ${props => props.theme.lg}) {
    margin: 2vh 0;
    max-width: ${props => props.theme.lg};
  }
`
const Wrapper = ({ children }) => {
  return (
    <>
      <NavBar />
      <Spacer>
        { children }
      </Spacer>
    </>
  )
}

export default Wrapper