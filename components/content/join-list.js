import Link from 'next/link'
import styled from "styled-components"

import Wrapper from '../global/wrapper'
import HeaderImage from '../global/header-image'
import Button from '../primitives/button'
import MainContent from '../global/main-content'

import IndividualsBG from '../../public/join/individuals.jpg'
import RetailersBG from '../../public/join/retailers.jpg'
import SuppliersBG from '../../public/join/suppliers.jpg'
import JoinHeader from '../../public/join/join-header.jpg'
import WhiteArrow from '../../public/white-arrow.svg'

const SectionTitle = styled.h2`
  color: #333;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
  margin: 4vh;
`

const Subtext = styled.span`
  color: white;
  display: block;
  font-family: "Tungsten A", "Tungsten B", Arial, Helvetica, sans-serif;
  font-size: 40px;
  font-weight: 600;
  line-height: 30px;
  letter-spacing: 1px;
  margin: 1vh;
  padding: 10px;
  text-transform: uppercase;

  @media screen and (min-width: 320px) {
    font-size: calc(40px + 20 * ((100vw - 320px) / 880));
    line-height: calc(30px + 20 * ((100vw - 320px) / 880));
  }
  @media screen and (min-width: 1200px) {
    font-size: 60px;
    line-height: 50px;
  } 
`

const BoxContainer = styled.section`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transform: translateY(-100px);
  position: relative;
  z-index: 2;

  a, a:visited, a:focus, a:active, a:hover {
    text-decoration: none;
  }

  @media (min-width: ${props => props.theme.sm}) {
    flex-direction: row;
    transform: translateY(-120px);
  }
`

const Box = styled.div`
  align-items: center;
  background-color: ${props => props.bgColor ? props.bgColor : props.theme.redAccent };
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 7.5px;
  min-height: 190px;
  padding: 25px;
  width: 300px;
`

const Text = styled.h4`
  color: white;
  font-size: 36px;
  font-weight: 300;
  line-height: 36px;
  margin: 0 0 1vh 0;
  text-align: center;

  @media screen and (min-width: 320px) {
    font-size: calc(36px + 8 * ((100vw - 320px) / 880));
    line-height: calc(36px + 8 * ((100vw - 320px) / 880));
  }
  @media screen and (min-width: 1200px) {
    font-size: 44px;
    line-height: 44px;
  }  
`

const Arrow = styled.img`
  display: block;
  margin: 0 auto;
  width: 46px;
`

/**
 * <JoinList>
 * 
 * Put all the big join blocks onto the Join page
 * This is mostly static block, just simplies things as this page will never change
 */
export default function JoinList() {

  return (
    <>
      <SectionTitle>TAKE ACTION</SectionTitle> 

      <HeaderImage source={ IndividualsBG }>
        <h1>Individuals</h1>
        <Subtext>Advocate for Better Biking</Subtext>
      </HeaderImage>
      <BoxContainer>
        <a href="https://ridespot.org/register" rel="nofollow" target="_blank">
          <Box bgColor="#D0021B">
            <Text>Join Ride Spot</Text>
            <Arrow src={ WhiteArrow } width="46px" />
          </Box>
        </a>
        <a href="https://www.classy.org/give/117371" rel="nofollow" target="_blank">
          <Box bgColor="#D0021B">
            <Text>Donate Now</Text>
            <Arrow src={ WhiteArrow } width="46px" />
          </Box>
        </a>
      </BoxContainer>

      <HeaderImage source={ RetailersBG }>
        <h1>Retailers</h1>
        <Subtext>Connect With Riders in Your Area</Subtext>
      </HeaderImage>
      <BoxContainer>
        <a href="https://ridespot.org/register" rel="nofollow" target="_blank">
          <Box bgColor="#D0021B">
            <Text>Join Ride Spot Premium</Text>
            <Arrow src={ WhiteArrow } width="46px" />
          </Box>
        </a>
      </BoxContainer>      

      <HeaderImage source={ RetailersBG }>
        <h1>Suppliers</h1>
        <Subtext>Create a Bright Future for Biking</Subtext>
      </HeaderImage>
      <BoxContainer>
        <a href="mailto:erik@peopleforbikes.org?subject=Interest%20in%20PeopleForBikes%20Membership">
          <Box bgColor="#D0021B">
            <Text>Contact Us For Opportunities</Text>
            <Arrow src={ WhiteArrow } width="46px" />
          </Box>
        </a>
      </BoxContainer>        
    </>
  )
}
