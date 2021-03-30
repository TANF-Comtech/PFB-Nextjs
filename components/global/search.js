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

const MenuButtonCont = styled.section`
  margin: 0 auto;
  width: 250px;
`

const MenuClose = styled.div`
  background-color: ${props => props.theme.red};
  border-radius: 15px;
  color: white;
  cursor: pointer;
  font-size: 18px;
  font-weight: 700;
  padding: 10px 0;
  text-align: center;
  text-transform: uppercase;
`

// Search Components
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
    padding: 1vh 60px 1vh 15px;
    width: 100%;
  }

  button[type=submit] {
    display: none;
  }

  button[type=reset] {
    position: absolute;
    right: 25px;
    top: 25px;
  }

  svg[class=ais-SearchBox-resetIcon] {
    height: 20px;
    transform: scale(0.75);
    width: 20px;
  }
`

const AllHits = styled(Hits)`
  padding: 0;
`

const HitContainer = styled.div`
  span {
    color: ${props => props.theme.red};
    display: block;
    font-family: ${ props => props.theme.montserrat };
    font-weight: bold;
    margin-bottom: 0;
    text-transform: uppercase;
  }
  h2 {
    line-height: 42px;
  }
  a, a:focus, a:visited, a:hover {
    color: ${props => props.theme.black};
    font-size: 42px;
  }
  p {
    font-size: 18px;
    line-height: 24px;
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

  const Hit = ({ hit }) => {
    return (
      <HitContainer>
        <span>{hit.type}</span>
        <h2><a href={hit.path}>{hit.title}</a></h2>
        <p>{ `${hit.content.substring(0,150)} ...` }</p>
        <hr />
      </HitContainer>
    )
  }

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
          <AllHits 
            hitComponent={Hit}
          />
        </InstantSearch>
        <MenuButtonCont onClick={ handleSearch }>
          { searchState === true && (
            <MenuClose>
              Close Search 
            </MenuClose>
          )}
        </MenuButtonCont>          
      </SearchContainer>
      <SearchOverlay 
        searchState={ searchState }
        onClick={ handleSearch }
      />
    </>
  )
}

export default Search