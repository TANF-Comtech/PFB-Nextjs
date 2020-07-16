import React from "react";
import styled from "styled-components";
import useScrollPosition from '@react-hook/window-scroll'

import LogoVertical from "../global/logo-vertical"

// Animation position applied from styles/global-css.js - see animation section
const Bar = styled.section`
  background-color: rgba(255, 255, 255, 0.98);
  box-shadow: 0 2px 5px rgba(0,0,0,.2);
  padding: 1vh 4vw 1vh 4vw;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  min-height: 12vh;
  transition: 0.5s all ${props => props.theme.cubicSmooth};
  z-index: ${props => props.theme.zIndex02};
`;

const Container = styled.header`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: ${props => props.theme.lg};
`;

const MenuButton = styled.svg`
  cursor: pointer;
  height: 32px;
  width: 32px;
`;

const SearchButton = styled.svg`
  cursor: pointer;
  height: 32px;
  width: 32px;
`;

function NavBar() {
  // Capture scroll position, so we can know when to fade out navbar
  const scrollY = useScrollPosition();

  return (
    <>
      <Bar className={scrollY < 500 ? ('isVisibleY') : ('isHiddenY') } >
        <Container>
          <MenuButton
            viewBox="0 0 32 32"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z" />
          </MenuButton>
          <LogoVertical
            logoWidth="7vh"
            logoTypeWidth="14vh"
          />
          <SearchButton
            viewBox="1 -1 100 100"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M72.1,64.2c4.8-6,7.4-13.5,7.4-21.3c0-19-15.5-34.4-34.5-34.4C26,8.6,10.5,24,10.5,43S26,77.4,44.9,77.4  c7.6,0,15.1-2.6,21.3-7.4l20.7,20.7l5.9-5.9L72.1,64.2z M44.9,69.2c-14.4,0-26.1-11.7-26.1-26.1C18.8,28.7,30.5,17,44.9,17  C59.3,17,71,28.7,71,43.1C71,57.5,59.3,69.2,44.9,69.2z" />
          </SearchButton>
        </Container>
      </Bar>
    </>
  );
}

export default NavBar;
