import React from 'react';
import styled from 'styled-components';

import Arrow from '~/public/red-arrow.svg';
import PinImg from '~/public/ridespot-pin.svg';
import MapImg from '~/public/ridespot-map.svg';

const RSRide = styled.a`
  background-color: ${(props) => props.theme.midnightBlue};
  border-radius: 0 0 15px 15px;
  margin: 1vw;
  text-decoration: none;
  transform: translateX(0);
  transition: 0.2s linear;
  width: 94vw;

  &:hover,
  &:active,
  &:focus {
    text-decoration: none;
  }

  &:hover {
    transform: translateY(-5px);
  }

  @media (min-width: ${(props) => props.theme.xs}) {
    width: 70%;
  }

  @media (min-width: ${(props) => props.theme.sm}) {
    width: 46%;
  }

  @media (min-width: ${(props) => props.theme.md}) {
    width: 30%;
  }
`;

// Map
const Map = styled.div`
  align-items: center;
  background-image: url(${MapImg});
  background-position: center center;
  background-size: cover;
  display: flex;
  height: 100px;
`;

const Pin = styled.img`
  margin-left: 25px;
  width: 55px;
`;

// Data
const RSContent = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const RSData = styled.div`
  flex-basis: calc(100% - 50px);
  padding: 3vh 4vw;
  max-width: 90%;
  min-height: 25vh;

  @media (min-width: ${(props) => props.theme.sm}) {
    padding: 3vh 2vw;
  }
`;

const RSTitle = styled.h2`
  color: #fff;
  font-weight: 600;
  font-size: 35px;
  margin: 0 0 1vh 0; /* needed for override */
  line-height: 32px;
`;

const RSDistance = styled.h3`
  color: ${(props) => props.theme.yellow};
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  margin: 0;
  text-transform: uppercase;
`;

const RSInfo = styled.h3`
  color: #fff;
  font-size: 20px;
  font-weight: 300;
  line-height: 24px;
  margin: 0;
`;

const RSArrow = styled.img`
  background-color: #fff;
  display: block;
  flex-shrink: 0;
  padding: 10px;
  width: 40px;
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