import React, { useContext, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Link from 'next/link';
import { useQuery } from '@apollo/client';

import { MENU_DATA } from '../../lib/apollo/menu-queries';

import AuthContext from '../../context/auth/auth-context';
import logoutRequest from '../../lib/auth/logoutRequest';

import Logo from './logo';
import LogoType from './logotype';
import NavAccordion from './nav-accordion';
import DropdownList from './dropdown-list';

const NavContainer = styled.nav`
  background-color: ${(props) => props.theme.midnightBlue};
  bottom: 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  color: #fff;
  max-width: ${(props) => props.theme.xs};
  min-width: 320px;
  min-height: 100vh;
  overflow: auto;
  position: fixed;
  right: 0;
  top: 0;
  transition: 0.4s ease-in-out;
  transform: ${(props) => (props.menuState ? 'translateX(0)' : 'translateX(100%)')};
  will-change: transform;
  z-index: ${(props) => props.theme.zIndex05};
`;

const NavOverlay = styled.section`
  background-color: ${(props) => props.theme.black};
  min-height: 100vh;
  opacity: ${(props) => (props.menuState ? '0.8' : '0')};
  transition: all 0.4s ease-in-out;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  visibility: ${(props) => (props.menuState ? 'visible' : 'hidden')};
  z-index: ${(props) => props.theme.zIndex04};
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const MenuHeader = styled(Link)`
  align-items: center;
  display: flex;
  justify-content: space-between;

  a,
  a:focus,
  a:visited,
  a:hover {
    color: black;
    text-decoration: none;
  }
`;

const LogoContainer = styled.section`
  align-items: flex-end;
  animation: ${fadeIn} 0.75s ease forwards;
  animation-delay: 0.4s;
  display: flex;
  opacity: 0;
  padding: 25px 25px 0 25px;
`;

const MainNav = styled.ul`
  animation: ${fadeIn} 0.75s ease forwards;
  animation-delay: 0.6s;
  list-style: none;
  margin: 0;
  opacity: 0;
  padding: 25px;

  a,
  a:visited,
  a:focus,
  a:active {
    color: #fff;
    text-decoration: none;
    transition: 0.2s ease-in-out;
  }
  a:hover {
    text-decoration: none;
  }
`;

const MainNavItem = styled.li`
  cursor: pointer;
  font-size: 46px;
  font-family: ${(props) => props.theme.dharma};
  font-weight: 300;
  line-height: 42px;
  padding: 1vh 0;
`;

const AnchorAlign = styled.a`
  align-items: center;
  display: flex;

  svg {
    fill: #fff;
    margin-left: 12px;
    width: 12px;
    transition: 0.2s ease-in-out;

    &:hover {
      fill: ${(props) => props.theme.red};
    }
  }
`;

const ItemList = styled.ul`
  animation: ${fadeIn} 0.75s ease forwards;
  animation-delay: 0.8s;
  list-style: none;
  margin: 0;
  opacity: 0;
  padding: 0;

  li a,
  li a:focus,
  li a:visited {
    background-color: ${(props) => props.theme.blue};
    color: #fff;
    padding: 15px 20px;
    display: block;
    font-size: 16px;
    font-weight: 700;
    text-decoration: none;
    text-transform: uppercase;
    line-height: 1.2;
  }

  li a:hover {
    text-decoration: underline;
  }
`;

const MemberLi = styled.li`
  align-items: center;
  background-color: ${(props) => props.theme.darkGray};
  display: flex;
  justify-content: flex-start;

  a,
  a:focus,
  a:visited {
    background-color: ${(props) => props.theme.darkGray} !important;
    color: #fff;
    padding: 15px 20px;
    font-size: 16px;
    font-weight: 700;
    text-decoration: none;
    text-transform: uppercase;
    line-height: 1.2;

    &:hover {
      text-decoration: underline;
    }
  }

  span {
    border: 1px solid #fff;
    color: ${(props) => props.theme.yellow} !important;
    cursor: pointer;
    display: inline;
    font-size: 14px;
    font-weight: 700;
    margin: 0 0 0 5px;
    padding: 2px 4px;
    text-decoration: none !important;
    text-transform: uppercase;
  }
`;

/**
 * <NavMenu>
 *
 * This component powers the main navigation structure on the site.
 * It's kind of a one-off, so you just plug this in and you should be good
 *
 * @param { boolean } menuState - lifted state true/false toggle for menu opening/closing
 * @param { function } handleMenu - lifted state changer for menuState, handles click event
 */

const NavMenu = ({ menuState, handleMenu }) => {
  // Auth context
  const authContext = useContext(AuthContext);

  // Logout for authenticated users
  const logout = () => {
    logoutRequest().then((data) => {
      if (data.status === true) {
        authContext.updateAuthContext({
          user: {
            email: data?.email,
            name: data?.name,
            affiliation: data?.affiliation,
          },
          loggedIn: false,
        });
        Router.push('/');
      }
    });
  };

  // Query for nav menus from Apollo
  const { data: advocacyData } = useQuery(MENU_DATA, {
    variables: {
      uid: 'advocacy-menu',
      lang: 'en-us',
    },
  });
  const { data: ourWorkData } = useQuery(MENU_DATA, {
    variables: {
      uid: 'our-work-menu',
      lang: 'en-us',
    },
  });
  const { data: ridesData } = useQuery(MENU_DATA, {
    variables: {
      uid: 'rides-menu',
      lang: 'en-us',
    },
  });

  // Locks the body while menu is open
  useEffect(() => {
    if (menuState === true) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'scroll';
    }
  });

  return (
    <>
      <NavContainer menuState={menuState}>
        <MenuHeader href="/">
          <a onClick={handleMenu}>
            {menuState === true && (
              <LogoContainer>
                <Logo logoMargin="0" logoWidth="60px" logoViewbox="65 -12 160 150" />
                <LogoType
                  logoMargin="0"
                  logoTypeWidth="150px"
                  fillPeople="#fff"
                  fillFor="#fff"
                  fillBikes="#fff"
                />
              </LogoContainer>
            )}
          </a>
        </MenuHeader>
        {menuState === true && (
          <>
            <MainNav>
              <MainNavItem>
                <NavAccordion title="Advocacy">
                  <DropdownList data={advocacyData} handler={handleMenu} isMobileMenu={true} />
                </NavAccordion>
              </MainNavItem>
              <MainNavItem>
                <NavAccordion title="Our Work">
                  <DropdownList data={ourWorkData} handler={handleMenu} isMobileMenu={true} />
                </NavAccordion>
              </MainNavItem>
              <MainNavItem>
                <NavAccordion title="Rides">
                  <DropdownList data={ridesData} handler={handleMenu} isMobileMenu={true} />
                </NavAccordion>
              </MainNavItem>
            </MainNav>
            <ItemList>
              <li>
                <AnchorAlign
                  href="https://www.classy.org/give/117371"
                  onClick={handleMenu}
                  target="_blank"
                >
                  Donate
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 32 32"
                    enableBackground="new 0 0 32 32"
                  >
                    <path d="M2 30V2h17c0.553 0 1-0.447 1-1s-0.447-1-1-1H2C0.896 0 0 0.896 0 2v28c0 1.104 0.896 2 2 2h28c1.104 0 2-0.896 2-2V13c0-0.553-0.447-1-1-1s-1 0.447-1 1v17H2z" />
                    <path d="M32 7c0 0.553-0.447 1-1 1s-1-0.447-1-1V3.414L16.707 16.707C16.526 16.888 16.276 17 16 17c-0.553 0-1-0.447-1-1 0-0.276 0.112-0.526 0.293-0.707L28.586 2H25c-0.553 0-1-0.447-1-1s0.447-1 1-1h6c0.553 0 1 0.447 1 1V7z" />
                  </svg>
                </AnchorAlign>
              </li>
              <li>
                <AnchorAlign
                  href="https://store.peopleforbikes.org/"
                  onClick={handleMenu}
                  target="_blank"
                >
                  Shop
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 32 32"
                    enableBackground="new 0 0 32 32"
                  >
                    <path d="M2 30V2h17c0.553 0 1-0.447 1-1s-0.447-1-1-1H2C0.896 0 0 0.896 0 2v28c0 1.104 0.896 2 2 2h28c1.104 0 2-0.896 2-2V13c0-0.553-0.447-1-1-1s-1 0.447-1 1v17H2z" />
                    <path d="M32 7c0 0.553-0.447 1-1 1s-1-0.447-1-1V3.414L16.707 16.707C16.526 16.888 16.276 17 16 17c-0.553 0-1-0.447-1-1 0-0.276 0.112-0.526 0.293-0.707L28.586 2H25c-0.553 0-1-0.447-1-1s0.447-1 1-1h6c0.553 0 1 0.447 1 1V7z" />
                  </svg>
                </AnchorAlign>
              </li>
              <MemberLi>
                <Link href="/members">
                  <a onClick={handleMenu}>Corporate Member Center</a>
                </Link>
                {!authContext.loggedIn ? (
                  <Link href="/log-in">
                    <a onClick={handleMenu}>
                      <span>Login</span>
                    </a>
                  </Link>
                ) : (
                  <span
                    onClick={() => {
                      logout();
                    }}
                  >
                    Logout
                  </span>
                )}
              </MemberLi>
            </ItemList>
          </>
        )}
      </NavContainer>
      <NavOverlay menuState={menuState} onClick={handleMenu} />
    </>
  );
};

export default NavMenu;
