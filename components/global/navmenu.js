import React, { useContext, useEffect } from 'react'
import styled, { keyframes, ThemeContext } from 'styled-components'
import { useQuery } from '@apollo/client'
import Link from 'next/link'

import { MENU_DATA } from '../../lib/apollo/menu-queries'
import { randomID, linkResolver } from '../../lib/utils'

import Logo from './logo'
import LogoType from './logotype'
import NavAccordion from './nav-accordion'
import DropdownList from './dropdown-list'

import ShareIcon from '../../public/icons/share.svg'

const NavContainer = styled.nav`
  background-color: ${ props => props.theme.midnightBlue };
  bottom: 0;
  box-shadow: 0 2px 5px rgba(0,0,0,.2);
  color: #fff;
  max-width: ${props => props.theme.xs};
  min-width: 320px;
  min-height: 100vh;
  overflow: auto;
  padding: 25px;
  position: fixed;
  right: 0;
  top: 0;
  transition: 0.4s ease-in-out;
  transform: ${props => props.menuState ? "translateX(0)" : "translateX(100%)" };
  will-change: transform;
  z-index: ${props => props.theme.zIndex05};
`

const NavOverlay = styled.section`
  background-color: ${props => props.theme.black};
  min-height: 100vh;
  opacity: ${props => props.menuState ? "0.8" : "0" };
  transition: all 0.4s ease-in-out;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  visibility: ${props => props.menuState ? "visible" : "hidden" };
  z-index: ${props => props.theme.zIndex04};
`

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const MenuHeader = styled.header`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3vh;

  a, a:focus, a:visited, a:hover {
    color: black;
    text-decoration: none;
  }
`

const MenuTitle = styled.h3`
  animation: ${fadeIn} 0.75s ease forwards;
  animation-delay: 0.6s;
  color: ${props => props.theme.redAccent };
  font-size: 24px;
  opacity: 0;
  text-decoration: none !important;
  text-transform: uppercase;
`

const LogoContainer = styled.section`
  align-items: flex-end;
  animation: ${fadeIn} 0.75s ease forwards;
  animation-delay: 0.4s;
  display: flex;
  opacity: 0;
`

const MenuButtonCont = styled.div`
  align-items: center;
  border: none;
  border-radius: 0;
  display: flex;
  height: 32px;
  justify-content: center;
  left: 0;
  padding: 0;
  position: relative;
  top: 0;
  transform: ${props => props.menuState ? "translateX(-100%)" : "translateX(0%)" };
  transition: all 0.5s ease;
  width: 32px;
  z-index: ${props => props.theme.zIndex06 };

  :focus {
    box-shadow: 0 0 0 1px ${props => props.theme.blue } inset;
  }
`

const MenuClose = styled.svg`
  animation: ${fadeIn} 0.75s ease forwards;
  animation-delay: 0.8s;
  cursor: pointer;
  height: 32px;
  margin: 0;
  opacity: 0;
  width: 32px;
`

const MainNav = styled.ul`
  animation: ${fadeIn} 0.75s ease forwards;
  animation-delay: 0.6s;
  list-style: none;
  margin: 0;
  opacity: 0;

  a, a:visited, a:focus, a:active {
    color: #fff;
    text-decoration: none;
    transition: 0.2s ease-in-out;
  }
  a:hover {
    text-decoration: none;
  }
`

const MainNavItem = styled.li`
  cursor: pointer;
  font-size: 46px;
  font-family: ${ props => props.theme.dharma };
  font-weight: 300;
  line-height: 42px;
  padding: 1vh 0; 
`

const MainSubNavItem = styled.li`
  cursor: pointer;
  font-size: 24px;
  font-family: ${ props => props.theme.montserrat };
  font-weight: 300;
  line-height: 28px;
  padding: 0.5vh 25px;

  @media screen and (min-width: 320px) {
    font-size: calc(24px + 4 * ((100vw - 320px) / 880));
    line-height: calc(28px + 6 * ((100vw - 320px) / 880));
  }
  @media screen and (min-width: 1200px) {
    font-size: 28px;
    line-height: 34px;
  } 
`

const GridMicroFade = styled.section`
  animation: ${fadeIn} 0.75s ease forwards;
  animation-delay: 0.6s;
  display: grid;
  grid-gap: ${props => props.gridGap || '15px'}; 
  grid-template-columns: 1fr;
  opacity: 0;

  @media( min-width: ${(props) => props.theme.xs} ) {
    grid-template-columns: 1fr 1fr;
  }

  a, a:focus, a:visited, a:hover {
    text-decoration: none;
  }
`

const AnchorAlign = styled.a`
  align-items: center;
  display: flex;

  svg {
    fill: ${props => props.theme.black };
    margin-left: 12px;
    width: 15px;
    transition: 0.2s ease-in-out;

    &:hover {
      fill: ${props => props.theme.red };
    }
  }
`

/**
 * <NavMenu>
 * 
 * This component powers the main navigation structure on the left side of the site.
 * It's kind of a one-off, so you just plug this in and you should be good
 * 
 * @param { boolean } menuState - lifted state true/false toggle for menu opening/closing
 * @param { function } handleMenu - lifted state changer for menuState, handles click event
 */

