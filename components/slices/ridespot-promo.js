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
  justify-content: space-around;
  margin-bottom: 1vh;
  padding: 3vh 0 12vh 0;

  h1 {
    color: #fff;
  }
`

const RSTitle = styled.h2`
  color: white;
  font-size: 80px;
  font-weight: 600;
  line-height: 80px;
  margin: 4vh 25px;
  text-align: center;
  text-transform: uppercase;

  @media screen and (min-width: 320px) {
    font-size: calc(80px + 40 * ((100vw - 320px) / 880));
    line-height: calc(80px + 40 * ((100vw - 320px) / 880));
  }
  @media screen and (min-width: 1200px) {
    font-size: 120px;
    line-height: 120px;
  } 
`

const RSLogoContainer = styled.img`
  margin: 0 auto 3vh auto;
  max-width: 350px;

  @media( min-width: ${ props => props.theme.md}) {
    flex-basis: auto;
    margin: 0 auto;
    max-width: none;
  }
`

const RSRidesContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: -15vh auto 5vh auto;
  max-width: 96vw;

  @media( min-width: ${ props => props.theme.md}) {
    flex-wrap: nowrap;
  }

  @media( min-width: ${ props => props.theme.lg}) {
    max-width: 81vw;
  }
`

/**
 * <RideSpotPromo>
 * 
 * This produces the 3 RideSpot ride promos seen around the site.
 * The rides slightly break the plane of the container so beware
 * 
 * @param { string } isLocal - true if payload is local rides, false is general rides
 * @param { object } payload - all the ridespot ride info
 */
const RideSpotPromo = ({ isLocal = false, payload }) => {

  // Transform payload object into an array
  const payloadArr = Object.keys(payload).map((key) => payload[key] )
  
  return (
    <>
      <BgImage>
        <RSLogoContainer 
          alt="RideSpot Logo"
          src={ RideSpotLogo }
        />
        <RSTitle>
          { isLocal === 'true' ? 'Rides Near You' : 'Find Your Ride' }
        </RSTitle>
      </BgImage>
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
    </>
  )
}

export default RideSpotPromo