import React, { useState, useContext, useRef, useEffect } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import styled, { ThemeContext } from 'styled-components';
import useScrollPosition from '@react-hook/window-scroll';
import Link from 'next/link';

import globalData from '~/data/global';
import { loginModalAtom } from '~/atoms';
import { loggedInAtom, useLogout } from '~/lib/auth';
import useOnClickOutside from '~/hooks/useOnClickOutside';
import useWindowSize from '~/hooks/useWindowSize';

import MainContent from '~/components/main-content';
import Search from '~/components/search';
import Dropdown from '~/components/dropdown';
import NavMenu from '~/components/navmenu';
import Logo from '~/components/logo';
import LogoType from '~/components/logotype';

const Bar = styled.section`
  position: fixed !important;
  left: 0 !important;
  top: 0 !important;
  right: 0 !important;
  min-height: 15vh !important;
  transition: 0.5s all ${(props) => props.theme.cubicSmooth} !important;
  z-index: ${(props) => props.theme.zIndex02} !important;
`;

const MainNavContainer = styled.header`
  align-items: center !important;
  background-color: rgba(255, 255, 255, 0.98) !important;
  box-shadow: rgb(0 0 0 / 20%) 0px 2px 5px !important;
  display: flex !important;
  justify-content: space-between !important;
  padding: 15px 20px !important;

  @media (min-width: 600px) {
    padding: 1.5vh 4vw !important;
  }
`;

const Container = styled.section`
  align-items: center !important;
  display: flex !important;
  justify-content: space-between !important;
  margin: 0 auto !important;
  max-width: ${(props) => props.theme.lg} !important;
  width: 100% !important;

  @media (min-width: ${(props) => props.theme.sm}) {
    align-items: flex-start !important;
  }
`;

const RightContainer = styled.div`
  align-items: center !important;
  display: flex !important;
  font-family: ${(props) => props.theme.dharma} !important;
  font-size: 45px !important;
  justify-content: space-between !important;

  span {
    display: none !important;

    @media (min-width: ${(props) => props.theme.sm}) {
      display: inline !important;
      font-size: 45px !important;
      margin: 0 !important;
      padding: 0 20px !important;
      vertical-align: middle !important;
    }
  }
`;

const MenuTrigger = styled.div`
  align-items: center !important;
  color: ${(props) => props.theme.darkGray} !important;
  cursor: pointer !important;
  display: none !important;
  justify-content: space-between !important;
  padding: 0 !important;
  transition: 0.2s ease-in-out !important;

  @media (min-width: ${(props) => props.theme.sm}) {
    display: flex !important;
  }

  &:after {
    color: ${(props) => props.theme.darkGray} !important;
    /* content: ${(props) => (props.noSeparator === true ? '' : '|')} !important;
    padding: ${(props) => (props.noSeparator === true ? '0' : '0 7px')} !important; */

    @media (min-width: ${(props) => props.theme.xs}) {
      content: ${(props) => (props.noSeparator === true ? '#' : '|')} !important;
      padding: ${(props) => (props.noSeparator === true ? '0' : '0 20px')} !important;
    }
  }

  &:hover {
    color: ${(props) => props.theme.blue} !important;
  }
`;

const LogoContainer = styled.div`
  align-items: flex-end !important;
  display: flex !important;
`;

const LogoTypeVisibility = styled(LogoType)`
  display: inline !important;
`;

const BlueButton = styled.div`
  align-items: center !important;
  background-color: ${(props) => props.theme.midnightBlue} !important;
  border-radius: 10px !important;
  color: white !important;
  cursor: pointer !important;
  display: flex !important;
  font-family: ${(props) => props.theme.montserrat} !important;
  font-size: 14px !important;
  font-weight: 700 !important;
  justify-content: space-around !important;
  margin: 0 !important;
  padding: 10px !important;
  text-align: center !important;
  text-transform: uppercase !important;

  @media (min-width: ${(props) => props.theme.xs}) {
    font-size: 16px !important;
    padding: 8px 12px !important;
  }

  @media (min-width: ${(props) => props.theme.sm}) {
    display: none !important;
  }

  p {
    color: white !important;
    display: none !important;
    font-family: ${(props) => props.theme.montserrat} !important;
    font-size: 16px !important;
    font-weight: 700 !important;
    margin: 0 !important;

    @media (min-width: ${(props) => props.theme.xs}) {
      display: inline !important;
    }
  }
`;

