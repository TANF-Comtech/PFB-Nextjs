import React from "react";
import styled from "styled-components";

import RideSpotRide from "./ridespot-ride"

import RideSpotBg1 from '../../public/ridespot-bg.jpg'
import RideSpotLogo from '../../public/ridespot-logo.svg'

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
    flex-basis: auto;
    margin: 0 auto 8vh auto;
    max-width: none;
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
 * This produces the 3 RideSpot ride promos seen around the site
 * 
 * @param { object } payload - all the ridespot ride info
 */
const RideSpotPromo = ({ payload }) => {

  // Transform payload object into an array
  const payloadArr = Object.keys(payload).map((key) => payload[key] )
  console.log(payloadArr)
  return (
    <>
      <BgImage>
        <RSLogoContainer 
          alt="RideSpot Logo"
          src={ RideSpotLogo }
        />
        <RSRidesContainer>
          { payloadArr.map( (ride, i) => {
            return (
              <RideSpotRide
                distance={ ride.distance }
                extLink={ ride.ridespot_link.url }
                key={ i }
                owner={ ride.organization.name[0].text }
                title={ ride.title[0].text }
              /> 
            )
          }) }                   
        </RSRidesContainer>
      </BgImage>
    </>
  )
}

export default RideSpotPromo