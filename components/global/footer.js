import React from "react";
import styled from "styled-components";
import Link from "next/link"

import SignUpForm from "./form"
import BasicTextField from './text'

const Bar = styled.footer`
  background-color: ${props => props.theme.darkestGray};
  color: white;
  padding: 0 4vw;
`

const Container = styled.section`
  align-items: stretch;
  display: flex;
  justify-content: flex-start;
  margin: 0 auto;
  max-width: ${props => props.theme.lg};
`;

const StripeMenu = styled.div`
  background-color: ${props => props.theme.redAccent};
  min-height: 70vh;
  min-width: 250px;

  @media screen and (min-width: 320px) {
    min-width: calc(250px + 100 * ((100vw - 320px) / 880));
  }
  @media screen and (min-width: 1200px) {
    min-width: 350px;
  }
`

const MenuContainer = styled.ul`
  color: white;
  font-family: ${props => props.theme.tungsten};
  list-style: none;
  margin: 6vh 4vw;

  li a, li a:visited, li a:focus, li a:active, li a:hover {
    color: white;
    font-size: 36px;
    text-decoration: none;

    @media screen and (min-width: ${props => props.theme.bm}) {
      font-size: calc(36px + 20 * ((100vw - 320px) / 880));
    }

    @media screen and (min-width: ${props => props.theme.lg}) {
      font-size: 56px;
    }
  }
`

const SignUpContainer = styled.div`
  flex-basis: 100%; /* Stretch the signup all the way across the screen */
  margin: 5vh 4vw;

  h2 {
    font-size: 36px;
  }
  @media screen and (min-width: 320px) {
    h2 {
      font-size: calc(36px + 20 * ((100vw - 320px) / 880));
      line-height: calc(36px + 20 * ((100vw - 320px) / 880));
    }
  }
  @media screen and (min-width: 1200px) {
    h2 {
      font-size: 56px;
    }
  }  
`

function Footer() {
  return (
    <>
      <Bar>
        <Container>
          <StripeMenu>
            <MenuContainer>
              <li><Link href="/"><a>Mission</a></Link></li>
              <li><Link href="/"><a>Team</a></Link></li>
              <li><Link href="/"><a>Careers</a></Link></li>
              <li><Link href="/"><a>Privacy</a></Link></li>
              <li><Link href="/"><a>Join</a></Link></li>
              <li><Link href="/"><a>Members</a></Link></li>
            </MenuContainer>
          </StripeMenu>
          <SignUpContainer>
            <h2>Let's stay in touch. Join our newsletter list:</h2>
            <SignUpForm />
          </SignUpContainer>
        </Container>
      </Bar>
    </>
  );
}

export default Footer;
