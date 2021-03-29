import React from 'react'
import styled, { keyframes } from 'styled-components'
import { useQuery, gql } from '@apollo/client'
import { RichText } from 'prismic-reactjs'
import Link from 'next/link'

import { randomID, linkResolver } from '../../lib/utils'

import ImageSquare from '../global/image-square'
import Logo from '../global/logo'
import LogoType from '../global/logotype'

import ShareIcon from '../../public/icons/share.svg'

const NavContainer = styled.nav`
  background-color: #fff;
  bottom: 0;
  box-shadow: 0 2px 5px rgba(0,0,0,.2);
  left: 0;
  max-width: ${props => props.theme.xs};
  min-height: 100vh;
  overflow: auto;
  padding: 25px;
  position: fixed;
  right: 0;
  top: 0;
  transition: 0.4s ease-in-out;
  transform: ${props => props.menuState ? "translateX(0)" : "translateX(-100%)" };
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

const MenuButtonCont = styled.div`
  align-items: center;
  background: #fff; 
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
    color: ${props => props.theme.black };
    text-decoration: none;
    transition: 0.2s ease-in-out;
  }
  a:hover {
    color: ${props => props.theme.red };
    text-decoration: none;
  }
`

const MainNavItem = styled.li`
  cursor: pointer;
  font-size: 36px;
  font-family: ${ props => props.theme.dharma };
  font-weight: 300;
  line-height: 32px;
  padding: 1vh 0;

  @media screen and (min-width: 320px) {
    font-size: calc(36px + 6 * ((100vw - 320px) / 880));
    line-height: calc(32px + 6 * ((100vw - 320px) / 880));
  }
  @media screen and (min-width: 1200px) {
    font-size: 42px;
    line-height: 38px;
  } 
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

const LogoContainer = styled.section`
  align-items: flex-end;
  animation: ${fadeIn} 0.75s ease forwards;
  animation-delay: 0.4s;
  display: flex;
  opacity: 0;
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

const NAV_MENU_DATA = gql`
  query NavMenu($uid: String!, $lang: String!) {
    nav_menu(uid: $uid, lang: $lang) {
      _meta {
        uid
        id
      }
      main_menu_items {
        menu_text
        item {
          __typename
          ... on Landing_page {
            title
            _meta {
              id
              uid
            }
          }
        }
      }
      topic_menu_items {
        item {
          __typename
          ... on Topic {
            title
            square_image
            _meta {
              uid
              id
            }
          }        
        }
      }
    }
  }  
`

const NavMenu = ({ menuState, handleMenu }) => {

  // Query for nav menu from Apollo
  const { loading, error, data } = useQuery(NAV_MENU_DATA, {
    variables: {
      "uid": "nav-menu",
      "lang": "en-us"
    }
  })

  if (data) {
    const mainMenu = data.nav_menu.main_menu_items
    const topicMenu = data.nav_menu.topic_menu_items

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
                />
              </LogoContainer>
            )}
            <MenuButtonCont onClick={ handleMenu }>
            { menuState === true && (
              <MenuClose 
                stroke="currentColor" 
                fill="currentColor" 
                stroke-width="0" 
                viewBox="0 0 24 24"
              >
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </MenuClose>
            )}
            </MenuButtonCont>
          </MenuHeader>
          { menuState === true && (
            <>
              <MainNav>                                                                              
                { mainMenu.map( (menu_item) => {
                  return (
                    <MainNavItem key={ randomID(10000000) } >
                      <Link href={ linkResolver(menu_item.item, true) } >
                        <a onClick={ handleMenu } >
                          { menu_item.menu_text ? menu_item.menu_text : RichText.asText(menu_item.item.title) }
                        </a>
                      </Link>
                    </MainNavItem>
                  )
                })}
                <MainNavItem>
                  PeopleForBikes at Work
                </MainNavItem>
                <MainNavItem>
                  <MainNav>
                    <MainSubNavItem>
                      <Link href="/grants" >
                        <a onClick={ handleMenu } >
                          Grants
                        </a>
                      </Link>
                    </MainSubNavItem>                    
                    <MainSubNavItem>
                      <Link href="/policy" >
                        <a onClick={ handleMenu } >
                          Policy
                        </a>
                      </Link>
                    </MainSubNavItem>     
                    <MainSubNavItem>
                      <Link href="/research" >
                        <a onClick={ handleMenu } >
                          Research
                        </a>
                      </Link>
                    </MainSubNavItem> 
                    <MainSubNavItem>
                      <Link href="/local-innovation" >
                        <a onClick={ handleMenu } >
                          Local Innovation
                        </a>
                      </Link>
                    </MainSubNavItem>                                                        
                  </MainNav>
                </MainNavItem>
                <MainNavItem>
                  <AnchorAlign href="https://store.peopleforbikes.org/" rel="nofollow" target="_blank">
                    Shop Our Store + Give Back
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" >
                      <path d="M2 30V2h17c0.553 0 1-0.447 1-1s-0.447-1-1-1H2C0.896 0 0 0.896 0 2v28c0 1.104 0.896 2 2 2h28c1.104 0 2-0.896 2-2V13c0-0.553-0.447-1-1-1s-1 0.447-1 1v17H2z"/>
                      <path d="M32 7c0 0.553-0.447 1-1 1s-1-0.447-1-1V3.414L16.707 16.707C16.526 16.888 16.276 17 16 17c-0.553 0-1-0.447-1-1 0-0.276 0.112-0.526 0.293-0.707L28.586 2H25c-0.553 0-1-0.447-1-1s0.447-1 1-1h6c0.553 0 1 0.447 1 1V7z"/>
                    </svg>
                  </AnchorAlign>
                </MainNavItem>
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
  }

  if (loading) return `<h2>Loading...</h2>`;
  if (error || undefined) return console.log(`Error! ${error}`);
}

export default NavMenu

