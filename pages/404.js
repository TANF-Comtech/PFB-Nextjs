import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Image from 'next/image';

import { LegacyPage } from '~/components/legacy-page';
import SiteMetaCustom from '~/components/site-meta-custom';

import BMXRider from '~/public/bmx-rider.png';
import BMXRiderMobile from '~/public/bmx-rider-mobile.png';

const Container = styled.section`
  align-items: center !important;
  background-color: ${(props) => props.theme.redAccent} !important;
  color: #fff !important;
  display: flex !important;
  flex-direction: column !important;
  font-family: 'proxima-nova', Helvetica, Arial, sans-serif !important;
  font-weight: 300 !important;
  height: 850px !important;
  justify-content: center !important;
  padding: 10vh 0 0 0 !important;
  margin-bottom: 25px !important;
  width: 100% !important;
`;

const ImgContainer = styled.div`
  display: none !important;

  @media (min-width: ${(props) => props.theme.xs}) {
    display: block !important;
    height: 290px !important;
    position: relative !important;
    top: 50px !important;
    width: 346px !important;
    z-index: ${(props) => props.theme.zIndex01} !important;
  }
`;

const ImgContainerMobile = styled.div`
  display: none !important;

  @media (max-width: ${(props) => props.theme.xs}) {
    display: block !important;
    height: 251px !important;
    position: relative !important;
    top: 50px !important;
    width: 300px !important;
    z-index: ${(props) => props.theme.zIndex01} !important;
  }
`;

const TextContainer = styled.div`
  padding: 0 15px !important;
  position: relative !important;
  top: -20px !important;

  @media (min-width: ${(props) => props.theme.xs}) {
    top: -50px !important;
  }
`;

const Title = styled.h1`
  font-size: 250px !important;
  font-weight: 700 !important;
  line-height: 0.8 !important;
  margin: 0 !important;
  text-align: center !important;

  @media (min-width: ${(props) => props.theme.xs}) {
    font-size: 380px !important;
  }
`;

const Text = styled.h3`
  line-height: 1.6 !important;
  text-align: center !important;

  a,
  a:visited,
  a:focus,
  a:hover {
    color: #fff !important;
    text-decoration: underline !important;
  }
`;

export default function CustomErrorPage() {
  return (
    <LegacyPage>
      <SiteMetaCustom title="404 - Page Not Found | PeopleForBikes" />
      <Container>
        <ImgContainer>
          <Image alt="Rider" src={BMXRider} layout="fill" objectFit="cover" quality={80} />
        </ImgContainer>
        <ImgContainerMobile>
          <Image alt="Rider" src={BMXRiderMobile} layout="fill" objectFit="cover" quality={80} />
        </ImgContainerMobile>
        <TextContainer>
          <Title>404</Title>
          <Text>
            You took a wrong turn.
            <br />
            <Link href="/" passHref>
              <a>Click here to jump back in.</a>
            </Link>
          </Text>
        </TextContainer>
      </Container>
    </LegacyPage>
  );
}
