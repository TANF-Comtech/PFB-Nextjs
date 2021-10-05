import React from 'react'
import styled, { keyframes } from 'styled-components'
import { InstantSearch, 
         SearchBox, 
         Hits, 
         RefinementList } from 'react-instantsearch-dom';

import { AlgoliaReactClient,  } from '../../lib/algolia/algoliaClient'

const SearchContainer = styled.nav`
  background-color: ${ props => props.theme.lightestGray };
  bottom: calc(10vh + 50px);
  box-shadow: 0 2px 5px rgba(0,0,0,.2);
  height: calc(80vh - 50px);
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
  bottom: 10vh;
  height: 50px;
  left: 8vw;
  margin: 0 auto;
  max-width: ${ props => props.theme.lg };
  opacity: ${props => props.searchState ? "1" : "0" };
  overflow: auto;
  position: fixed;
  right: 8vw;
  top: calc(90vh - 50px);
  transition: 0.4s ease-in-out;
  transform: ${props => props.searchState ? "translateY(0)" : "translateY(180%)" };
  width: 84vw;
  will-change: transform;
  z-index: ${props => props.theme.zIndex05};
`

const MenuClose = styled.div`
  background-color: ${props => props.theme.blue};
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

export const HitsAndFilters = styled.section`
  align-items: flex-start;
  display: flex;  
`

const AllFilters = styled.div`
  display: none;
  flex-basis: 0;

  @media (min-width: ${props => props.theme.sm}) {
    display: block;
    flex-basis: 200px;
  }

  h3 {
    color: ${props => props.theme.black};
    display: block;
    font-size: 20px;
    font-weight: bold;
    margin: 0 0 8px 0;
    text-transform: uppercase;
  }
`

export const FilterMenu = styled(RefinementList)`
  color: ${props=> props.theme.darkGray};

  label {
    align-items: center;
    display: flex;
    margin: 0 0 10px 0;
  }
  span {
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    line-height: 1;
    margin: 0 5px;
    text-transform: uppercase;
  }
  span[class="ais-RefinementList-count"] {
    color: ${props=> props.theme.gray};
  }
  span[class="ais-RefinementList-count"]:before {
    content: '(';
  }
  span[class="ais-RefinementList-count"]:after {
    content: ')';
  }
  .ais-RefinementList-showMore {
    color: ${props=> props.theme.gray};
    font-family: ${ props => props.theme.montserrat };
    font-weight: bold;
    margin-bottom: 30px;
    text-transform: uppercase;    
  }
`

const AllHits = styled(Hits)`
  flex-basis: 100%;

  @media (min-width: ${props => props.theme.sm}) {
    flex-basis: calc(100% - 225px);
    margin-left: 25px;
  }
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
 * <Filter>
 * 
 * This component powers the Algolia-based search experience
 * It's kind of a one-off, so you just plug this in and you should be good
 * 
 * @param { boolean } searchState - lifted state true/false toggle for search opening/closing
 * @param { function } handleSearch - lifted state changer for search state, handles click event
 */

 const Filter = ({ 
   searchState, 
   handleSearch 
}) => {

 const Hit = ({ hit }) => {
    return (
      <HitContainer>
        <span>{hit.type}</span>
        <h2><a href={hit.path}>{hit.title}</a></h2>
        {
          hit.content &&
            <p>{ `${hit.content.substring(0,150)} ...` }</p>
        }
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
          <HitsAndFilters>
            <AllFilters>
              <h3>Topics</h3>
              <FilterMenu
                attribute="topics" 
                limit={5}
                showMore
              />
              <h3>Locations</h3>
              <FilterMenu
                attribute="locations" 
                limit={5}
                showMore
              />
            </AllFilters>
            <AllHits hitComponent={Hit} />
          </HitsAndFilters>
        </InstantSearch>
      </SearchContainer>
      <MenuButtonCont 
        onClick={ handleSearch }
        searchState={ searchState }
      >
        { searchState === true && (
          <MenuClose>
            Close Search 
          </MenuClose>
        )}
      </MenuButtonCont>       
      <SearchOverlay 
        onClick={ handleSearch }
        searchState={ searchState }
      />
    </>
  )
}

export default Filter