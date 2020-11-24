import React, { useRef } from "react";
import Link from "next/link"
import { useRouter } from "next/router"
import styled from "styled-components";
import useSize from "@react-hook/size";

import { linkResolver } from '../../lib/utils'

import Titlebar from "../global/titlebar";

// spacer constrains the layout on big screens but keeps it tight on mobile
const MainContent = styled.main`
  padding: ${ props => props.isWidePass ? `14vh 0 4vh 0` : `14vh 4vw 4vh 4vw` };
  min-height: 80vh;
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
 * @param {boolean} isWide - how wide of a container we want (true = full width || false = 1200px)
 * @param {text} postPath - link to parent category of content, giving user access to last level of info
 * @param {text} postTitle - actual title of content of page, feeds into Titlebar component
 *
 */
const Wrapper = ({ children, isWide, postPath, postTitle }) => {
  /* useSize hook gives us the dimensions of the target element (wherever you apply `ref`) */
  /* See example: https://github.com/jaredLunde/react-hook/tree/master/packages/size */
  const mainTarget = useRef(null);
  const [mainWidth, mainHeight] = useSize(mainTarget, {
    initialWidth: 0,
    initialHeight: 0,
  });

  return (
    <>
      { (postPath && postTitle) &&
        <Titlebar mainHeight={Math.round(mainHeight)}>
          <Link href={ postPath } passHref>
            <a>{ postTitle }</a>
          </Link>        
        </Titlebar>
      }
      <MainContent 
        ref={ mainTarget }
        isWidePass={ isWide }
      >
        { isWide 
          ? ( <> { children } </> )
          : ( <Container> { children } </Container> )
        }
      </MainContent>
    </>
  );
};

export default Wrapper;
