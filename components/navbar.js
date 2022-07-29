import React, { useState, useContext, useRef, useEffect } from 'react';
import styled, { ThemeContext } from 'styled-components';
import useScrollPosition from '@react-hook/window-scroll';
import Link from 'next/link';
import Router from 'next/router';
import { useQuery } from '@apollo/client';

import { MENU_DATA } from '~/lib/apollo/menu-queries';
import logoutRequest from '~/lib/auth/logoutRequest';
import AuthContext from '~/context/auth/auth-context';
import MenuContext from '~/context/menu/menu-context';
import useOnClickOutside from '~/hooks/useOnClickOutside';

import MainContent from '~/components/main-content';
import Search from '~/components/search';
import Dropdown from '~/components/dropdown';
import NavMenu from '~/components/navmenu';
import Logo from '~/components/logo';
import LogoType from '~/components/logotype';

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

const BarGlobal = styled.section`
  display: flex;
  justify-content: space-between;

  span {
    font-size: 14px;
    margin-bottom: 0;
  }
`;

const NetworkControl = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;

  &:after {
    @media (min-width: ${(props) => props.theme.sm}) {
      content: '|';
      padding: 0 10px;
    }
  }
`;
const MemberLink = styled.div`
  display: none;

  @media (min-width: ${(props) => props.theme.sm}) {
    display: inline;

    a,
    a:hover,
    a:focus,
    a:visited {
      color: white;
      cursor: pointer;
      font-size: 14px;
      font-weight: 700;
      text-decoration: none;
      text-transform: uppercase;
    }

    span {
      display: none;

      @media (min-width: ${(props) => props.theme.sm}) {
        border: 1px solid #fff;
        color: ${(props) => props.theme.yellow} !important;
        cursor: pointer;
        display: inline;
        font-weight: 700;
        margin-left: 5px;
        padding: 2px 4px;
        text-decoration: none;
        text-transform: uppercase;
      }
    }
  }
`;

const SearchControl = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;

  span {
    margin-right: 8px;
  }
`;

const MobileHide = styled.span`
  display: none;

  @media (min-width: ${(props) => props.theme.sm}) {
    display: inline;
  }
`;

const Watchglass = styled.svg`
  cursor: pointer;
  height: ${(props) => props.size};
  fill: ${(props) => props.color};
  width: ${(props) => props.size};
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
export const FlexContainer = styled.section`
  align-items: ${(props) => (props.alignItemsMobile ? props.alignItemsMobile : 'center')};
  flex-direction: ${(props) => (props.flexDirectionMobile ? props.flexDirectionMobile : 'column')};
  justify-content: ${(props) =>
    props.justifyContentMobile ? props.justifyContentMobile : 'center'};
  display: flex;
  margin: ${(props) => (props.margin ? props.margin : '0')};

  @media (min-width: ${(props) => (props.breakpoint ? props.breakpoint : props.theme.sm)}) {
    align-items: ${(props) => (props.alignItems ? props.alignItems : 'center')};
    flex-direction: ${(props) => (props.flexDirection ? props.flexDirection : 'row')};
    justify-content: ${(props) => (props.justifyContent ? props.justifyContent : 'space-between')};
  }
`;

/**
 * <UnderlinedText>
 *
 * If you can't get this, you're NGMI
 */
export const UnderlinedText = styled.span`
  text-decoration: underline;
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
  // Auth context
  const authContext = useContext(AuthContext);

  // Query for nav menu from Apollo
  const { loading, error, data } = useQuery(MENU_DATA, {
    variables: {
      uid: 'global-network-menu',
      lang: 'en-us',
    },
  });

  // Pull in search and global dropdown menu state from context
  const { search, handleSearch, globalSites, setGlobalSites, handleGlobalSites, windowSize } =
    useContext(MenuContext);

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
              {!authContext.loggedIn ? (
                <Link href="/log-in">
                  <a>
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
            </MemberLink>
          </FlexContainer>
          <SearchControl onClick={handleSearch}>
            <span>Search</span>
            <SearchButton color="#fff" size="18px" />
          </SearchControl>
        </BarGlobal>
      </MainContent>
      <Search searchState={search} handleSearch={handleSearch} />
      {data !== undefined && (
        <Dropdown
          activeWidth={windowSize.width}
          data={data}
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