const NavMenu = ({ menuState, handleMenu }) => {
  // Theme props
  const themeProps = useContext(ThemeContext)
  // const { advocacyState, setAdvocacyState, handleAdvocacy, 
  //   ourWorkState, setOurWorkState, handleOurWork, 
  //   ridesState, setRidesState, handleRides, 
  //   windowSize } = useContext(MenuContext)  

  // Query for nav menus from Apollo
  const { data: advocacyData } = useQuery(MENU_DATA, {
    variables: {
      "uid": "advocacy-menu",
      "lang": "en-us"
    }
  })
  const { data: ourWorkData } = useQuery(MENU_DATA, {
    variables: {
      "uid": "our-work-menu",
      "lang": "en-us"
    }
  })
  const { data: ridesData }= useQuery(MENU_DATA, {
    variables: {
      "uid": "rides-menu",
      "lang": "en-us"
    }
  })

  // Locks the body while menu is open
  useEffect( () => {
    if( menuState === true ) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }
  })

  //if (data) {
    // const mainMenu = data.nav_menu.main_menu_items
    // const topicMenu = data.nav_menu.topic_menu_items

    return(
      <>
        <NavContainer menuState={ menuState }>
          <MenuHeader>
            { menuState === true && (
              <LogoContainer>
                <Logo 
                  logoMargin="0"
                  logoWidth="60px"
                  logoViewbox="65 -12 160 150"
                />
                <LogoType 
                  logoMargin="0"
                  logoTypeWidth="150px"
                  fillPeople="#fff"
                  fillFor="#fff"
                  fillBikes="#fff"
                />
              </LogoContainer>
            )}            
            <MenuButtonCont onClick={ handleMenu }>
            {/* { menuState === true && (
              <MenuClose 
                stroke="#fff" 
                fill="#fff"
                stroke-width="0" 
                viewBox="0 0 24 24"
              >
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </MenuClose>
            )} */}
            </MenuButtonCont>
          </MenuHeader>
          { menuState === true && (
            <>
              <MainNav>                                                                              
                <MainNavItem>
                  <NavAccordion
                    title="Advocacy"
                  >
                    <DropdownList 
                      data={ advocacyData }
                      handler={ handleMenu }
                      isMobileMenu={ true }
                    /> 
                  </NavAccordion>
                </MainNavItem>
                <MainNavItem>
                  <NavAccordion
                    title="Our Work"
                  >
                    <DropdownList 
                      data={ ourWorkData }
                      handler={ handleMenu }
                      isMobileMenu={ true }
                    />
                  </NavAccordion>
                </MainNavItem>
                <MainNavItem>
                  <NavAccordion
                    title="Rides"
                  >
                    <DropdownList 
                      data={ ridesData }
                      handler={ handleMenu }
                      isMobileMenu={ true }
                    />
                  </NavAccordion>       
                </MainNavItem>

                {/* <MainNavItem>
                  <AnchorAlign href="https://store.peopleforbikes.org/" rel="nofollow" target="_blank">
                    Shop Our Store + Give Back
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 32 32" enableBackground="new 0 0 32 32" >
                      <path d="M2 30V2h17c0.553 0 1-0.447 1-1s-0.447-1-1-1H2C0.896 0 0 0.896 0 2v28c0 1.104 0.896 2 2 2h28c1.104 0 2-0.896 2-2V13c0-0.553-0.447-1-1-1s-1 0.447-1 1v17H2z"/>
                      <path d="M32 7c0 0.553-0.447 1-1 1s-1-0.447-1-1V3.414L16.707 16.707C16.526 16.888 16.276 17 16 17c-0.553 0-1-0.447-1-1 0-0.276 0.112-0.526 0.293-0.707L28.586 2H25c-0.553 0-1-0.447-1-1s0.447-1 1-1h6c0.553 0 1 0.447 1 1V7z"/>
                    </svg>
                  </AnchorAlign>
                </MainNavItem> */}
              </MainNav>

              
              {/* <MenuHeader>
                <Link href="/topics">
                  <a onClick={ handleMenu }>
                    <MenuTitle>Explore Topics</MenuTitle>
                  </a>
                </Link>
              </MenuHeader>
              <GridMicroFade>
                { topicMenu && topicMenu.map( (topic) => {
                  return topic.item !== null ? (
                    <ImageSquare
                      handleMenu={ handleMenu }  
                      imageSquareLink={ `/topics/${topic.item._meta.uid}` }
                      key={ topic.item._meta.id }
                      source1X={ topic.item.square_image?.mobile.url }
                      source2X={ topic.item.square_image?.url }
                      title={ topic.item.title[0].text }
                    />                    
                  ) : (
                    <div key={ randomID(10000000) }></div>
                  )
                })}                
              </GridMicroFade> */}
            </>
          )}
        </NavContainer>
        <NavOverlay 
          menuState={ menuState }
          onClick={ handleMenu }
        />
      </>
    )
  // }
}

export default NavMenu

