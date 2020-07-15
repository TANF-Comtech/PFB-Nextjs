import React, { useRef } from "react"
import styled from "styled-components"
import useSize from "@react-hook/size";

import NavBar from '../global/navbar'
import Titlebar from '../global/titlebar'
import Footer from '../global/footer'

// spacer constrains the layout on big screens but keeps it tight on mobile
const MainContent = styled.main`
  padding: 14vh 4vw 4vh 4vw; /* slightly bigger pad on bottom than top */
`

const Container = styled.section`
  margin: 2vh auto;
  max-width: ${(props) => props.theme.lg};
`;

/**
 * <Wrapper>
 *
 * Wrapper serves to wrap all pages in a consistent style
 * We've got our Header (NavBar), Main (MainContent), Footer (FooterArea)
 * In the main section, we have the "flow" class gives us some nice automatic padding around sibling elements
 *
 * @param {object} children - inherited nested components, core React idea
 * @param {text} postTitle - actual title of content of page, feeds into Titlebar component
 * 
 */
const Wrapper = ({ children, postTitle }) => {

  /* useSize hook gives us the dimensions of the target element (wherever you apply `ref`) */
  /* See example: https://github.com/jaredLunde/react-hook/tree/master/packages/size */
  const mainTarget = useRef(null);
  const [mainWidth, mainHeight] = useSize(mainTarget, {
    initialWidth: 0,
    initialHeight: 0
  });

  return (
    <>
      <Titlebar 
        mainHeight={ Math.round(mainHeight) }
      >
        { postTitle }
      </Titlebar>
      <NavBar />
      <MainContent ref={ mainTarget }>
        <Container>
          { children }
        </Container>
      </MainContent>
      <Footer />
    </>
  );
};

export default Wrapper;
