import React from "react"
import styled from "styled-components"

import HeaderSample from '../../public/sample-images/PFB_GrantFinder_2300x800.jpg'

const ResponsiveImage = styled.section`
  align-items: center;
  background-image: url(${HeaderSample});
  background-size: cover;
  display: flex;
  justify-content: center;
  height: 70vh;
  margin-bottom: 1vh;
  padding: 0;

  h1 {
    color: #fff;
  }
`
const HeaderImage = () => {
  return (
    <>
      <ResponsiveImage>
        <h1>Biking for Everyone</h1>
      </ResponsiveImage>
    </>
  )
}

export default HeaderImage