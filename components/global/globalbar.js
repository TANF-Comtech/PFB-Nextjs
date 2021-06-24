import React, { useContext, useEffect, useRef } from 'react'
import styled from "styled-components"

import { useQuery, gql } from '@apollo/client'

import MenuContext from '../../context/menu/menu-context'

import MainContent from "../global/main-content"
import SearchButton from "../primitives/search-button"
import Search from '../global/search'
import { Dropdown } from '../global/dropdown'

import { linkResolver, randomID } from "../../lib/utils"
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

// GraphQL query for menu data
const GLOBAL_MENU_DATA = gql`
  query NavMenu($uid: String!, $lang: String!) {
    menu(uid: $uid, lang: $lang) {
      _linkType
      _meta {
        type
        uid
        id
      }
      menu_items {
        text
        link {
          ... on Landing_page {
            title
            _meta {
              id
              uid
              type
            }
          }
          ... on _ExternalLink {
            url
            target
            _linkType
          }          
        }
      }
    }
  } 
`

/**
 * <GlobalBar>
 *
 * @param { boolean } searchState - passed, lifted state true/false toggle for search opening/closing
 * @param { function } handleSearch - passed, lifted state changer for search state, handles click event
 * 
 */
 const GlobalBar = () => {

  // Query for nav menu from Apollo
  const { loading, error, data } = useQuery(GLOBAL_MENU_DATA, {
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
          <NetworkControl
            onClick={ handleGlobalSites }
          >
            <span><MobileHide>Explore Our</MobileHide> Network of Sites</span>
          </NetworkControl>
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
          dropdownState={ globalSites }
          isGlobalMenu={ true }
          ref={ globalDropdownRef }
        >
          <ul>  
            { data.menu.menu_items && 
              data.menu.menu_items.map( (menu_item) => {
                return (
                  <li key={ randomID(10000000) }>
                    { menu_item.link._linkType === 'Link.web' ? (
                      <a 
                        href={ menu_item.link.url }
                        onClick={ handleGlobalSites }
                        target="_blank">
                          { menu_item.text }
                      </a>
                    ) : (
                      <Link href={ linkResolver(menu_item.link._meta) }>
                        <a onClick={ handleGlobalSites }>
                          { menu_item.text }
                        </a>
                      </Link>
                    )}
                  </li>
                )
              }) 
            }
          </ul>   
        </Dropdown> 
      }        
    </>
  )
}

export default GlobalBar