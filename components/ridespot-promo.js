import React from 'react';
import styled from 'styled-components';
import Image from 'next/legacy/image';

import { randomID } from '~/utils';

import RideSpotRide from '~/components/ridespot-ride';
import BgImage from '~/components/bg-image';

import RideSpotBg from '~/public/RidespotBg.jpg';
import RideSpotLogo from '~/public/RideSpotRidesLogo.svg';

const RSContainer = styled.section`
  background-color: ${(props) => props.theme.lightestGray} !important;
  padding-bottom: 4vh !important;
`;

const RSHeaderContainer = styled.a`
  display: block !important;
`;

const RSTitle = styled.h2`
  margin: 4vh 4vw !important;
  text-align: center !important;
  text-transform: uppercase !important;
`;

// Rides
const RSRidesContainer = styled.section`
  display: grid !important;
  grid-gap: 15px !important;
  grid-template-columns: 1fr !important;
  margin: 0 auto !important;
  max-width: 1400px !important;
  padding: 0 4vw !important;

  @media (min-width: ${(props) => props.theme.sm}) {
    grid-template-columns: 1fr 1fr !important;
  }

  @media (min-width: ${(props) => props.theme.lg}) {
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
  }
`;

const RSCardContainer = styled.div`
  margin: 1vh 1vw !important;

  @media (max-width: ${(props) => props.theme.sm}) {
    margin: 1vh auto !important;
    max-width: 450px !important;
  }
`;

const RSCard = styled.img`
  object-fit: cover !important;
`;

const RSLink = styled.a`
  text-decoration: none !important;
  color: black !important;
  margin: 0 !important;
  &:hover,
  &:focus,
  &:active,
  &:visited {
    text-decoration: none !important;
    color: black !important;
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
const RideSpotPromo = ({ payload }) => {
  // Transform payload object into an array
  let payloadArr;

  if (payload) {
    payloadArr = Object.keys(payload).map((key) => payload[key]);
  }

  return (
    <RSContainer>
      <RSHeaderContainer href={'https://ridespot.org/'} passHref>
        <BgImage
          height="30vh"
          heightTablet="30vh"
          heightDesktop="40vh"
          imgalt="Ride Spot background of blue mountains"
          imgsrc={RideSpotBg}
        >
          <Image alt="Ride Spot Logo" src={RideSpotLogo} quality={80} height={150} width={500} />
        </BgImage>
      </RSHeaderContainer>

      <RSTitle>Use the Ride Spot App to access great rides</RSTitle>

      {payload && (
        <RSRidesContainer>
          {payloadArr.map((ride) => {
            if (ride && ride.ridespot_card) {
              return (
                <RSCardContainer key={randomID(1000000000)}>
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
