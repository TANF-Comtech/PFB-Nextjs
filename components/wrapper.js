import React, { useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import useSize from '@react-hook/size';
import useScrollPosition from '@react-hook/window-scroll';

import { linkResolver } from '~/utils';

import Logo from '~/components/logo';
import Button from '~/components/button';

// spacer constrains the layout on big screens but keeps it tight on mobile
const MainContent = styled.main`
  padding: ${(props) => (props.isWidePass ? `20vh 0 4vh 0` : `20vh 4vw 4vh 4vw`)} !important;
  min-height: 80vh !important;
`;

const Container = styled.section`
  margin: 2vh auto !important;
  max-width: ${(props) => props.theme.lg} !important;
`;

const Bar = styled.section`
  background-color: rgba(255, 255, 255, 0.98) !important;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2) !important;
  padding: 0 !important;
  position: fixed !important;
  left: 0 !important;
  top: 0 !important;
  right: 0 !important;
  transition: 0.5s all ${(props) => props.theme.cubicSmooth} !important;
  z-index: ${(props) => props.theme.zIndex02} !important;
`;

const TitleBarContainer = styled.div`
  display: flex !important;
  flex-direction: column !important;
  justify-content: space-between !important;
  margin: 0 auto !important;
  max-width: ${(props) => props.theme.lg} !important;
  padding: 0 4vw !important;

  @media screen and (min-width: 1250px) {
    padding: 0 !important;
  }
`;

const Content = styled.header`
  align-items: center !important;
  display: flex !important;
  justify-content: space-between !important;
  padding: 1vh 0 !important;
  // margin: 0 auto!important;
  max-width: 1200px !important;
`;

const LeftContent = styled.div`
  align-items: center !important;
  display: flex !important;
`;

const Title = styled.h2`
  margin: 0 0 0 10px !important;
  font-size: 30px !important;
  line-height: 30px !important;

  @media screen and (min-width: 320px) {
    font-size: calc(30px + 8 * ((100vw - 320px) / 880)) !important;
    line-height: calc(30px + 8 * ((100vw - 320px) / 880)) !important;
  }
  @media screen and (min-width: 1200px) {
    font-size: 38px !important;
    line-height: 38px !important;
  }

  a,
  a:visited,
  a:focus,
  a:active,
  a:hover {
    color: ${(props) => props.theme.black} !important;
  }
`;

const ProgressBar = styled.footer.attrs((props) => ({
  style: {
    backgroundColor: props.theme.blue,
    height: '4px',
    width: `${props.width}%`,
  },
}))``;

/**
 * <Titlebar>
 *
 * Titlebar component gives the user context as they scroll down a page
 * The component shows the logo with the content title next to it, pretty simple
 * We're receiving the text that goes into the as regular content, so through {children}
 *
 * We're also receiving progressHeight, which is the height of the MainContent wrapper
 * This helps us build the left > right process bar animation as the user scrolls a page
 * Nice little visual flourish to help us along
 *
 * @param {object} children - inherited nested components, core React idea
 * @param {number} mainHeight - height of main content element
 * @param {number} footerHeight - height of footer content element (not active, but hopefully in the future)
 *
 */
function Titlebar({ children, mainHeight }) {
  const scrollY = useScrollPosition(60);

  return (
    <Bar className={scrollY > 600 && scrollY < mainHeight - 300 ? 'isVisibleY' : 'isHiddenY'}>
      <TitleBarContainer>
        <Content>
          <LeftContent>
            <Link href="/">
              <a>
                <Logo logoMargin="0" logoWidth="5vh" logoViewbox="60 0 150 132" />
              </a>
            </Link>
            <Title>{children}</Title>
          </LeftContent>
          <Button
            buttonBg="#D23823"
            buttonBgHover="#D0021B"
            buttonBorder="none"
            buttonColor="white"
            buttonColorHover="white"
            buttonFontSize="18px"
            buttonPadding="10px 20px"
            buttonTextTransform="inherit"
            href="/join"
          >
            Join Us
          </Button>
        </Content>
      </TitleBarContainer>
      {/* detecting where a user is on the page, divide by height of container - dynamic position */}
      <ProgressBar width={(scrollY / (mainHeight - 300)) * 100} />
    </Bar>
  );
}

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
      {/* {postPath && postTitle && (
        <Titlebar mainHeight={Math.round(mainHeight)}>
          <Link href={postPath} passHref>
            <a>{postTitle}</a>
          </Link>
        </Titlebar>
      )} */}
      <MainContent ref={mainTarget} isWidePass={isWide}>
        {isWide ? <> {children} </> : <Container> {children} </Container>}
      </MainContent>
    </>
  );
};

export default Wrapper;
