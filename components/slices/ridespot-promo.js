import React from "react";
import styled from "styled-components";

import { randomID } from "../../lib/utils";

import RideSpotRide from "./ridespot-ride";

import RideSpotBg1 from "../../public/ridespot-bg.jpg";
import RideSpotLogo from "../../public/RideSpotRidesLogo.svg";

const Bg = styled.div`
  background-color: ${(props) => props.theme.lightestGray};
`;

// BgImage will check for ride payload, set margins accordingly
const BgImage = styled.section`
  align-items: center;
  background-image: url(${RideSpotBg1});
  height: 30rem;
  background-position: center center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-bottom: 1vh;
  /* padding: ${(props) => (props.payload ? "3vh 0 18vh 0" : "3vh 0")}; */

  h1 {
    color: #fff;
  }
`;

const RSTitle = styled.h2`
  font-size: 36pt;
  line-height: 70px;
  margin: 2vh 10px 20vh 10px;
  text-align: center;
  text-transform: uppercase;

  @media screen and (min-width: 320px) {
    font-size: calc(70px + 50 * ((100vw - 320px) / 880));
    line-height: calc(70px + 50 * ((100vw - 320px) / 880));
  }
  @media screen and (min-width: 1200px) {
    font-size: 60px;
    line-height: 120px;
  }
`;

const RSDeck = styled.h3`
  color: ${(props) => props.theme.yellow};
  font-family: ${(props) => props.theme.dharma};
  font-size: 40px;
  font-weight: 600;
  line-height: 40px;
  margin: 0 25px;
  text-align: center;
  text-transform: uppercase;

  @media screen and (min-width: 320px) {
    font-size: calc(40px + 20 * ((100vw - 320px) / 880));
    line-height: calc(40px + 20 * ((100vw - 320px) / 880));
  }
  @media screen and (min-width: 1200px) {
    font-size: 60px;
    line-height: 60px;
  }
`;

const RSLogoContainer = styled.img`
  margin: 0 auto;
  max-width: 310px;

  @media (min-width: ${(props) => props.theme.xs}) {
    max-width: 350px;
  }

  @media (min-width: ${(props) => props.theme.md}) {
    flex-basis: auto;
    max-width: none;
  }
`;
// Downloads
const RSDownload = styled.section`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 25px 0;
`;

const RSBadge = styled.img`
  height: 40px;
  margin: 0 8px;
  opacity: 0.85;
  width: 120px;
`;

// Rides
const RSRidesContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: -120px auto 5vh auto;
  max-width: 96vw;

  @media (min-width: ${(props) => props.theme.md}) {
    flex-wrap: nowrap;
  }

  @media (min-width: ${(props) => props.theme.lg}) {
    max-width: 81vw;
  }
`;

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
  let payloadArr;

  if (payload) {
    payloadArr = Object.keys(payload).map((key) => payload[key]);
  }

  return (
    <Bg>
      <BgImage payload={payload}>
        <RSLogoContainer alt="RideSpot Logo" src={RideSpotLogo} />
      </BgImage>
      <RSTitle>use the app to access great rides</RSTitle>
      {payload && (
        <RSRidesContainer>
          {payloadArr.map((ride) => {
            if (ride) {
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
    </Bg>
  );
};

export default RideSpotPromo;
