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
  align-items: flex-start;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 3vh;

  a, a:focus, a:visited, a:hover {
    color: black;
    text-decoration: none;
  }

  h2 {
    margin: 0;
  }
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
  animation-delay: 0.5s;
  cursor: pointer;
  height: 32px;
  margin: 0;
  opacity: 0;
  width: 32px;
`

const CustomSearchBox = styled(SearchBox)`
  form {
    position: relative;
  }

  input[type=search] {
    border: 1px solid ${ props => props.theme.lightGray };
    border-radius: 0;
    font-family: ${ props => props.theme.dharma };
    font-size: 48px;
    font-weight: 400;
    line-height: 50px;
    margin-bottom: 2vh;
    padding: 1vh 1vw;
    width: 100%;
  }

  button[type=submit] {
    display: none;
  }

  button[type=reset] {
    position: absolute;
    right: 10px;
    top: 25px;
  }

  svg[class=ais-SearchBox-resetIcon] {
    height: 30px;
    width: 30px;
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
          <CustomSearchBox 
            translations={{
              submitTitle: 'Submit your search query.',
              resetTitle: 'Clear your search query.',
              placeholder: 'What are you looking for?',
            }}
          />
          <Hits />
        </InstantSearch>
        <MenuHeader>
          <MenuButtonCont onClick={ handleSearch }>
            { searchState === true && (
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
      </SearchContainer>
      <SearchOverlay 
        searchState={ searchState }
        onClick={ handleSearch }
      />
    </>
  )
}

export default Search