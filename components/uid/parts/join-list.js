import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import HeaderImage from '~/components/header-image';

import IndividualsBG from '~/public/join/individuals.jpg';
import RetailersBG from '~/public/join/retailers.jpg';
import SuppliersBG from '~/public/join/suppliers.jpg';
import WhiteArrow from '~/public/white-arrow.svg';

const SectionTitle = styled.h2`
  color: #333 !important;
  font-weight: 700 !important;
  text-align: center !important;
  text-transform: uppercase !important;
  margin: 4vh !important;
`;

const Subtext = styled.span`
  color: white !important;
  display: block !important;
  font-family: ${(props) => props.theme.dharma} !important;
  font-size: 40px !important;
  font-weight: 600 !important;
  line-height: 30px !important;
  letter-spacing: 1px !important;
  margin: 1vh !important;
  padding: 10px !important;
  text-transform: uppercase !important;

  @media screen and (min-width: 320px) {
    font-size: calc(40px + 20 * ((100vw - 320px) / 880)) !important;
    line-height: calc(30px + 20 * ((100vw - 320px) / 880)) !important;
  }
  @media screen and (min-width: 1200px) {
    font-size: 60px !important;
    line-height: 50px !important;
  }
`;

const BoxContainer = styled.section`
  align-items: center !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  transform: translateY(-100px) !important;
  position: relative !important;
  z-index: 2 !important;

  a,
  a:visited,
  a:focus,
  a:active,
  a:hover {
    text-decoration: none !important;
  }

  @media (min-width: ${(props) => props.theme.sm}) {
    flex-direction: row !important;
    transform: translateY(-120px) !important;
  }
`;

const Box = styled.div`
  align-items: center !important;
  background-color: ${(props) =>
    props.bgColor ? props.bgColor : props.theme.redAccent} !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  margin: 7.5px !important;
  min-height: 190px !important;
  padding: 25px !important;
  width: 300px !important;
`;

const Text = styled.h4`
  color: white !important;
  font-size: 36px !important;
  font-weight: 300 !important;
  line-height: 36px !important;
  margin: 0 0 1vh 0 !important;
  text-align: center !important;

  @media screen and (min-width: 320px) {
    font-size: calc(36px + 8 * ((100vw - 320px) / 880)) !important;
    line-height: calc(36px + 8 * ((100vw - 320px) / 880)) !important;
  }
  @media screen and (min-width: 1200px) {
    font-size: 44px !important;
    line-height: 44px !important;
  }
`;

const Arrow = styled.img`
  display: block !important;
  margin: 0 auto !important;
  width: 46px !important;
`;

/**
 * <JoinList>
 *
 * Put all the big join blocks onto the Join page
 * This is mostly static block, just simplifies things as this page will never change
 */
export default function JoinList() {
  return (
    <>
      <SectionTitle>TAKE ACTION</SectionTitle>

      <HeaderImage source={IndividualsBG}>
        <h1>Individuals</h1>
        <Subtext>Advocate for Better Biking</Subtext>
      </HeaderImage>
      <BoxContainer>
        <a href="https://ridespot.org/register" rel="nofollow" target="_blank">
          <Box bgColor="#D0021B">
            <Text>Join Ride Spot</Text>
            <Arrow src={WhiteArrow} />
          </Box>
        </a>
        <a href="https://www.classy.org/give/117371" rel="nofollow" target="_blank">
          <Box bgColor="#D0021B">
            <Text>Donate Now</Text>
            <Arrow src={WhiteArrow} />
          </Box>
        </a>
      </BoxContainer>

      <HeaderImage source={RetailersBG}>
        <h1>Retailers</h1>
        <Subtext>Connect With Riders in Your Area</Subtext>
      </HeaderImage>
      <BoxContainer>
        <a href="https://ridespot.org/register" rel="nofollow" target="_blank">
          <Box bgColor="#D0021B">
            <Text>Join Ride Spot Premium</Text>
            <Arrow src={WhiteArrow} />
          </Box>
        </a>
      </BoxContainer>

      <HeaderImage source={SuppliersBG}>
        <h1>Corporate</h1>
        <Subtext>Create a Bright Future for Biking</Subtext>
      </HeaderImage>
      <BoxContainer>
        <Link href="/members" passHref>
          <a>
            <Box bgColor="#D0021B">
              <Text>Learn More About Membership</Text>
              <Arrow src={WhiteArrow} />
            </Box>
          </a>
        </Link>
      </BoxContainer>
    </>
  );
}
