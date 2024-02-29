import React, { useState, useRef, useContext, useEffect } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import styled, { keyframes } from 'styled-components';
import Link from 'next/link';

import globalData from '~/data/global';
import { loginModalAtom } from '~/atoms';
import { loggedInAtom, useLogout } from '~/lib/auth';

import Logo from '~/components/logo';
import LogoType from '~/components/logotype';
import DropdownList from '~/components/dropdown-list';

import controlIcon from '~/public/thin-x.svg';

const NavContainer = styled.nav`
  background-color: ${(props) => props.theme.midnightBlue} !important;
  bottom: 0 !important;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2) !important;
  color: #fff !important;
  max-width: ${(props) => props.theme.xs} !important;
  min-width: 320px !important;
  min-height: 100vh !important;
  overflow: auto !important;
  position: fixed !important;
  right: 0 !important;
  top: 0 !important;
  transition: 0.4s ease-in-out !important;
  transform: ${(props) => (props.menuState ? 'translateX(0)' : 'translateX(100%)')} !important;
  will-change: transform !important;
  z-index: ${(props) => props.theme.zIndex05} !important;
`;

const NavOverlay = styled.section`
  background-color: ${(props) => props.theme.black} !important;
  min-height: 100vh !important;
  opacity: ${(props) => (props.menuState ? '0.8' : '0')} !important;
  transition: all 0.4s ease-in-out !important;
  position: fixed !important;
  top: 0 !important;
  bottom: 0 !important;
  left: 0 !important;
  right: 0 !important;
  visibility: ${(props) => (props.menuState ? 'visible' : 'hidden')} !important;
  z-index: ${(props) => props.theme.zIndex04} !important;
`;

const fadeIn = keyframes`
  0% {
    opacity: 0 !important;
  }
  100% {
    opacity: 1 !important;
  }
`;

const MenuHeader = styled(Link)`
  align-items: center !important;
  display: flex !important;
  justify-content: space-between !important;

  a,
  a:focus,
  a:visited,
  a:hover {
    color: black !important;
    text-decoration: none !important;
  }
`;

const LogoContainer = styled.section`
  align-items: flex-end !important;
  animation: ${fadeIn} 0.75s ease forwards !important;
  animation-delay: 0.4s !important;
  display: flex !important;
  opacity: 0 !important;
  padding: 25px 25px 0 25px !important;
`;

const MainNav = styled.ul`
  animation: ${fadeIn} 0.75s ease forwards !important;
  animation-delay: 0.6s !important;
  list-style: none !important;
  margin: 0 !important;
  opacity: 0 !important;
  padding: 25px !important;

  a,
  a:visited,
  a:focus,
  a:active {
    color: #fff !important;
    text-decoration: none !important;
    transition: 0.2s ease-in-out !important;
  }
  a:hover {
    text-decoration: none !important;
  }
`;

const MainNavItem = styled.li`
  cursor: pointer !important;
  font-size: 46px !important;
  font-family: ${(props) => props.theme.dharma} !important;
  font-weight: 300 !important;
  line-height: 42px !important;
  padding: 1vh 0 !important;
`;

const AnchorAlign = styled.a`
  align-items: center !important;
  display: flex !important;

  span {
    display: inline !important;
    margin-bottom: 0 !important;
  }

  svg {
    fill: #fff !important;
    margin-left: 12px !important;
    width: 12px !important;
    display: inline !important;
    transition: 0.2s ease-in-out !important;

    &:hover {
      fill: ${(props) => props.theme.red} !important;
    }
  }
`;

const ItemList = styled.ul`
  animation: ${fadeIn} 0.75s ease forwards !important;
  animation-delay: 0.8s !important;
  list-style: none !important;
  margin: 0 !important;
  opacity: 0 !important;
  padding: 0 !important;

  li a,
  li a:focus,
  li a:visited {
    background-color: ${(props) => props.theme.blue} !important;
    color: #fff !important;
    padding: 15px 20px !important;
    display: block !important;
    font-size: 16px !important;
    font-weight: 700 !important;
    text-decoration: none !important;
    text-transform: uppercase !important;
    line-height: 1.2 !important;
  }

  li a:hover {
    text-decoration: underline !important;
  }
`;

