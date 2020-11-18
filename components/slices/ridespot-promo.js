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