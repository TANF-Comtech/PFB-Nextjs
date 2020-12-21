import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import useScrollPosition from '@react-hook/window-scroll'
import Link from 'next/link'

import logoutRequest from "../../lib/auth/logoutRequest"
import Router from 'next/router'

import LogoVertical from "../global/logo-vertical"
import NavMenu from "../global/navmenu"
import SearchButton from '../primitives/search-button'
import AuthContext from "../../context/auth/auth-context"

const Bar = styled.section`
  align-items: center;
  background-color: rgba(255, 255, 255, 0.98);
  box-shadow: 0 2px 5px rgba(0,0,0,.2);
  display: flex;
  justify-content: space-between;
  padding: 1vh 10px;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  min-height: 12vh;
  transition: 0.5s all ${props => props.theme.cubicSmooth};
  z-index: ${props => props.theme.zIndex02};

  @media(min-width: ${props => props.theme.xs}) {
    padding: 1vh 4vw 1vh 4vw;
  }
`;

const Container = styled.header`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: ${props => props.theme.lg};
  width: 100%;
`;

const RightContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const BlueButton = styled.div`
  align-items: center;
  background-color: ${props => props.theme.midnightBlue};
  border-radius: 10px;
  color: white;
  cursor: pointer;
  display: flex;
  font-family: ${props => props.theme.montserrat};
  font-size: 14px;
  font-weight: 700;
  justify-content: space-around;
  min-width: 100px;
  margin: 0;
  padding: 8px;
  text-align: center;
  text-transform: uppercase;

  @media(min-width: ${props => props.theme.xs}) {
    font-size: 16px;
    padding: 8px 12px;
  }

  @media(min-width: ${props => props.theme.sm}) {
    font-size: 18px;
    padding: 10px 25px;
    width: 170px;
  }
`

const GhostLink = styled.a`
  text-decoration: none;

  &:hover, &::visited {
    text-decoration: none;
  }
`

const MenuButton = styled.svg`
  cursor: pointer;
  display: none;
  fill: white;
  height: 22px;
  margin: 0 8px 0 0;
  width: 22px;

  @media screen and (min-width: 768px) {
    display: block;
  }
`;

function NavBar() {

  const authContext = useContext(AuthContext)

  // Capture scroll position, so we can know when to fade out navbar
  const scrollY = useScrollPosition();

  // Menu opening state change, send down men
  const [menu, setMenu] = useState(false);
  const handleMenu = () => {
    setMenu(!menu);
  };

  const logout = () =>{
    logoutRequest().then(data => {
      if(data.status===true){
        authContext.updateAuthContext({"user":{
            "email": data?.email,
            "name": data?.name,
            "affiliation":data?.affiliation,
        },
        "loggedIn":false
      });
      Router.push('/')
      }   
      })
  }
  

  useEffect( () => {
    if(menu === true) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }
  })

  return (
    <>
      <Bar className={scrollY < 500 ? ('isVisibleY') : ('isHiddenY') } >
        <Container>
          <BlueButton
            menuState={ menu }
            onClick={ handleMenu }
          >
            <MenuButton
              viewBox="0 0 32 32"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z" />
            </MenuButton>
            Explore
          </BlueButton>

          <Link as='/' href='/'>
            <a>
              <LogoVertical
                logoWidth="7vh"
                logoViewboxPassdown="0 0 270 132"
                logoTypeWidth="12vh"
              />
            </a>
          </Link>

          <RightContainer>            
            {!authContext.loggedIn ? (
              <Link href="/log-in">
                <GhostLink>
                  <BlueButton>Log-in</BlueButton>
                </GhostLink>
              </Link>
            ):(
              <GhostLink>
                <BlueButton onClick={()=>{logout()}}>Log-out</BlueButton>
              </GhostLink>
            )}
          </RightContainer>
        </Container>
      </Bar>
      <NavMenu 
        menuState={ menu }
        handleMenu={ handleMenu }
      />
    </>
  );
}

export default NavBar;
