import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';
import styled from 'styled-components';
import Link from 'next/link';

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

const FormContainer = styled.section`
  display: flex;
  flex-direction: column;
  margin: 2vh 0;
  padding: 0;

  @media (min-width: ${(props) => props.theme.lg}) {
    padding: 0;
  }

  dt {
    display: none;
  }

  label[for='cf-privacy-terms7104'],
  label[for='cf-general-consent1667'] {
    display: inline;
  }

  input[type='text'],
  input[type='email'],
  select {
    background-color: ${(props) => props.theme.redAccent};
    color: white;

    /* Changing placeholder text remain surreal, even in 2020 */
    ::-webkit-input-placeholder {
      color: white;
    }
    ::-moz-placeholder {
      color: white;
    }
    ::-ms-input-placeholder {
      color: white;
    }
    ::placeholder {
      color: white;
    }
    border: none;
    display: block;
    font-family: ${(props) => props.theme.montserrat};
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 1vh;
    min-width: 300px;
    padding: 10px 16px;
    text-transform: capitalize;

    @media (min-width: ${(props) => props.theme.bm}) {
      font-size: calc(14px + 4 * ((100vw - 320px) / 880));
    }

    @media (min-width: ${(props) => props.theme.lg}) {
      font-size: 18px;
    }
  }

  select {
    width: 95%;
  }

  input[type='submit'] {
    background-color: transparent;
    border: 1px solid white;
    border-radius: 0px;
    color: white;
    cursor: pointer;
    display: inline-block;
    font-family: ${(props) => props.theme.montserrat};
    font-size: 14px;
    font-weight: 700;
    min-width: 200px;
    margin: 2vh 0 0 0;
    padding: 10px 35px;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    transform: translateY(0);
    transition: all 0.25s ease;

    &:hover {
      background-color: white;
      color: ${(props) => props.theme.black};
      text-decoration: none;
      transform: translateY(-2px);
    }

    @media (min-width: ${(props) => props.theme.bm}) {
      font-size: calc(14px + 4 * ((100vw - 320px) / 880));
      padding: 10px calc(35px + 15 * ((100vw - 320px) / 880));
    }

    @media (min-width: ${(props) => props.theme.lg}) {
      font-size: 18px;
      padding: 10px 60px;
    }
  }
`;

const IconContainer = styled.div`
  align-items: center;
  background-color: ${(props) => props.theme.black};
  border-radius: 19px;
  display: flex;
  height: 38px;
  justify-content: center;
  transition: ${(props) => props.theme.basicAnimation};
  width: 38px;

  &:hover {
    background-color: ${(props) => props.theme.darkGray};
  }

  @media screen and (min-width: 320px) {
    border-radius: calc(19px + 11 * ((100vw - 320px) / 880));
    height: calc(38px + 22 * ((100vw - 320px) / 880));
    width: calc(38px + 22 * ((100vw - 320px) / 880));
  }
  @media screen and (min-width: 1200px) {
    border-radius: 30px;
    height: 60px;
    width: 60px;
  }
`;

const Icon = styled.img`
  height: 19px;
  width: 19px;

  @media screen and (min-width: 320px) {
    height: calc(19px + 11 * ((100vw - 320px) / 880));
    width: calc(19px + 11 * ((100vw - 320px) / 880));
  }
  @media screen and (min-width: 1200px) {
    height: 30px;
    width: 30px;
  }
`;

/**
 * <SocialIcon>
 *
 * This is basic social icon look established for the footer of the site
 * The icon container is a black circle 60x60px
 * The incoming icon should be white on a transparent bg
 *
 * @param {object} children - SVG file, should come in as a React Fragment
 *
 */
const SocialIcon = ({ source, text, url }) => {
  return (
    <a href={url} target="_blank" rel="noopener">
      <IconContainer>
        <Icon src={source} alt={text} />
      </IconContainer>
    </a>
  );
};

/**
 * FooterSignUpForm
 *
 * The logic to this is counter-intuitive.
 * 3rd party scripts should be loaded onto the page and you move along with your life.
 * But with Next, you have to think about 'pages' differently.
 * Since all pages are synthetic, and this script is global with dependencies, we need a lot of control to make this work
 *
 * What we're doing is leveraging Next's Script component and setting the jQuery dependency to load before the rest of the page
 * Then, we setup a ref that stores the state of this components loading - we only want to inject the Spark form
 * But we want to make sure this logic fires every time a synthetic page is loaded
 * So useEffect watches router.pathname for changes, and gets us what we need
 *
 * @returns <FormContainer />
 */
function FooterSignUpForm() {
  const router = useRouter();
  const isFirstRenderOfSparkScript = useRef(true);

  useEffect(() => {
    if (isFirstRenderOfSparkScript.current) {
      isFirstRenderOfSparkScript.current = false;
    }
  }, [router.pathname]);

  return (
    <>
      <FormContainer>
        <div id="pfb-site-footer" className="spkactionform" />
        {isFirstRenderOfSparkScript.current && (
          <Script
            src="https://action.peopleforbikes.org/assets/js/widget.js/?id=111276"
            strategy="afterInteractive"
          />
        )}
      </FormContainer>
    </>
  );
}

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
