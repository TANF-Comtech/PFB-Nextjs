import React, { useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { useQuery, gql } from '@apollo/client'
import { RichText } from 'prismic-reactjs'
import Link from 'next/link'

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
`

const MenuTitle = styled.h2`
  animation: ${fadeIn} 0.75s ease forwards;
  animation-delay: 0.4s;
  opacity: 0;
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

/**
 * <Nav>
 * 
 * Desc
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
        item {
          ... on Landing_page {
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
          _linkType
          __typename
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

  console.log(data)

  if (data) {
    const mainMenu = data.nav_menu.main_menu_items
    const topicMenu = data.nav_menu.topic_menu_items

    return(
      <>
        <NavContainer menuState={ menuState }>
          <MenuHeader>
            { menuState === true && (
              <MenuTitle>Explore</MenuTitle>
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
            <MainNav>
              { mainMenu.map( (menu_item) => {
                return (
                  <MainNavItem key={ randomID(10000000)} >
                    <Link 
                      href={ '/' + menu_item.item._meta.uid } >
                      <a>
                        { RichText.asText(menu_item.item.title) }
                      </a>
                    </Link>
                  </MainNavItem>
                )
              })}
            </MainNav>
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

