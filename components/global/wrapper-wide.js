import React, { useRef } from "react";
import styled from "styled-components";
import useSize from "@react-hook/size";

import Titlebar from "../global/titlebar"

// spacer constrains the layout on big screens but keeps it tight on mobile
const MainContent = styled.main`
  padding: 14vh 0 4vh 0; /* slightly bigger pad on bottom than top */
  min-height: 80vh;
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
const WideWrapper = ({ children, postTitle }) => {
  /* useSize hook gives us the dimensions of the target element (wherever you apply `ref`) */
  /* See example: https://github.com/jaredLunde/react-hook/tree/master/packages/size */
  const mainTarget = useRef(null);
  const [mainWidth, mainHeight] = useSize(mainTarget, {
    initialWidth: 0,
    initialHeight: 0,
  });

  return (
    <>
      <Titlebar mainHeight={Math.round(mainHeight)}>{postTitle}</Titlebar>
      <MainContent ref={mainTarget}>
        {children}
      </MainContent>
    </>
  );
};

export default WideWrapper;