const MenuButton = styled.svg`
  cursor: pointer !important;
  display: block !important;
  fill: white !important;
  height: 22px !important;
  margin: 0 !important;
  width: 22px !important;

  @media (min-width: ${(props) => props.theme.xs}) {
    margin: 0 0 0 8px !important;
  }
`;

const BarGlobal = styled.section`
  display: flex !important;
  justify-content: space-between !important;

  span {
    font-size: 14px !important;
    margin-bottom: 0 !important;
  }
`;

const NetworkControl = styled.div`
  align-items: center !important;
  cursor: pointer !important;
  display: flex !important;
  font-size: 14px !important;
  font-weight: 700 !important;
  text-transform: uppercase !important;

  &:after {
    @media (min-width: ${(props) => props.theme.sm}) {
      content: '|' !important;
      padding: 0 10px !important;
    }
  }
`;

const MemberLink = styled.div`
  display: none !important;

  @media (min-width: ${(props) => props.theme.sm}) {
    display: inline !important;

    a,
    a:hover,
    a:focus,
    a:visited {
      color: white !important;
      cursor: pointer !important;
      font-size: 14px !important;
      font-weight: 700 !important;
      text-decoration: none !important;
      text-transform: uppercase !important;
    }

    span {
      display: none !important;

      @media (min-width: ${(props) => props.theme.sm}) {
        border: 1px solid #fff !important;
        color: ${(props) => props.theme.yellow} !important;
        cursor: pointer !important;
        display: inline !important;
        font-weight: 700 !important;
        margin-left: 5px !important;
        padding: 2px 4px !important;
        text-decoration: none !important;
        text-transform: uppercase !important;
      }
    }
  }
`;

const SearchControl = styled.div`
  align-items: center !important;
  cursor: pointer !important;
  display: flex !important;
  font-size: 14px !important;
  font-weight: 700 !important;
  text-transform: uppercase !important;

  span {
    margin-right: 8px !important;
  }
`;

const MobileHide = styled.span`
  display: none !important;

  @media (min-width: ${(props) => props.theme.sm}) {
    display: inline !important;
  }
`;

const Watchglass = styled.svg`
  cursor: pointer !important;
  height: ${(props) => props.size} !important;
  fill: ${(props) => props.color} !important;
  width: ${(props) => props.size} !important;
`;

/**
 * <SearchButton>
 *
 * Just drops a search button into the mix wherever you need it
 *
 * @param { string } color - fill of SVG watchglass
 * @param { string } size - how big the SVG should appear
 *
 */
const SearchButton = ({ color = '#111', size = '32px' }) => {
  return (
    <>
      <Watchglass
        color={color}
        height={size}
        width={size}
        viewBox="1 -1 100 100"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M72.1,64.2c4.8-6,7.4-13.5,7.4-21.3c0-19-15.5-34.4-34.5-34.4C26,8.6,10.5,24,10.5,43S26,77.4,44.9,77.4  c7.6,0,15.1-2.6,21.3-7.4l20.7,20.7l5.9-5.9L72.1,64.2z M44.9,69.2c-14.4,0-26.1-11.7-26.1-26.1C18.8,28.7,30.5,17,44.9,17  C59.3,17,71,28.7,71,43.1C71,57.5,59.3,69.2,44.9,69.2z" />
      </Watchglass>
    </>
  );
};

/**
 * <FlexContainer>
 *
 * A simple flexbox container you can use almost anywhere, customize it up
 *
 * @param { string } alignItems - align items for desktop
 * @param { string } alignItemsMobile - align-items for mobile viewports
 * @param { string } breakpoint - you can set where you want the flexbox to break
 * @param { string } flexDirection = flex-direction for desktop
 * @param { string } flexDirectionMobile = flex-direction for mobile
 * @param { string } justifyContent - justify-content for desktop
 * @param { string } justifyContentMobile - justify-content for mobile
 * @param { string } margin - how much cushion do you want bro?
 *
 */
const FlexContainer = styled.section`
  align-items: ${(props) =>
    props.alignItemsMobile ? props.alignItemsMobile : 'center'} !important;
  flex-direction: ${(props) =>
    props.flexDirectionMobile ? props.flexDirectionMobile : 'column'} !important;
  justify-content: ${(props) =>
    props.justifyContentMobile ? props.justifyContentMobile : 'center'} !important;
  display: flex !important;
  margin: ${(props) => (props.margin ? props.margin : '0')} !important;

  @media (min-width: ${(props) => (props.breakpoint ? props.breakpoint : props.theme.sm)}) {
    align-items: ${(props) => (props.alignItems ? props.alignItems : 'center')} !important;
    flex-direction: ${(props) => (props.flexDirection ? props.flexDirection : 'row')} !important;
    justify-content: ${(props) =>
      props.justifyContent ? props.justifyContent : 'space-between'} !important;
  }
`;

