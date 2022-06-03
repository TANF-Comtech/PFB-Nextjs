import React, { useState, useContext, useRef } from 'react';
import styled, { ThemeContext } from 'styled-components';
import useScrollPosition from '@react-hook/window-scroll';
import Link from 'next/link';

import { useQuery } from '@apollo/client';
import { MENU_DATA } from '../../lib/apollo/menu-queries';

import MenuContext from '../../context/menu/menu-context';
import AuthContext from '../../context/auth/auth-context';

import useOnClickOutside from '../../hooks/useOnClickOutside';

import Dropdown from '../global/dropdown';
import NavMenu from '../global/navmenu';
import GlobalBar from './globalbar';
import Logo from '../global/logo';
import LogoType from '../global/logotype';

const Bar = styled.section`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  min-height: 15vh;
  transition: 0.5s all ${(props) => props.theme.cubicSmooth};
  z-index: ${(props) => props.theme.zIndex02};
`;

const MainNavContainer = styled.header`
  align-items: center;
  background-color: rgba(255, 255, 255, 0.98);
  box-shadow: rgb(0 0 0 / 20%) 0px 2px 5px;
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;

  @media (min-width: 600px) {
    padding: 1.5vh 4vw;
  }
`;

const Container = styled.section`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: ${(props) => props.theme.lg};
  width: 100%;

  @media (min-width: ${(props) => props.theme.sm}) {
    align-items: flex-start;
  }
`;

const RightContainer = styled.div`
  align-items: center;
  display: flex;
  font-family: ${(props) => props.theme.dharma};
  font-size: 45px;
  justify-content: space-between;

  span {
    display: none;

    @media (min-width: ${(props) => props.theme.sm}) {
      display: inline;
      font-size: 45px;
      margin: 0;
      padding: 0 20px;
      vertical-align: middle;
    }
  }
`;

const MenuTrigger = styled.div`
  align-items: center;
  color: ${(props) => props.theme.darkGray};
  cursor: pointer;
  display: none;
  justify-content: space-between;
  padding: 0;
  transition: 0.2s ease-in-out;

  @media (min-width: ${(props) => props.theme.sm}) {
    display: flex;
  }

  &:after {
    color: ${(props) => props.theme.darkGray} !important;
    /* content: ${(props) => (props.noSeparator === true ? '' : '|')};
    padding: ${(props) => (props.noSeparator === true ? '0' : '0 7px')}; */

    @media (min-width: ${(props) => props.theme.xs}) {
      content: ${(props) => (props.noSeparator === true ? '#' : '|')};
      padding: ${(props) => (props.noSeparator === true ? '0' : '0 20px')};
    }
  }

  &:hover {
    color: ${(props) => props.theme.blue} !important;
  }
`;

const LogoContainer = styled.div`
  align-items: flex-end;
  display: flex;
`;

const LogoTypeVisibility = styled(LogoType)`
  display: inline;
`;

const BlueButton = styled.div`
  align-items: center;
  background-color: ${(props) => props.theme.midnightBlue};
  border-radius: 10px;
  color: white;
  cursor: pointer;
  display: flex;
  font-family: ${(props) => props.theme.montserrat};
  font-size: 14px;
  font-weight: 700;
  justify-content: space-around;
  margin: 0;
  padding: 10px;
  text-align: center;
  text-transform: uppercase;

  @media (min-width: ${(props) => props.theme.xs}) {
    font-size: 16px;
    padding: 8px 12px;
  }

  @media (min-width: ${(props) => props.theme.sm}) {
    display: none;
  }

  p {
    color: white;
    display: none;
    font-family: ${(props) => props.theme.montserrat};
    font-size: 16px;
    font-weight: 700;
    margin: 0;

    @media (min-width: ${(props) => props.theme.xs}) {
      display: inline;
    }
  }
`;

const MenuButton = styled.svg`
  cursor: pointer;
  display: block;
  fill: white;
  height: 22px;
  margin: 0;
  width: 22px;

  @media (min-width: ${(props) => props.theme.xs}) {
    margin: 0 0 0 8px;
  }
`;

function NavBar() {
  // Import contexts for data usage
  const themeProps = useContext(ThemeContext);
  const authContext = useContext(AuthContext);

  // Import menu contexts for each dropdown
  const {
    advocacyState,
    setAdvocacyState,
    handleAdvocacy,
    ourWorkState,
    setOurWorkState,
    handleOurWork,
    ridesState,
    setRidesState,
    handleRides,
    windowSize,
  } = useContext(MenuContext);

  // Refs and click detection for each dropdown
  const advocacyRef = useRef();
  useOnClickOutside(advocacyRef, () => setAdvocacyState(false));
  const ourWorkRef = useRef();
  useOnClickOutside(ourWorkRef, () => setOurWorkState(false));
  const ridesRef = useRef();
  useOnClickOutside(ridesRef, () => setRidesState(false));

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

  // Capture scroll position, so we can know when to fade out navbar
  const scrollY = useScrollPosition();

  // Menu opening state change, send state down to <Navmenu>
  const [menu, setMenu] = useState(false);
  const handleMenu = () => {
    setMenu(!menu);
  };

  return (
    <>
      <Bar className={scrollY < 500 ? 'isVisibleY' : 'isHiddenY'}>
        <GlobalBar />
        <MainNavContainer>
          <Container>
            <Link href="/">
              <a>
                <LogoContainer>
                  <Logo logoMargin="0" logoWidth="60px" logoViewbox="65 -12 160 150" />
                  <LogoTypeVisibility
                    fillPeople={themeProps.darkGray}
                    fillFor={themeProps.gray}
                    fillBikes={themeProps.darkGray}
                    logoMargin="0"
                    logoTypeWidth="170px"
                  />
                </LogoContainer>
              </a>
            </Link>
            <RightContainer>
              <MenuTrigger onClick={() => setAdvocacyState(true)}>Advocacy</MenuTrigger>
              <span>|</span>
              <MenuTrigger onClick={() => setOurWorkState(true)}>Our Work</MenuTrigger>
              <span>|</span>
              <MenuTrigger onClick={() => setRidesState(true)} noSeparator={true}>
                Rides
              </MenuTrigger>
              <BlueButton onClick={handleMenu}>
                <p>Explore</p>
                <MenuButton viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z" />
                </MenuButton>
              </BlueButton>
            </RightContainer>
          </Container>
        </MainNavContainer>
      </Bar>
      {advocacyData !== undefined && (
        <Dropdown
          activeWidth={windowSize.width}
          data={advocacyData}
          dropdownHandler={handleAdvocacy}
          dropdownRef={advocacyRef}
          dropdownState={advocacyState}
          hasTopics={true}
          isGlobalMenu={false}
        />
      )}
      {ourWorkData !== undefined && (
        <Dropdown
          activeWidth={windowSize.width}
          data={ourWorkData}
          dropdownHandler={handleOurWork}
          dropdownRef={ourWorkRef}
          dropdownState={ourWorkState}
          hasTopics={true}
          isGlobalMenu={false}
        />
      )}
      {ridesData !== undefined && (
        <Dropdown
          activeWidth={windowSize.width}
          data={ridesData}
          dropdownHandler={handleRides}
          dropdownRef={ridesRef}
          dropdownState={ridesState}
          hasTopics={true}
          isGlobalMenu={false}
        />
      )}
      <NavMenu menuState={menu} handleMenu={handleMenu} />
    </>
  );
}

export default NavBar;
