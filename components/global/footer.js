import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import FooterSignUpForm from '../content/footer-signup-form';
import SocialIcon from './social';
import Logo from './logo';
import LogoType from './logotype';
import Rule from '../primitives/rule';

import fb from '../../public/socials/fb.svg';
import insta from '../../public/socials/insta.svg';
import linkedin from '../../public/socials/linkedin.svg';
import twitter from '../../public/socials/twitter.svg';
import yt from '../../public/socials/yt.svg';

const Bar = styled.footer`
  background-color: ${(props) => props.theme.darkestGray};
  color: white;
  padding: 2vh 0 6vh 0;

  @media screen and (min-width: 768px) {
    padding: 0 4vw;
  }
`;

const Container = styled.section`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0 auto;
  max-width: ${(props) => props.theme.lg};

  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

const StripeMenu = styled.div`
  background-color: ${(props) => props.theme.redAccent};
  min-width: 250px;
  padding: 6vh 0;

  @media screen and (min-width: 320px) {
    min-width: calc(250px + 100 * ((100vw - 320px) / 880));
  }
  @media screen and (min-width: 768px) {
    min-height: 70vh;
  }
  @media screen and (min-width: 1200px) {
    min-width: 350px;
  }
`;

const MenuContainer = styled.ul`
  align-items: center;
  color: white;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-family: ${(props) => props.theme.dharma};
  justify-content: center;
  list-style: none;
  margin: 0vh 4vw 2vh 4vw;

  @media (min-width: 768px) {
    align-items: flex-start;
    flex-direction: column;
    justify-content: flex-start;
  }

  li a,
  li a:visited,
  li a:focus,
  li a:active,
  li a:hover {
    color: white;
    display: block;
    font-size: 36px;
    margin: 0 8px;
    padding: 8px 0;
    text-decoration: none;
    transition: ${(props) => props.theme.basicAnimation};
    transform: translateY(0);

    @media (min-width: ${(props) => props.theme.bm}) {
      font-size: calc(36px + 20 * ((100vw - 320px) / 880));
    }
    @media (min-width: 768px) {
      margin: inherit;
    }
    @media (min-width: ${(props) => props.theme.lg}) {
      font-size: 56px;
    }
  }
`;

const SocialContainer = styled.section`
  display: grid;
  grid-gap: 5px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  margin: 2vh auto;
  max-width: 210px;

  @media screen and (min-width: 320px) {
    max-width: calc(230px + 57 * ((100vw - 320px) / 880));
  }
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
    margin: 2vh 3.5vw 2vh 3.5vw;
    max-width: calc(150px + 30 * ((100vw - 320px) / 880));
  }
  @media screen and (min-width: 1200px) {
    max-width: 180px;
  }
`;

const SignUpContainer = styled.div`
  display: flex;
  flex-basis: 100%; /* Stretch the signup all the way across the screen */
  flex-direction: column;
  justify-content: flex-start;
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
`;

const SignUpFooter = styled.footer`
  align-items: flex-end;
  display: flex;
  padding-bottom: 2vh;
`;

const ContactBox = styled.p`
  color: white;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.5;
  margin: 2vh 4vw;
  text-align: center;

  @media (min-width: 768px) {
    margin: 2vh 4vw;
    text-align: left;
  }

  a,
  a:visited,
  a:focus,
  a:active,
  a:hover {
    color: white;
    font-family: ${(props) => props.theme.montserrat};
    font-size: 18px;
    text-decoration: none;
  }
`;

function Footer() {
  return (
    <>
      <Bar>
        <Container>
          <StripeMenu>
            <MenuContainer>
              <li>
                <Link href="/mission">
                  <a>Mission</a>
                </Link>
              </li>
              <li>
                <Link href="/team">
                  <a>Team</a>
                </Link>
              </li>
              <li>
                <Link href="/board">
                  <a>Board</a>
                </Link>
              </li>
              <li>
                <Link href="/careers">
                  <a>Careers</a>
                </Link>
              </li>
              <li>
                <Link href="/privacy">
                  <a>Privacy</a>
                </Link>
              </li>
              <li>
                <Link href="/join">
                  <a>Join</a>
                </Link>
              </li>
              <li>
                <Link href="/members">
                  <a>Members</a>
                </Link>
              </li>
            </MenuContainer>
            <Rule bgColor="#fff" maxWidth="250px" maxWidthMobile="700px" padding="5px 4vw" />
            <SocialContainer>
              <SocialIcon
                url="https://www.facebook.com/PeopleForBikes/"
                source={fb}
                alt="Facebook Logo"
              />
              <SocialIcon
                url="https://www.instagram.com/peopleforbikes/"
                source={insta}
                alt="Instagram Logo"
              />
              <SocialIcon
                url="https://www.linkedin.com/company/peopleforbikes/"
                source={linkedin}
                alt="LinkedIn Logo"
              />
              <SocialIcon
                url="https://twitter.com/peopleforbikes"
                source={twitter}
                alt="Twitter Logo"
              />
              <SocialIcon
                url="https://www.youtube.com/user/peopleforbikes/videos"
                source={yt}
                alt="YouTube Logo"
              />
            </SocialContainer>
            <Rule bgColor="#fff" maxWidth="250px" maxWidthMobile="700px" padding="5px 4vw" />
            <ContactBox>
              <a href="mailto:info@peopleforbikes.org?subject=Website%20Inquiry">
                info@peopleforbikes.org
              </a>
              <br />
              <a title="PeopleForBikes Phone Number" href="tel:303-449-4893">
                (303) 449-4893
              </a>
            </ContactBox>
            <Rule bgColor="#fff" maxWidth="250px" maxWidthMobile="700px" padding="5px 4vw" />
            <ContactBox>
              P.O. Box 2359
              <br />
              Boulder, CO 80306
            </ContactBox>
          </StripeMenu>
          <SignUpContainer>
            <SignUpFooter>
              <Logo logoMargin="0" logoWidth="80px" logoViewbox="65 -12 160 150" />
              <LogoType
                fillPeople="#fff"
                fillFor="#fff"
                fillBikes="#fff"
                logoMargin="0"
                logoTypeWidth="200px"
              />
            </SignUpFooter>
            <header>
              <h2>Let&apos;s stay in touch. Join our newsletter list:</h2>
              <FooterSignUpForm />
            </header>
          </SignUpContainer>
        </Container>
      </Bar>
    </>
  );
}

export default Footer;