/**
 * <UnderlinedText>
 *
 * If you can't get this, you're NGMI
 */
const UnderlinedText = styled.span`
  text-decoration: underline !important;
`;

/**
 * <GlobalBar>
 *
 * Global bar for all the PFB properties
 * This handles search, global property list, member center and auth
 *
 * @param { boolean } searchState - passed, lifted state true/false toggle for search opening/closing
 * @param { function } handleSearch - passed, lifted state changer for search state, handles click event
 *
 */
const GlobalBar = () => {
  // Auth state
  const isLoggedIn = useAtomValue(loggedInAtom);
  const setIsLoginModalOpen = useSetAtom(loginModalAtom);
  const { globalSitesData } = globalData;

  // Logout for authenticated users
  const logout = useLogout();

  // Search state
  const [search, setSearch] = useState(false);
  const handleSearch = () => {
    setSearch(!search);
  };

  // Global sites state
  const [globalSites, setGlobalSites] = useState(false);
  const handleGlobalSites = () => {
    setGlobalSites(!globalSites);
  };

  // Locks scrolling if you engage the search
  useEffect(() => {
    if (search === true) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'scroll';
    }
  });

  // Dropdown stuff - use ref to tell click hook when user has engaged with dropdown
  // This allows us to recognize any non-dropdown click and close menu appropriately
  const globalDropdownRef = useRef();
  useOnClickOutside(globalDropdownRef, () => setGlobalSites(false));

  const windowSize = useWindowSize();

  return (
    <>
      <MainContent bgColor="#002C40" contentPadding="1vh 4vw" textColor="#fff">
        <BarGlobal>
          <FlexContainer flexDirectionMobile="row" alignItems="center" alignItemsMobile="center">
            <NetworkControl onClick={handleGlobalSites}>
              <span>
                <MobileHide>Explore Our</MobileHide> Network of Sites
              </span>
            </NetworkControl>
            <MemberLink>
              <Link href="/members">
                <a>Corporate Member Center</a>
              </Link>
            </MemberLink>
            <MemberLink>
              {!isLoggedIn ? (
                <button onClick={() => setIsLoginModalOpen(true)}>
                  <a>
                    <span>Login</span>
                  </a>
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
            </MemberLink>
          </FlexContainer>
          <SearchControl onClick={handleSearch}>
            <span>Search</span>
            <SearchButton color="#fff" size="18px" />
          </SearchControl>
        </BarGlobal>
      </MainContent>
      <Search searchState={search} handleSearch={handleSearch} />
      {globalSitesData !== undefined && (
        <Dropdown
          activeWidth={windowSize.width}
          data={globalSitesData}
          dropdownState={globalSites}
          dropdownHandler={handleGlobalSites}
          dropdownRef={globalDropdownRef}
          isGlobalMenu={true}
        />
      )}
    </>
  );
};

function NavBar() {
  const { advocacyData, ourWorkData, ridesData } = globalData;

  // Import contexts for data usage
  const themeProps = useContext(ThemeContext);
  // const authContext = useContext(AuthContext);

  // State for each dropdown
  const [advocacyState, setAdvocacyState] = useState(false);
  const handleAdvocacy = () => {
    setAdvocacyState(!advocacyState);
  };

  const [ourWorkState, setOurWorkState] = useState(false);
  const handleOurWork = () => {
    setOurWorkState(!ourWorkState);
  };

  const [ridesState, setRidesState] = useState(false);
  const handleRides = () => {
    setRidesState(!ridesState);
  };

  // Refs and click detection for each dropdown
  const advocacyRef = useRef();
  useOnClickOutside(advocacyRef, () => setAdvocacyState(false));
  const ourWorkRef = useRef();
  useOnClickOutside(ourWorkRef, () => setOurWorkState(false));
  const ridesRef = useRef();
  useOnClickOutside(ridesRef, () => setRidesState(false));

  // Capture scroll position, so we can know when to fade out navbar
  const scrollY = useScrollPosition();

  // Menu opening state change, send state down to <Navmenu>
  const [menu, setMenu] = useState(false);
  const handleMenu = () => {
    setMenu(!menu);
  };

  // Window dimensions
  const windowSize = useWindowSize();

  // Automatically close dropdowns after scrolling
  useEffect(() => {
    if (scrollY >= 32) {
      setAdvocacyState(false);
      setOurWorkState(false);
      setRidesState(false);
    }
  }, [scrollY]);

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
