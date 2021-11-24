import styled from "styled-components";
import Image from "next/image"

import { randomID } from "../../lib/utils";
import RideSpotRide from "./ridespot-ride";
import BgImage from '../primitives/bg-image'

import RideSpotBg from "../../public/RidespotBg.jpg";
import RideSpotLogo from "../../public/RideSpotRidesLogo.svg";

const RSContainer = styled.section`
  background-color: ${(props) => props.theme.lightestGray};
  margin-bottom: 2vh;
  padding: 6vh 0 8vh 0 !important;
`;

const RSHeaderContainer = styled.a`
  display: block;
  width: 100%;
`

const RSTitle = styled.h2`
  font-size: 36pt;
  line-height: 70px;
  margin: 2vh 10px 0vh 10px;
  text-align: center;
  text-transform: uppercase;
  color: black;
  line-height: 1;
  @media screen and (min-width: 1200px) {
    font-size: 60px;
    line-height: 120px;
  }
`;

// Rides
const RSRidesContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin: 0 auto;
  padding-bottom: 5vh;

  @media (min-width: ${(props) => props.theme.md}) {
    flex-wrap: nowrap;
  }

  @media (min-width: ${(props) => props.theme.lg}) {
    max-width: 81vw;
  }
`;

const RSCardContainer = styled.div`
  margin: 1vh 1vw;
`;

const RSCard = styled.img`
  height: 60vh;
`;

const RSLink = styled.a`
  text-decoration: none;
  color: black;
  margin: 0;
  padding: 6vh 2vw 8vh 2vw !important;
  &:hover,
  &:focus,
  &:active,
  &:visited {
    text-decoration: none;
    color: black;
  }
`;

/**
 * <RideSpotPromo>
 *
 * This produces the 3 RideSpot ride promos seen around the site.
 * The rides slightly break the plane of the container so beware
 *
 * @param { object } payload - all the ridespot ride info
 */
const RideSpotPromo = ({ 
  payload 
}) => {

  // Transform payload object into an array
  let payloadArr;

  if (payload) {
    payloadArr = Object.keys(payload).map((key) => payload[key]);
  }

  return (
    <RSContainer>

      <RSHeaderContainer 
        href={"https://ridespot.org/"} 
        passHref
      >
        <BgImage
          imgalt="Ride Spot background of blue mountains"
          imgsrc={ RideSpotBg }
        >
          <Image
            alt="Ride Spot Logo"
            src={ RideSpotLogo }
            quality={ 80 }
            width={ 400 }
            height={ 120 }
          />
        </BgImage>
      </RSHeaderContainer>

      <RSTitle>
        Use the Ride Spot App to access great rides
      </RSTitle>

      {payload && (
        <RSRidesContainer>
          {payloadArr.map((ride) => {
            if (ride && ride.ridespot_card) {
              return (
                <RSCardContainer>
                  <RSLink href={ride.ridespot_link.url}>
                    <RSCard src={ride.ridespot_card.url} />
                  </RSLink>
                </RSCardContainer>
              );
            } else if (ride) {
              return (
                <RideSpotRide
                  distance={ride.distance && ride.distance}
                  extLink={ride.ridespot_link && ride.ridespot_link.url}
                  key={randomID(1000000000)}
                  owner={ride.organization && ride.organization.name[0].text}
                  title={ride.title && ride.title[0].text}
                />
              );
            }
          })}
        </RSRidesContainer>
      )}

    </RSContainer>
  );
};

export default RideSpotPromo;
