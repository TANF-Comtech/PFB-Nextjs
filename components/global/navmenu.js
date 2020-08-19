import React from 'react'
import styled, { keyframes } from 'styled-components'

const NavContainer = styled.nav`
  background-color: #fff;
  bottom: 0;
  box-shadow: 0 2px 5px rgba(0,0,0,.2);
  left: 0;
  max-width: ${props => props.theme.xs};
  min-height: 100vh;
  overflow: auto;
  padding: 25px;
  position: fixed;
  right: 0;
  top: 0;
  transition: 0.4s ease-in-out;
  transform: ${props => props.menuState ? "translateX(0)" : "translateX(-100%)" };
  will-change: transform;
  z-index: ${props => props.theme.zIndex05};
`

const NavOverlay = styled.section`
  background-color: ${props => props.theme.black};
  min-height: 100vh;
  opacity: ${props => props.menuState ? "0.8" : "0" };
  transition: all 0.4s ease-in-out;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  visibility: ${props => props.menuState ? "visible" : "hidden" };
  z-index: ${props => props.theme.zIndex04};
`

const iconEntry = keyframes`
  0%, 50% {
    transform: scale(0)
  }
  90% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

const MenuHeader = styled.header`
  align-items: center;
  display: flex;
  justify-content: space-between;
`

const MenuButtonCont = styled.div`
  align-items: center;
  background: #fff; 
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
  animation: ${iconEntry} 0.75s ease forwards;
  cursor: pointer;
  height: 32px;
  margin: 0;
  width: 32px;
`

/**
 * <Nav>
 * 
 * Desc
 * 
 * @param { boolean } menuState - lifted state true/false toggle for menu opening/closing
 * @param { function } handleMenu - lifted state changer for menuState, handles click event
 */

const NavMenu = ({ children, menuState, handleMenu }) => {
  return(
    <>
      <NavContainer menuState={ menuState }>
        <MenuHeader>
          <h2>Explore</h2>
          <MenuButtonCont onClick={ handleMenu }>
          { menuState === true ? (
            <MenuClose 
              stroke="currentColor" 
              fill="currentColor" 
              stroke-width="0" 
              viewBox="0 0 24 24"
            >
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </MenuClose>
          ) : (<></>)}
          </MenuButtonCont>
        </MenuHeader>
      </NavContainer>
      <NavOverlay 
        menuState={ menuState }
        onClick={ handleMenu }
      />
    </>
  )
}

export default NavMenu