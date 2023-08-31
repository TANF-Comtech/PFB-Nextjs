import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';
import styled from 'styled-components';
import Link from 'next/link';

import Logo from '~/components/logo';
import LogoType from '~/components/logotype';
import Rule from '~/components/rule';

import fb from '~/public/socials/fb.svg';
import insta from '~/public/socials/insta.svg';
import linkedin from '~/public/socials/linkedin.svg';
import twitter from '~/public/socials/twitter.svg';
import yt from '~/public/socials/yt.svg';

const Bar = styled.footer`
  background-color: ${(props) => props.theme.darkestGray} !important;
  color: white !important;
  padding: 2vh 0 6vh 0 !important;

  @media screen and (min-width: 768px) {
    padding: 0 4vw !important;
  }
`;

const Container = styled.section`
  align-items: stretch !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: flex-start !important;
  margin: 0 auto !important;
  max-width: ${(props) => props.theme.lg} !important;

  @media screen and (min-width: 768px) {
    flex-direction: row !important;
  }
`;

const StripeMenu = styled.div`
  background-color: ${(props) => props.theme.redAccent} !important;
  min-width: 250px !important;
  padding: 6vh 0 !important;

  @media screen and (min-width: 320px) {
    min-width: calc(250px + 100 * ((100vw - 320px) / 880)) !important;
  }
  @media screen and (min-width: 768px) {
    min-height: 70vh !important;
  }
  @media screen and (min-width: 1200px) {
    min-width: 350px !important;
  }
`;

const MenuContainer = styled.ul`
  align-items: center !important;
  color: white !important;
  display: flex !important;
  flex-direction: row !important;
  flex-wrap: wrap !important;
  font-family: ${(props) => props.theme.dharma} !important;
  justify-content: center !important;
  list-style: none !important;
  margin: 0vh 4vw 2vh 4vw !important;

  @media (min-width: 768px) {
    align-items: flex-start !important;
    flex-direction: column !important;
    justify-content: flex-start !important;
  }

  li a,
  li a:visited,
  li a:focus,
  li a:active,
  li a:hover {
    color: white !important;
    display: block !important;
    font-size: 36px !important;
    margin: 0 8px !important;
    padding: 8px 0 !important;
    text-decoration: none !important;
    transition: ${(props) => props.theme.basicAnimation} !important;
    transform: translateY(0) !important;

    @media (min-width: ${(props) => props.theme.bm}) {
      font-size: calc(36px + 20 * ((100vw - 320px) / 880)) !important;
    }
    @media (min-width: 768px) {
      margin: inherit !important;
    }
    @media (min-width: ${(props) => props.theme.lg}) {
      font-size: 56px !important;
    }
  }
`;

const SocialContainer = styled.section`
  display: grid !important;
  grid-gap: 5px !important;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr !important;
  margin: 2vh auto !important;
  max-width: 210px !important;

  @media screen and (min-width: 320px) {
    max-width: calc(230px + 57 * ((100vw - 320px) / 880)) !important;
  }
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr !important;
    margin: 2vh 3.5vw 2vh 3.5vw !important;
    max-width: calc(150px + 30 * ((100vw - 320px) / 880)) !important;
  }
  @media screen and (min-width: 1200px) {
    max-width: 180px !important;
  }
`;

const SignUpContainer = styled.div`
  display: flex !important;
  flex-basis: 100% !important; /* Stretch the signup all the way across the screen */
  flex-direction: column !important;
  justify-content: flex-start !important;
  margin: 5vh 4vw !important;

  h2 {
    font-size: 36px !important;
  }
  @media screen and (min-width: 320px) {
    h2 {
      font-size: calc(36px + 20 * ((100vw - 320px) / 880)) !important;
      line-height: calc(36px + 20 * ((100vw - 320px) / 880)) !important;
    }
  }
  @media screen and (min-width: 1200px) {
    h2 {
      font-size: 56px !important;
    }
  }
`;

const SignUpFooter = styled.footer`
  align-items: flex-end !important;
  display: flex !important;
  padding-bottom: 2vh !important;
`;

const ContactBox = styled.p`
  color: white !important;
  font-size: 18px !important;
  font-weight: 500 !important;
  line-height: 1.5 !important;
  margin: 2vh 4vw !important;
  text-align: center !important;

  @media (min-width: 768px) {
    margin: 2vh 4vw !important;
    text-align: left !important;
  }

  a,
  a:visited,
  a:focus,
  a:active,
  a:hover {
    color: white !important;
    font-family: ${(props) => props.theme.montserrat} !important;
    font-size: 18px !important;
    text-decoration: none !important;
  }
`;

