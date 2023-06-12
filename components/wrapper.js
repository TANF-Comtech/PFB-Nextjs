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
  padding: ${(props) => (props.isWidePass ? `20vh 0 4vh 0` : `20vh 4vw 4vh 4vw`)};
  min-height: 80vh;
`;

const Container = styled.section`
  margin: 2vh auto;
  max-width: ${(props) => props.theme.lg};
`;

const Bar = styled.section`
  background-color: rgba(255, 255, 255, 0.98);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  padding: 0;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  transition: 0.5s all ${(props) => props.theme.cubicSmooth};
  z-index: ${(props) => props.theme.zIndex02};
`;

const TitleBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  max-width: ${(props) => props.theme.lg};
  padding: 0 4vw;

  @media screen and (min-width: 1250px) {
    padding: 0;
  }
`;

const Content = styled.header`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 1vh 0;
  // margin: 0 auto;
  max-width: 1200px;
`;

const LeftContent = styled.div`
  align-items: center;
  display: flex;
`;

const Title = styled.h2`
  margin: 0 0 0 10px;
  font-size: 30px;
  line-height: 30px;

  @media screen and (min-width: 320px) {
    font-size: calc(30px + 8 * ((100vw - 320px) / 880));
    line-height: calc(30px + 8 * ((100vw - 320px) / 880));
  }
  @media screen and (min-width: 1200px) {
    font-size: 38px;
    line-height: 38px;
  }

  a,
  a:visited,
  a:focus,
  a:active,
  a:hover {
    color: ${(props) => props.theme.black};
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
