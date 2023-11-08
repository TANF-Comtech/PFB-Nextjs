import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { randomID } from '~/utils';

import ImageSquare from '~/components/image-square';
import DropdownList from '~/components/dropdown-list';

const OuterContainer = styled.nav`
  background-color: ${(props) => {
    return props.isCityRatingsMenu === true ? props.theme.gray : props.theme.midnightBlue;
  }} !important;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3) !important;
  opacity: ${(props) => (props.dropdownState === true ? '1' : '0')} !important;
  position: fixed !important;
  left: 0 !important;
  right: 0 !important;
  top: ${(props) => {
    return props.isGlobalMenu === true ? '5vh' : '22vh';
  }} !important;
  transform: ${(props) =>
    props.dropdownState === true ? 'translateY(0)' : 'translateY(-20px)'} !important;
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s !important;
  visibility: ${(props) => (props.dropdownState === true ? 'visible' : 'hidden')} !important;
  min-width: 300px !important;
  z-index: ${(props) => props.theme.zIndex03} !important;

  /* This is COMPLEX - heads up */
  /* We're checking for the Global Menu, if present we want the menu left */
  /* But also have to account for how wide the screen is to know how left we want the menu */
  /* The inverse is also true - for non global menus on the right side of the page, we have to figure out how right we want them */
  @media (min-width: 600px) {
    left: ${(props) => {
      return props.isGlobalMenu === true
        ? props.activeWidth > 1200
          ? (props.activeWidth - 1200) / 2 + 'px'
          : '2vw'
        : 'auto';
    }} !important;
    margin: inherit !important;
    right: ${(props) => {
      return props.isGlobalMenu === true
        ? 'auto'
        : props.activeWidth > 1200
        ? (props.activeWidth - 1200) / 2 + 'px'
        : '2vw';
    }} !important;
    top: ${(props) => {
      return props.isGlobalMenu === true ? '5vh' : '18vh';
    }} !important;
  }
`;

const ItemList = styled.ul`
  list-style: none !important;
  padding: 0 !important;
  margin: 0 !important;

  li {
    background-color: ${(props) => (props.hasTopics ? props.theme.darkGray : 'none')} !important;
  }

  li:first-child {
    background-color: ${(props) => (props.hasTopics ? props.theme.blue : 'none')} !important;
  }

  li a,
  li a:focus,
  li a:visited {
    background-color: none !important;
    color: #fff !important;
    padding: 15px 20px !important;
    display: block !important;
    font-size: 16px !important;
    font-weight: 700 !important;
    text-decoration: none !important;
    text-transform: uppercase !important;
    line-height: 1.2 !important;
  }

  li a:hover {
    text-decoration: underline !important;
  }
`;

const InnerContainer = styled.div`
  display: grid !important;
  grid-gap: 20px !important;
  grid-template-columns: ${(props) => (props.hasTopics ? '1fr 190px' : '1fr')} !important;
  padding: 20px !important;
`;

const TopicContainer = styled.div`
  a,
  a:visited,
  a:focus,
  a:hover {
    text-decoration: none !important;
  }
`;

const AnchorAlign = styled.a`
  align-items: center !important;
  display: flex !important;

  svg {
    fill: #fff !important;
    margin-left: 12px !important;
    width: 12px !important;
    transition: 0.2s ease-in-out !important;
  }
`;

/**
 * <Dropdown>
 *
 * Global instance of a dropdown menu on the site
 * This is just a really fancy styled-component that is worthy of it's own file.
 *
 * @param { number } activeWidth - how wide the window of the site is
 * @param { array } data - payload for an individual menu
 * @param { function } dropdownHandler - the handler to control the menu state
 * @param { object } dropdownRef - react ref for menu
 * @param { boolean } dropdownState - whether the dropdown is open or closed
 * @param { boolean } hasTopics - indicates presence of topics sub menu
 * @param { boolean } isCityRatingsMenu - check to see if it's the gray city ratings menu
 * @param { boolean } isGlobalMenu - whether the dropdown is the global menu or not
 */
