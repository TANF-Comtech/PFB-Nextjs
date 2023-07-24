import React from 'react';
import styled from 'styled-components';

import Arrow from '~/public/red-arrow.svg';
import PinImg from '~/public/ridespot-pin.svg';
import MapImg from '~/public/ridespot-map.svg';

const RSRide = styled.a`
  background-color: ${(props) => props.theme.midnightBlue} !important;
  border-radius: 0 0 15px 15px !important;
  margin: 1vw !important;
  text-decoration: none !important;
  transform: translateX(0) !important;
  transition: 0.2s linear !important;
  width: 94vw !important;

  &:hover,
  &:active,
  &:focus {
    text-decoration: none !important;
  }

  &:hover {
    transform: translateY(-5px) !important;
  }

  @media (min-width: ${(props) => props.theme.xs}) {
    width: 70% !important;
  }

  @media (min-width: ${(props) => props.theme.sm}) {
    width: 46% !important;
  }

  @media (min-width: ${(props) => props.theme.md}) {
    width: 30% !important;
  }
`;

// Map
const Map = styled.div`
  align-items: center !important;
  background-image: url(${MapImg}) !important;
  background-position: center center !important;
  background-size: cover !important;
  display: flex !important;
  height: 100px !important;
`;

const Pin = styled.img`
  margin-left: 25px !important;
  width: 55px !important;
`;

// Data
const RSContent = styled.div`
  align-items: center !important;
  display: flex !important;
  justify-content: space-between !important;
`;

const RSData = styled.div`
  flex-basis: calc(100% - 50px) !important;
  padding: 3vh 4vw !important;
  max-width: 90% !important;
  min-height: 25vh !important;

  @media (min-width: ${(props) => props.theme.sm}) {
    padding: 3vh 2vw !important;
  }
`;

const RSTitle = styled.h2`
  color: #fff !important;
  font-weight: 600 !important;
  font-size: 35px !important;
  margin: 0 0 1vh 0 !important; /* needed for override */
  line-height: 32px !important;
`;

const RSDistance = styled.h3`
  color: ${(props) => props.theme.yellow} !important;
  font-size: 20px !important;
  font-weight: 600 !important;
  line-height: 24px !important;
  margin: 0 !important;
  text-transform: uppercase !important;
`;

const RSInfo = styled.h3`
  color: #fff !important;
  font-size: 20px !important;
  font-weight: 300 !important;
  line-height: 24px !important;
  margin: 0 !important;
`;

const RSArrow = styled.img`
  background-color: #fff !important;
  display: block !important;
  flex-shrink: 0 !important;
  padding: 10px !important;
  width: 40px !important;
`;

/**
 * <RideSpotRide>
 *
 * This produces the little card that shows up on the RideSpotPromo container
 * It might be reusable but more than likely it just goes in that one spot
 *
 * @param { string } distance - how long the ride is
 * @param { string } extLink - link to the ride over on RideSpot
 * @param { string } owner - name of group who put the ride together
 * @param { string } title - actual title of the ride
 */
const RideSpotRide = ({ distance, extLink, owner, title }) => {
  return (
    <RSRide href={extLink} target="_blank">
      <Map>
        <Pin src={PinImg} alt="Ridespot Map Pin" />
      </Map>
      <RSContent>
        <RSData>
          {title && <RSTitle>{title}</RSTitle>}
          {distance && <RSDistance>Distance: {distance}</RSDistance>}
          {owner && <RSInfo>{owner}</RSInfo>}
        </RSData>
        <RSArrow src={Arrow} />
      </RSContent>
    </RSRide>
  );
};

export default RideSpotRide;
