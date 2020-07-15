import React from "react";
import styled from "styled-components";

import NavBar from "../global/navbar";
import Footer from "../global/footer";

// spacer constrains the layout on big screens but keeps it tight on mobile
const MainContent = styled.main`
  padding: 2vh 4vw 4vh 4vw; /* slightly bigger pad on bottom than top */
`;

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
 *
 */
const Wrapper = ({ children }) => {
  return (
    <>
      <NavBar />
      <MainContent>
        <Container>{children}</Container>
      </MainContent>
      <Footer />
    </>
  );
};

export default Wrapper;
