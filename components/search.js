import React from 'react';
import styled from 'styled-components';
import { InstantSearch, Hits, RefinementList } from 'react-instantsearch-dom';

import { AlgoliaReactClient } from '~/lib/algolia/algoliaClient';

import CustomSearchBox from '~/components/search-box';

const SearchContainer = styled.nav`
  background-color: ${(props) => props.theme.lightestGray} !important;
  bottom: calc(10vh + 50px) !important;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2) !important;
  height: calc(80vh - 50px) !important;
  left: 8vw !important;
  margin: 0 auto !important;
  max-width: ${(props) => props.theme.lg} !important;
  overflow: auto !important;
  padding: 25px !important;
  position: fixed !important;
  right: 8vw !important;
  top: 10vh !important;
  transition: 0.4s ease-in-out !important;
  transform: ${(props) => (props.searchState ? 'translateY(0)' : 'translateY(-120%)')} !important;
  width: 84vw !important;
  will-change: transform !important;
  z-index: ${(props) => props.theme.zIndex05} !important;
`;

const SearchOverlay = styled.section`
  background-color: ${(props) => props.theme.black} !important;
  min-height: 100vh !important;
  opacity: ${(props) => (props.searchState ? '0.8' : '0')} !important;
  transition: all 0.4s ease-in-out !important;
  position: fixed !important;
  top: 0 !important;
  bottom: 0 !important;
  left: 0 !important;
  right: 0 !important;
  visibility: ${(props) => (props.searchState ? 'visible' : 'hidden')} !important;
  z-index: ${(props) => props.theme.zIndex04} !important;
`;

const MenuButtonCont = styled.section`
  bottom: 10vh !important;
  height: 50px !important;
  left: 8vw !important;
  margin: 0 auto !important;
  max-width: ${(props) => props.theme.lg} !important;
  opacity: ${(props) => (props.searchState ? '1' : '0')} !important;
  overflow: auto !important;
  position: fixed !important;
  right: 8vw !important;
  top: calc(90vh - 50px) !important;
  transition: 0.4s ease-in-out !important;
  transform: ${(props) => (props.searchState ? 'translateY(0)' : 'translateY(200vh)')} !important;
  width: 84vw !important;
  will-change: transform !important;
  z-index: ${(props) => props.theme.zIndex05} !important;
`;

const MenuClose = styled.div`
  background-color: ${(props) => props.theme.blue} !important;
  color: white !important;
  cursor: pointer !important;
  font-size: 18px !important;
  font-weight: 700 !important;
  padding: 10px 0 !important;
  text-align: center !important;
  text-transform: uppercase !important;
`;

const HitsAndFilters = styled.section`
  align-items: flex-start !important;
  display: flex !important;
`;

const AllFilters = styled.div`
  display: none !important;
  flex-basis: 0 !important;

  @media (min-width: ${(props) => props.theme.sm}) {
    display: block !important;
    flex-basis: 200px !important;
  }

  h3 {
    color: ${(props) => props.theme.black} !important;
    display: block !important;
    font-size: 20px !important;
    font-weight: bold !important;
    margin: 0 0 8px 0 !important;
    text-transform: uppercase !important;
  }
`;

const FilterMenu = styled(RefinementList)`
  color: ${(props) => props.theme.darkGray} !important;

  label {
    align-items: center !important;
    display: flex !important;
    margin: 0 0 10px 0 !important;
  }
  span {
    cursor: pointer !important;
    font-size: 14px !important;
    font-weight: bold !important;
    line-height: 1 !important;
    margin: 0 5px !important;
    text-transform: uppercase !important;
  }
  span[class='ais-RefinementList-count'] {
    color: ${(props) => props.theme.gray} !important;
  }
  span[class='ais-RefinementList-count']:before {
    content: '(' !important;
  }
  span[class='ais-RefinementList-count']:after {
    content: ')' !important;
  }
  .ais-RefinementList-showMore {
    color: ${(props) => props.theme.gray} !important;
    font-family: ${(props) => props.theme.montserrat} !important;
    font-weight: bold !important;
    margin-bottom: 30px !important;
    text-transform: uppercase !important;
  }
`;

const AllHits = styled(Hits)`
  flex-basis: 100% !important;

  @media (min-width: ${(props) => props.theme.sm}) {
    flex-basis: calc(100% - 225px) !important;
    margin-left: 25px !important;
  }
`;

const HitContainer = styled.div`
  span {
    color: ${(props) => props.theme.red} !important;
    display: block !important;
    font-family: ${(props) => props.theme.montserrat} !important;
    font-weight: bold !important;
    margin-bottom: 0 !important;
    text-transform: uppercase !important;
  }
  h2 {
    line-height: 42px !important;
  }
  a,
  a:focus,
  a:visited,
  a:hover {
    color: ${(props) => props.theme.black} !important;
    font-size: 42px !important;
  }
  p {
    font-size: 18px !important;
    line-height: 24px !important;
  }
`;

/**
 * <Search>
 *
 * This component powers the Algolia-based search experience
 * It's kind of a one-off, so you just plug this in and you should be good
 *
 * @param { boolean } searchState - lifted state true/false toggle for search opening/closing
 * @param { function } handleSearch - lifted state changer for search state, handles click event
 */

const Search = ({ searchState, handleSearch }) => {
  const Hit = ({ hit }) => {
    return (
      <HitContainer>
        <span>{hit.type}</span>
        <h2>
          <a href={hit.path}>{hit.title}</a>
        </h2>
        {hit.content && <p>{`${hit.content.substring(0, 150)} ...`}</p>}
        <hr />
      </HitContainer>
    );
  };

  return (
    <>
      <SearchContainer searchState={searchState}>
        <InstantSearch searchClient={AlgoliaReactClient} indexName="MAINSITE">
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
              <FilterMenu attribute="topics" limit={5} showMore />
              <h3>Locations</h3>
              <FilterMenu attribute="locations" limit={5} showMore />
            </AllFilters>
            <AllHits hitComponent={Hit} />
          </HitsAndFilters>
        </InstantSearch>
      </SearchContainer>
      <MenuButtonCont onClick={handleSearch} searchState={searchState}>
        {searchState === true && <MenuClose>Close Search</MenuClose>}
      </MenuButtonCont>
      <SearchOverlay onClick={handleSearch} searchState={searchState} />
    </>
  );
};

export default Search;
