import React from "react";
import styled from "styled-components";
import Link from "next/link"

import SignUpForm from "./form"
import SocialIcon from './social'
import Logo from './logo'
import LogoType from './logotype'

import fb from '../../public/socials/fb.svg'
import insta from '../../public/socials/insta.svg'
import linkedin from '../../public/socials/linkedin.svg'
import twitter from '../../public/socials/twitter.svg'
import yt from '../../public/socials/yt.svg'

const Bar = styled.footer`
  background-color: ${props => props.theme.darkestGray};
  color: white;
  padding: 2vh 0 6vh 0;

  @media screen and (min-width: 768px) {
    padding: 0 4vw;
  }
`

const Container = styled.section`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0 auto;
  max-width: ${props => props.theme.lg};

  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

const StripeMenu = styled.div`
  background-color: ${props => props.theme.redAccent};
  min-width: 250px;

  @media screen and (min-width: 320px) {
    min-width: calc(250px + 100 * ((100vw - 320px) / 880));
  }
  @media screen and (min-width: 768px) {
    min-height: 70vh;
  }
  @media screen and (min-width: 1200px) {
    min-width: 350px;
  }
`

const MenuContainer = styled.ul`
  align-items: center;
  color: white;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-family: ${props => props.theme.tungsten};
  justify-content: center;
  list-style: none;
  margin: 6vh 4vw 2vh 4vw;

  @media (min-width: 768px) {
    align-items: flex-start;
    flex-direction: column;
    justify-content: flex-start;
  }

  li a, li a:visited, li a:focus, li a:active, li a:hover {
    color: white;
    font-size: 36px;
    margin: 0 8px;
    text-decoration: none;
    transition: ${props => props.theme.basicAnimation};
    transform: translateY(0);

    @media (min-width: ${props => props.theme.bm}) {
      font-size: calc(36px + 20 * ((100vw - 320px) / 880));
    }
    @media (min-width: 768px) {
      margin: inherit;
    }
    @media (min-width: ${props => props.theme.lg}) {
      font-size: 56px;
    }
  }

  li a:hover {
    transform: translateY(5px);
  }

`

const SocialContainer = styled.section`
  display: grid;
  grid-gap: 5px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  margin: 0 auto 6vh auto;
  max-width: 210px;

  @media screen and (min-width: 320px) {
    max-width: calc(230px + 57 * ((100vw - 320px) / 880));
  }
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
    margin: 0 3.5vw 8vh 3.5vw;
    max-width: calc(150px + 30 * ((100vw - 320px) / 880));
  }
  @media screen and (min-width: 1200px) {
    max-width: 180px;
  }
`

const SignUpContainer = styled.div`
  display: flex;
  flex-basis: 100%; /* Stretch the signup all the way across the screen */
  flex-direction: column;
  justify-content: space-between;
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

const SignUpFooter = styled.footer`
  align-self: center;
  margin-top: 5vh;

  @media screen and (min-width: 768px) {
    align-self: flex-end;
  }
`

const WhiteBgLogo = styled(Logo)`
  background-color: white;
  border-radius: 5px;
  height: 60px;
  padding: 1px;
  width: 60px;
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
            <SocialContainer>
              <SocialIcon 
                url="https://www.facebook.com/PeopleForBikes/" 
                source={ fb } 
                alt="Facebook Logo" />
              <SocialIcon 
                url="https://www.instagram.com/peopleforbikes/" 
                source={ insta } 
                alt="Instagram Logo" />
              <SocialIcon 
                url="https://www.linkedin.com/company/peopleforbikes/" 
                source={ linkedin } 
                alt="LinkedIn Logo" />
              <SocialIcon 
                url="https://twitter.com/peopleforbikes" 
                source={ twitter } 
                alt="Twitter Logo" />
              <SocialIcon 
                url="https://www.youtube.com/user/peopleforbikes/videos" 
                source={ yt } 
                alt="YouTube Logo" />
            </SocialContainer>
          </StripeMenu>
          <SignUpContainer>
            <header>
              <h2>Let's stay in touch. Join our newsletter list:</h2>
              <SignUpForm />
            </header>
            <SignUpFooter>
              <WhiteBgLogo />
              <LogoType 
                fillPeople="#fff"
                fillFor="#fff"
                fillBikes="#fff"
              />              
            </SignUpFooter>
          </SignUpContainer>
        </Container>
      </Bar>
    </>
  );
}

export default Footer;