const Dropdown = ({
  activeWidth,
  data,
  dropdownHandler,
  dropdownRef,
  dropdownState,
  hasTopics,
  isCityRatingsMenu,
  isGlobalMenu,
}) => {
  // Locks scrolling when dropdown is engaged
  useEffect(() => {
    if (dropdownState === true) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'scroll';
    }
  }, [dropdownState]);

  return (
    <>
      {data !== undefined && (
        <OuterContainer
          activeWidth={activeWidth}
          dropdownState={dropdownState}
          isCityRatingsMenu={isCityRatingsMenu}
          isGlobalMenu={isGlobalMenu}
          ref={dropdownRef}
        >
          <InnerContainer hasTopics={hasTopics}>
            {data.menu.menu_items && <DropdownList data={data} handler={dropdownHandler} />}

            {data.menu.topic_items && (
              <TopicContainer>
                {data.menu.topic_items.map((topic_item) => {
                  return (
                    <ImageSquare
                      handler={dropdownHandler}
                      isNavItem={true}
                      imageSquareLink={
                        topic_item?.link?._meta?.uid && `/topics/${topic_item.link._meta.uid}`
                      }
                      key={randomID(10000000)}
                      source1X={topic_item && topic_item.link.square_image?.mobile.url}
                      source2X={topic_item && topic_item.link.square_image?.url}
                      title={topic_item && topic_item.link.title[0].text}
                    />
                  );
                })}
                <ItemList>
                  <li>
                    <Link
                      href="/topics"
                      onClick={dropdownHandler}
                      dangerouslySetInnerHTML={{
                        __html: 'More Topics &raquo;',
                      }}
                    />
                  </li>
                </ItemList>
              </TopicContainer>
            )}
          </InnerContainer>

          {hasTopics && (
            <ItemList hasTopics={hasTopics}>
              <li>
                <AnchorAlign href="https://www.classy.org/campaign/give-the-gift-of-better-biking/c532765" target="_blank">
                  Donate
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 32 32"
                    enableBackground="new 0 0 32 32"
                  >
                    <path d="M2 30V2h17c0.553 0 1-0.447 1-1s-0.447-1-1-1H2C0.896 0 0 0.896 0 2v28c0 1.104 0.896 2 2 2h28c1.104 0 2-0.896 2-2V13c0-0.553-0.447-1-1-1s-1 0.447-1 1v17H2z" />
                    <path d="M32 7c0 0.553-0.447 1-1 1s-1-0.447-1-1V3.414L16.707 16.707C16.526 16.888 16.276 17 16 17c-0.553 0-1-0.447-1-1 0-0.276 0.112-0.526 0.293-0.707L28.586 2H25c-0.553 0-1-0.447-1-1s0.447-1 1-1h6c0.553 0 1 0.447 1 1V7z" />
                  </svg>
                </AnchorAlign>
              </li>
              <li>
                <AnchorAlign href="https://store.peopleforbikes.org/" target="_blank">
                  Shop
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 32 32"
                    enableBackground="new 0 0 32 32"
                  >
                    <path d="M2 30V2h17c0.553 0 1-0.447 1-1s-0.447-1-1-1H2C0.896 0 0 0.896 0 2v28c0 1.104 0.896 2 2 2h28c1.104 0 2-0.896 2-2V13c0-0.553-0.447-1-1-1s-1 0.447-1 1v17H2z" />
                    <path d="M32 7c0 0.553-0.447 1-1 1s-1-0.447-1-1V3.414L16.707 16.707C16.526 16.888 16.276 17 16 17c-0.553 0-1-0.447-1-1 0-0.276 0.112-0.526 0.293-0.707L28.586 2H25c-0.553 0-1-0.447-1-1s0.447-1 1-1h6c0.553 0 1 0.447 1 1V7z" />
                  </svg>
                </AnchorAlign>
              </li>
            </ItemList>
          )}
        </OuterContainer>
      )}
    </>
  );
};

export default Dropdown;
