import React from 'react'
import styled, { keyframes } from 'styled-components'
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';

import { AlgoliaReactClient, ALGOLIA_INDEX_NAME } from '../../lib/algolia/algoliaClient'

const SearchContainer = styled.nav`
  background-color: ${ props => props.theme.lightestGray };
  bottom: 10vh;
  box-shadow: 0 2px 5px rgba(0,0,0,.2);
  height: 80vh;
  left: 8vw;
  margin: 0 auto;
  max-width: ${ props => props.theme.lg };
  overflow: auto;
  padding: 25px;
  position: fixed;
  right: 8vw;
  top: 10vh;
  transition: 0.4s ease-in-out;
  transform: ${props => props.searchState ? "translateY(0)" : "translateY(-120%)" };
  width: 84vw;
  will-change: transform;
  z-index: ${props => props.theme.zIndex05};
`

const SearchOverlay = styled.section`
  background-color: ${props => props.theme.black};
  min-height: 100vh;
  opacity: ${props => props.searchState ? "0.8" : "0" };
  transition: all 0.4s ease-in-out;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  visibility: ${props => props.searchState ? "visible" : "hidden" };
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

/**
 * <Search>
 * 
 * This component powers the Algolia-based search experience
 * It's kind of a one-off, so you just plug this in and you should be good
 * 
 * @param { boolean } searchState - lifted state true/false toggle for search opening/closing
 * @param { function } handleSearch - lifted state changer for search state, handles click event
 */

 const Search = ({ 
   searchState, 
   handleSearch 
}) => {
  return (
    <>
      <SearchContainer searchState={ searchState }>
        <InstantSearch 
          searchClient={ AlgoliaReactClient } 
          indexName={ ALGOLIA_INDEX_NAME } >
          <SearchBox />
          <Hits />
        </InstantSearch>
      </SearchContainer>
      <SearchOverlay 
        searchState={ searchState }
        onClick={ handleSearch }
      />
    </>
  )
}

export default Search