import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { randomID, linkResolver } from '~/utils';

const ItemList = styled.ul`
  list-style: none !important;
  padding: 0 !important;
  margin: 0 !important;

  li a,
  li a:focus,
  li a:visited {
    background-color: none !important;
    color: #fff !important;
    padding: ${(props) => (props.isMobileMenu ? '8px 0' : '15px 20px')} !important;
    display: block !important;
    font-family: ${(props) => props.theme.montserrat} !important;
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

/**
 * <DropdownList>
 *
 * Adds in the actual content to the dropdown menu
 *
 * @param { array } data - array of menu items (coming from prismic)
 * @param { function } handler - handler that closes the menu
 * @param { boolean } isMobileMenu - T|F for menu status
 */

const DropdownList = ({ data, handler, isMobileMenu }) => {
  return (
    <ItemList isMobileMenu={isMobileMenu}>
      {data.menu.menu_items &&
        data.menu.menu_items.map((menu_item) => {
          return (
            <li key={randomID(10000000)}>
              {menu_item.link._linkType === 'Link.web' ? (
                <a href={menu_item.link.url} onClick={handler} target="_blank">
                  {menu_item.text}
                </a>
              ) : (
                <Link href={linkResolver(menu_item.link._meta)}>
                  <a onClick={handler}>{menu_item.text}</a>
                </Link>
              )}
            </li>
          );
        })}
    </ItemList>
  );
};

export default DropdownList;
