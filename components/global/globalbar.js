import React, { useContext, useEffect, useRef } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import styled from "styled-components"

import { useQuery } from '@apollo/client'
import { MENU_DATA } from '../../lib/apollo/menu-queries'

import AuthContext from '../../context/auth/auth-context'
import logoutRequest from "../../lib/auth/logoutRequest"
import MenuContext from '../../context/menu/menu-context'

import MainContent from "../global/main-content"
import SearchButton from "../primitives/search-button"
import Search from '../global/search'
import Dropdown from '../global/dropdown'
import { FlexContainer } from '../styles/simples'

import useOnClickOutside from "../../hooks/useOnClickOutside"

const Bar = styled.section`
  display: flex;
  justify-content: space-between;

  span {
    font-size: 14px;
    margin-bottom: 0;
  }
` 

const NetworkControl = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;

  &:after {
    @media( min-width: ${props => props.theme.xs} ) {
      content: "|";
      padding: 0 10px;
    }
  }
`
const MemberLink = styled.div`
  display: none;

  @media( min-width: ${props => props.theme.xs}) {
    display: inline;

    a, a:hover, a:focus, a:visited {
      color: white;
      cursor: pointer;      
      font-size: 14px;
      font-weight: 700;
      text-decoration: none;
      text-transform: uppercase;
    } 

    span {
      display: none;

      @media( min-width: ${props => props.theme.sm}) {
        border: 1px solid #fff;
        color: ${props => props.theme.yellow} !important;
        display: inline;
        font-weight: 700;
        margin-left: 5px;
        padding: 2px 4px;
        text-decoration: none;
        text-transform: uppercase;
      }
    }
  }
`

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
`

const MobileHide = styled.span`
  display: none;

  @media (min-width: ${props => props.theme.sm}) {
    display: inline;
  }
`

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
  const authContext = useContext(AuthContext)

  // Query for nav menu from Apollo
  const { loading, error, data } = useQuery(MENU_DATA, {
    variables: {
      "uid": "global-network-menu",
      "lang": "en-us"
    }
  })

  // Pull in search and global dropdown menu state from context
  const { search, 
          handleSearch,
          globalSites,
          setGlobalSites,
          handleGlobalSites,
          windowSize
        } = useContext(MenuContext)

  // Logout for authenticated users
  const logout = () =>{
    logoutRequest().then(data => {
      if(data.status===true) {
        authContext.updateAuthContext( { 
          "user": {
            "email": data?.email,
            "name": data?.name,
            "affiliation": data?.affiliation,
          },
          "loggedIn": false
        });
        Router.push('/')
      }   
    })
  }

  // Locks scrolling if you engage the search
  useEffect( () => {
    if( search === true) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }
  })  

  // Dropdown stuff - use ref to tell click hook when user has engaged with dropdown
  // This allows us to recognize any non-dropdown click and close menu appropriately 
  const globalDropdownRef = useRef()
  useOnClickOutside( globalDropdownRef, () => setGlobalSites(false) )  

  return (
    <>
      <MainContent 
        bgColor="#002C40"
        contentPadding="1vh 4vw"
        textColor="#fff"
      >
        <Bar>
          <FlexContainer 
            flexDirectionMobile="row"
            alignItems="center"
            alignItemsMobile="center"
          >
            <NetworkControl
              onClick={ handleGlobalSites }
            >
              <span><MobileHide>Explore Our</MobileHide> Network of Sites</span>
            </NetworkControl>
            <MemberLink>
              <Link href="/members">
                <a>
                  Member Center 
                </a>
              </Link>              
            </MemberLink>
            <MemberLink>
              {!authContext.loggedIn ? (
                <Link href="/log-in">
                  <a><span>Login</span></a>
                </Link>
              ) : (
                <span onClick={ ()=>{ logout() } }>
                  Logout
                </span>
              )}                    
            </MemberLink>            
          </FlexContainer>
          <SearchControl
            onClick={ handleSearch }
          >
            <span>Search</span>
            <SearchButton 
              color="#fff"
              size="18px"
            />
          </SearchControl>
        </Bar>
      </MainContent>
      <Search
        searchState={ search }
        handleSearch={ handleSearch }
      />
      { data !== undefined &&
        <Dropdown 
          activeWidth={ windowSize.width }
          data={ data }
          dropdownState={ globalSites }
          dropdownHandler={ handleGlobalSites }
          dropdownRef={ globalDropdownRef }
          isGlobalMenu={ true }
        />
      }        
    </>
  )
}

export default GlobalBar