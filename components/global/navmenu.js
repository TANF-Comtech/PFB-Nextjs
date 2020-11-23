import React, { useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { useQuery, gql } from '@apollo/client'
import { RichText } from 'prismic-reactjs'
import Link from 'next/link'

import ImageSquare from '../../components/global/image-square'

import { DocLink, randomID, linkResolver } from '../../lib/utils'

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

const MenuTitle = styled.h2`
  animation: ${fadeIn} 0.75s ease forwards;
  animation-delay: 0.4s;
  color: black;
  opacity: 0;
  text-decoration: none !important;
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
  margin: 0 0 3vh 0;
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
  font-size: 24px;
  font-family: ${props => props.theme.montserrat };
  font-weight: 700;
  line-height: 24px;
  padding: 0.5vh 0;

  @media screen and (min-width: 320px) {
    font-size: calc(24px + 12 * ((100vw - 320px) / 880));
    line-height: calc(24px + 12 * ((100vw - 320px) / 880));
  }
  @media screen and (min-width: 1200px) {
    font-size: 36px;
    line-height: 36px;
  } 
`

const GridMicro = styled.section`
  animation: ${fadeIn} 0.75s ease forwards;
  animation-delay: 0.6s;
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 1fr 1fr;
  opacity: 0;

  a, a:focus, a:visited, a:hover {
    text-decoration: none;
  }
`;

/**
 * <Nav>
 * 
 * Desc
 * 
 * @param { boolean } menuState - lifted state true/false toggle for menu opening/closing
 * @param { function } handleMenu - lifted state changer for menuState, handles click event
 */

const NAV_MENU_DATA = gql`
  query TempNavMenu($uid: String!, $lang: String!) {
    nav_menu(uid: $uid, lang: $lang) {
      _meta {
        uid
        id
      }
      main_menu_items {
        item {
          ... on Landing_page {
            title
            _linkType
            _meta {
              uid
              id
            }
          }
          ... on Topics {
            title
            _linkType
            _meta {
              uid
              id
            }
          }
          ... on Locations_landing {
            title
            _linkType
            _meta {
              uid
              id
            }
          }
        }
      }
      topic_menu_items {
        item {
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
              <MenuTitle>Our Work</MenuTitle>
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
                  return menu_item.item !== null ? (
                    <MainNavItem key={ randomID(10000000) } >
                      <Link 
                        href={ '/' + menu_item.item._meta.uid } 
                      >
                        <a onClick={ handleMenu } >
                          { RichText.asText(menu_item.item.title) }
                        </a>
                      </Link>
                    </MainNavItem>
                  ) : (
                    <div key={ randomID(10000000) }></div>
                  )
                })}
              </MainNav>
              <MenuHeader>
                <Link href="/topics">
                  <a>
                    <MenuTitle>Explore Topics</MenuTitle>
                  </a>
                </Link>
              </MenuHeader>
              <GridMicro>
                { topicMenu && topicMenu.map( (topic) => {
                  return topic.item !== null ? (
                    <ImageSquare
                      imageSquareLink={ `/topics/${topic.item._meta.uid}` }
                      source1X={ topic.item.square_image?.mobile.url }
                      source2X={ topic.item.square_image?.url }
                      title={ topic.item.title[0].text }
                      key={ topic.item._meta.id }
                    />                    
                  ) : (
                    <div key={ randomID(10000000) }></div>
                  )
                })}                
              </GridMicro>
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

