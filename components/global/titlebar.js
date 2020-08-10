import React from "react";
import styled from "styled-components";
import Link from "next/link"
import useScrollPosition from '@react-hook/window-scroll'

import Logo from "../global/logo"
import Button from "../global/button"

const Bar = styled.section`
  background-color: rgba(255, 255, 255, 0.98);
  box-shadow: 0 2px 5px rgba(0,0,0,.2);
  padding: 0;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  transition: 0.5s all ${props => props.theme.cubicSmooth};
  z-index: ${props => props.theme.zIndex02};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  max-width: ${props => props.theme.lg};
  padding: 0 4vw;

  @media screen and (min-width: 1200px) {
    padding: 0;
  }
`

const Content = styled.header`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 1vh 0;
`;

const LeftContent = styled.div`
  align-items: center;
  display: flex;
`

const Title = styled.h2`
  margin-left: 10px;
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
`

const ProgressBar = styled.footer`
  background-color: ${props => props.theme.blue};
  height: 4px;
  width: ${props => props.width}%;
`

const JoinButton = styled.a`
  
  
  @media (min-width: 768px) {
    display: inherit;  
  }
`

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
 * @param {number} footerHeight - height of footer content element (not active, but hopefully int he future)
 * 
 */
function Titlebar({ 
  children, 
  mainHeight
}) {
  const scrollY = useScrollPosition(60);

  return (
    <>
      <Bar className={
        scrollY > 800 && scrollY < (mainHeight - 800) ? 
          ('isVisibleY') : ('isHiddenY') 
      }>
        <Container>
          <Content>
            <LeftContent>
              <Logo
                logoMargin="0"
                logoWidth="5vh"
              />
              <Title>
                { children }
              </Title>
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
              href="/"
            >Join Us</Button>
          </Content>
        </Container>
        {/* detecting where a user is on the page, divide by height of container - dynamic position */}
        <ProgressBar width={ (scrollY / (mainHeight - 800)) * 100 } />
      </Bar>
    </>
  );
}

export default Titlebar;