const FormContainer = styled.section`
  display: flex !important;
  flex-direction: column !important;
  margin: 2vh 0 !important;
  padding: 0 !important;

  @media (min-width: ${(props) => props.theme.lg}) {
    padding: 0 !important;
  }

  dt {
    display: none !important;
  }

  label[for='cf-privacy-terms7104'],
  label[for='cf-general-consent1667'] {
    display: inline !important;
  }

  input[type='text'],
  input[type='email'],
  select {
    background-color: ${(props) => props.theme.redAccent} !important;
    color: white !important;

    /* Changing placeholder text remain surreal, even in 2020 */
    ::-webkit-input-placeholder {
      color: white !important;
    }
    ::-moz-placeholder {
      color: white !important;
    }
    ::-ms-input-placeholder {
      color: white !important;
    }
    ::placeholder {
      color: white !important;
    }
    border: none !important;
    display: block !important;
    font-family: ${(props) => props.theme.montserrat} !important;
    font-size: 14px !important;
    font-weight: 700 !important;
    margin-bottom: 1vh !important;
    min-width: 300px !important;
    padding: 10px 16px !important;
    text-transform: capitalize !important;

    @media (min-width: ${(props) => props.theme.bm}) {
      font-size: calc(14px + 4 * ((100vw - 320px) / 880)) !important;
    }

    @media (min-width: ${(props) => props.theme.lg}) {
      font-size: 18px !important;
    }
  }

  select {
    width: 95% !important;
  }

  input[type='submit'] {
    background-color: transparent !important;
    border: 1px solid white !important;
    border-radius: 0px !important;
    color: white !important;
    cursor: pointer !important;
    display: inline-block !important;
    font-family: ${(props) => props.theme.montserrat} !important;
    font-size: 14px !important;
    font-weight: 700 !important;
    min-width: 200px !important;
    margin: 2vh 0 0 0 !important;
    padding: 10px 35px !important;
    text-align: center !important;
    text-decoration: none !important;
    text-transform: uppercase !important;
    transform: translateY(0) !important;
    transition: all 0.25s ease !important;

    &:hover {
      background-color: white !important;
      color: ${(props) => props.theme.black} !important;
      text-decoration: none !important;
      transform: translateY(-2px) !important;
    }

    @media (min-width: ${(props) => props.theme.bm}) {
      font-size: calc(14px + 4 * ((100vw - 320px) / 880)) !important;
      padding: 10px calc(35px + 15 * ((100vw - 320px) / 880)) !important;
    }

    @media (min-width: ${(props) => props.theme.lg}) {
      font-size: 18px !important;
      padding: 10px 60px !important;
    }
  }
`;

const IconContainer = styled.div`
  align-items: center !important;
  background-color: ${(props) => props.theme.black} !important;
  border-radius: 19px !important;
  display: flex !important;
  height: 38px !important;
  justify-content: center !important;
  transition: ${(props) => props.theme.basicAnimation} !important;
  width: 38px !important;

  &:hover {
    background-color: ${(props) => props.theme.darkGray} !important;
  }

  @media screen and (min-width: 320px) {
    border-radius: calc(19px + 11 * ((100vw - 320px) / 880)) !important;
    height: calc(38px + 22 * ((100vw - 320px) / 880)) !important;
    width: calc(38px + 22 * ((100vw - 320px) / 880)) !important;
  }
  @media screen and (min-width: 1200px) {
    border-radius: 30px !important;
    height: 60px !important;
    width: 60px !important;
  }
`;

const Icon = styled.img`
  height: 19px !important;
  width: 19px !important;

  @media screen and (min-width: 320px) {
    height: calc(19px + 11 * ((100vw - 320px) / 880)) !important;
    width: calc(19px + 11 * ((100vw - 320px) / 880)) !important;
  }
  @media screen and (min-width: 1200px) {
    height: 30px !important;
    width: 30px !important;
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
  const [key, setKey] = useState(Date.now());

  useEffect(() => {
    setKey(Date.now()); // Update key to force re-render of Script
  }, [router.pathname]);

  return (
    <>
      <FormContainer>
        <div id="pfb-site-footer" className="spkactionform" />
        <Script
          id={`signup-form-script-${key}`} // Unique ID per instance
          src="https://action.peopleforbikes.org/assets/js/widget.js/?id=111276"
          strategy="afterInteractive"
        />
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
                <Link href="/mission">Mission</Link>
              </li>
              <li>
                <Link href="/team">Team</Link>
              </li>
              <li>
                <Link href="/board">Board</Link>
              </li>
              <li>
                <Link href="/careers">Careers</Link>
              </li>
              <li>
                <Link href="/privacy">Privacy</Link>
              </li>
              <li>
                <Link href="/join">Join</Link>
              </li>
              <li>
                <Link href="/members">Members</Link>
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
