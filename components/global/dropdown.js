import Link from 'next/link'
import styled from "styled-components";

import { randomID } from "../../lib/utils"

const Container = styled.nav`
  background-color: ${ (props) => { 
    return props.isGlobalMenu === true ? ( props.theme.midnightBlue ) : ( props.theme.gray )
  }};
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  opacity: ${ props => props.dropdownState === true ? '1' : '0' };
  position: absolute;
  left: 0;
  margin: 0 auto;
  right: 0;
  top: ${ (props) => { 
      return props.isGlobalMenu === true ? ( '5vh' ) : ( '22vh' )
    }};
  transform: ${ props => props.dropdownState === true ? 'translateY(0)' : 'translateY(-20px)' };
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  visibility: ${ props => props.dropdownState === true ? 'visible' : 'hidden' };
  width: 300px;
  z-index: ${ props => props.theme.zIndex01 };

  /* This is COMPLEX - heads up */
  /* We're checking for the Global Menu, if present we want the menu left */
  /* But also have to account for how wide the screen is to know how left we want the menu */
  /* The inverse is also true - for non global menus on the right side of the page, we have to figure out how right we want them */
  @media (min-width: 600px) {
    left: ${ (props) => { 
      return props.isGlobalMenu === true ? (
        props.activeWidth > 1200 ? ((props.activeWidth - 1200) / 2 + 'px') : ('2vw')
      ) : (
        'auto'
      )    
    }};
    margin: inherit;
    right: ${ (props) => { 
      return props.isGlobalMenu === true ? (
        'auto'
      ) : (
        props.activeWidth > 1200 ? ((props.activeWidth - 1200) / 2 + 'px') : ('5vw')
      )    
    }};
    top: ${ (props) => { 
      return props.isGlobalMenu === true ? ( '5vh' ) : ( '18vh' )
    }};
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li a, li a:focus, li a:visited {
    text-decoration: none;
    color: #fff;
    padding: 15px 20px;
    display: block;
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    line-height: 1.2;
  }

  li a:hover {
    text-decoration: underline;
  }
`

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
 * @param { boolean } isGlobalMenu - whether the dropdown is the global menu or not
 */
const Dropdown = ({
  activeWidth, 
  data,
  dropdownHandler,
  dropdownRef,
  dropdownState, 
  isGlobalMenu
}) => {
  return (
    data !== undefined && 
      <Container
        activeWidth={ activeWidth }
        dropdownState={ dropdownState }
        isGlobalMenu={ isGlobalMenu }
        ref={ dropdownRef }
      >
        <ul>  
          { data.menu.menu_items && 
            data.menu.menu_items.map( (menu_item) => {
              return (
                <li key={ randomID(10000000) }>
                  { menu_item.link._linkType === 'Link.web' ? (
                    <a 
                      href={ menu_item.link.url }
                      onClick={ dropdownHandler }
                      target="_blank">
                        { menu_item.text }
                    </a>
                  ) : (
                    <Link href={ linkResolver(menu_item.link._meta) }>
                      <a onClick={ dropdownHandler }>
                        { menu_item.text }
                      </a>
                    </Link>
                  )}
                </li>
              )
            }) 
          }
        </ul>   
      </Container>
  )
}

export default Dropdown

