import React, { useState, useEffect } from 'react'
import styled from "styled-components"

import MainContent from "../global/main-content"
import SearchButton from "../primitives/search-button"
import Search from '../global/search'

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

/**
 * <GlobalBar>
 *
 * @param { boolean } searchState - passed, lifted state true/false toggle for search opening/closing
 * @param { function } handleSearch - passed, lifted state changer for search state, handles click event
 * 
 */
 const GlobalBar = () => {

  // Search opening state change, send state down to <Search>
  const [search, setSearch] = useState(false);
  const handleSearch = () => {
    setSearch(!search);
  };

  // Locks scrolling if you engage the search
  useEffect( () => {
    if( search === true) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }
  })  

  return (
    <>
      <MainContent 
        bgColor="#002C40"
        contentPadding="1vh 4vw"
        textColor="#fff"
      >
        <Bar>
          <NetworkControl>
            <span><MobileHide>Explore Our</MobileHide> Network of Sites</span>
          </NetworkControl>
          <SearchControl
            searchState={ search }
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
    </>
  )
}

export default GlobalBar