const MemberLi = styled.li`
  align-items: center !important;
  background-color: ${(props) => props.theme.darkGray} !important;
  display: flex !important;
  justify-content: flex-start !important;

  a,
  a:focus,
  a:visited {
    background-color: ${(props) => props.theme.darkGray} !important;
    color: #fff !important;
    padding: 15px 20px !important;
    font-size: 16px !important;
    font-weight: 700 !important;
    text-decoration: none !important;
    text-transform: uppercase !important;
    line-height: 1.2 !important;

    &:hover {
      text-decoration: underline !important;
    }
  }

  span {
    border: 1px solid #fff !important;
    color: ${(props) => props.theme.yellow} !important;
    cursor: pointer !important;
    display: inline !important;
    font-size: 14px !important;
    font-weight: 700 !important;
    margin: 0 0 0 5px !important;
    padding: 2px 4px !important;
    text-decoration: none !important;
    text-transform: uppercase !important;
  }
`;

const AccordionWrapper = styled.div`
  align-items: center !important;
  cursor: pointer !important;
  display: flex !important;
  height: auto !important;
  justify-content: space-between !important;
  transition: 0.5s ease-in-out !important;
`;

const InternalWrapper = styled.div`
  max-height: ${(props) => (props.open ? 'auto' : '0')} !important;
  opacity: ${(props) => (props.open ? '1' : '0')} !important;
  overflow: hidden !important;
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1) 0ms !important;
`;

const ArrowButton = styled.img`
  border: none !important;
  height: min-content !important;
  margin: none !important;
  transition: all 0.25s ease-in-out !important;
  transform: ${(props) => (props.open ? 'rotate(180deg)' : 'rotate(45deg)')} !important;
  transform-origin: 40% 40% !important;
`;

const Title = styled.h2`
  cursor: pointer !important;
  font-size: 46px !important;
  font-family: ${(props) => props.theme.dharma} !important;
  font-weight: 300 !important;
  line-height: 42px !important;
  margin: 0 !important;
  padding: 1vh 0 !important;
`;

/**
 * <NavAccordion>
 *
 * Pass in the prop "title" to insert the text that you want to appear next to the arrow button
 * Within the element, pass in the text that you want to appear after the accordion has been activated.
 *
 * @param {string} title - pass in the title of the accordion as a prop
 * @param {obj} children - accordion content should be passed in using the children object
 */

const NavAccordion = ({ title, children }) => {
  const accordionContent = useRef(null);
  const [accordionHeight, setAccordionHeight] = useState(0);
  const [open, setOpen] = useState(false);

  // Get accordion element height on page load
  useEffect(() => {
    setAccordionHeight(accordionContent.current.clientHeight);
  }, []);

  // Toggle accordion state when clicked
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <AccordionWrapper onClick={handleClick} open={open}>
        <Title>{title}</Title>
        <ArrowButton
          alt="Accordion Control - click to reveal content"
          open={open}
          src={controlIcon}
        />
      </AccordionWrapper>
      <InternalWrapper open={open} ref={accordionContent}>
        {children}
      </InternalWrapper>
    </>
  );
};

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
  const { advocacyData, ourWorkData, ridesData } = globalData;

  // Auth state
  const isLoggedIn = useAtomValue(loggedInAtom);
  const setIsLoginModalOpen = useSetAtom(loginModalAtom);

  // Logout for authenticated users
  const logout = useLogout();

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
                  href="https://www.classy.org/give/117371/#!/donation/checkout"
                  onClick={handleMenu}
                  target="_blank"
                >
                  <span>Donate</span>
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
                  <span>Shop</span>
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
                <Link href="/members" onClick={handleMenu}>
                  Corporate Member Center
                </Link>
                {!isLoggedIn ? (
                  <button onClick={() => setIsLoginModalOpen(true)}>
                    <span>Login</span>
                  </button>
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
