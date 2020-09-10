import React from "react";
import styled from "styled-components";
import Link from "next/link"

import RideSpotBg1 from '../../public/ridespot-bg.jpg'

import RideSpotLogo from '../../public/ridespot-logo.svg'
import Arrow from '../../public/arrow.png'


// BgImage will randomize the backgrounds
const BgImage = styled.section`
  align-items: center;
  background-image: url(${RideSpotBg1});
  background-position: center center; 
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 1vh;
  padding: 3vh 0;

  h1 {
    color: #fff;
  }

  @media( min-width: ${ props => props.theme.md}) {
    height: 65vh;
    padding: 0;
  }
`

const RSLogoContainer = styled.img`
  margin: 0 auto 3vh auto;
  max-width: 350px;

  @media( min-width: ${ props => props.theme.md}) {
    margin: 0 auto 8vh auto;
    flex-basis: auto;
  }
`

const RSRidesContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  max-width: 96vw;

  @media( min-width: ${ props => props.theme.md}) {
    flex-wrap: nowrap;
  }

  @media( min-width: ${ props => props.theme.lg}) {
    max-width: 81vw;
  }
`

const RSRide = styled.a`
  align-items: center;
  background-color: ${props => props.theme.midnightBlue };
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  margin: 1vw;
  text-decoration: none;
  transform: translateX(0);
  transition: 0.2s linear;
  width: 94vw;

  &:hover, &:active, &:focus {
    text-decoration: none;
  }

  &:hover {
    transform: translateY(-5px);
  }

  @media( min-width: ${ props => props.theme.xs}) {
    width: 70vw;
  }

  @media( min-width: ${ props => props.theme.sm}) {
    width: 46vw;
  }

  @media( min-width: ${ props => props.theme.md}) {
    width: 30vw;
  }

  @media( min-width: ${ props => props.theme.lg}) {
    max-width: 25vw;
  }
`

const RSData = styled.div`
  flex-basis: calc(100% - 50px);
  padding: 2vh 4vw;
  max-width: 90%;

  @media( min-width: ${ props => props.theme.sm}) {
    padding: 2vh 2vw;
  }
`

const RSTitle = styled.h2`
  color: #fff;
  font-size: 35px;
  margin: 0 0 1vh 0; /* needed for override */ 
  line-height: 32px;
`

const RSInfo = styled.h3`
  color: #fff;
  font-size: 20px;
  font-weight: 300;
  line-height: 24px;
  margin: 0;
`

const RSArrow = styled.img`
  background-color: #fff;
  display: block;
  flex-shrink: 0;
  padding: 10px;
  width: 40px;
`

/**
 * <RideSpotPromo>
 * 
 * This produces the 2 RideSpot ride promos seen around the site
 * 
 * @param { boolean } menuState - lifted state true/false toggle for menu opening/closing
 * @param { function } handleMenu - lifted state changer for menuState, handles click event
 */
const RideSpotPromo = () => {
  return (
    <>
      <BgImage>
        <RSLogoContainer 
          alt="RideSpot Logo"
          src={ RideSpotLogo }
        />
        <RSRidesContainer>
          <Link href="#" passHref>
            <RSRide>
              <RSData>
                <RSTitle>Selma55 - The 55th Anniversary of the Selma to Montgomery Voters Rights March</RSTitle>
                <RSInfo>Distance: 51mi</RSInfo>
                <RSInfo>PeopleForBikes</RSInfo>
              </RSData>
              <RSArrow 
                src={ Arrow } 
              />
            </RSRide>
          </Link>
          <Link href="#" passHref>
            <RSRide>
              <RSData>
                <RSTitle>Tetonia to Ashton Rail Trail</RSTitle>
                <RSInfo>Distance: 63mi</RSInfo>
                <RSInfo>Wheel Wranglers</RSInfo>
              </RSData>
              <RSArrow 
                src={ Arrow } 
              />
            </RSRide>
          </Link>
          <Link href="#" passHref>
            <RSRide>
              <RSData>
                <RSTitle>Yellowwood Lake Loop - Family and kid friendly</RSTitle>
                <RSInfo>Distance: 11mi</RSInfo>
                <RSInfo>Midwest Devo Junior Cycling Team</RSInfo>
              </RSData>
              <RSArrow 
                src={ Arrow } 
              />
            </RSRide>
          </Link>                    
        </RSRidesContainer>
      </BgImage>
    </>
  )
}

export default RideSpotPromo