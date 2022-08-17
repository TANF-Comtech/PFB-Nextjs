import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { randomID, linkResolver } from '~/utils';

const ItemList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li a,
  li a:focus,
  li a:visited {
    background-color: none;
    color: #fff;
    padding: ${(props) => (props.isMobileMenu ? '8px 0' : '15px 20px')};
    display: block;
    font-family: ${(props) => props.theme.montserrat};
    font-size: 16px;
    font-weight: 700;
    text-decoration: none;
    text-transform: uppercase;
    line-height: 1.2;
  }

  li a:hover {
    text-decoration: underline;
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
