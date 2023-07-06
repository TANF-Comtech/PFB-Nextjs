import React from 'react';
import styled from 'styled-components';

import MainContent from '~/components/main-content';
import RideSpotRide from '~/components/ridespot-ride';
import Button from '~/components/button';

const RSRidesContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 5vh auto;
  max-width: 96vw;

  @media (min-width: ${(props) => props.theme.lg}) {
    max-width: 81vw;
  }
`;

/**
 * <RidesList>
 *
 * Provides a list of rides wherever you need them
 *
 * @param { array } payload - list of topics from Prismic API
 */
const RidesList = ({ payload }) => {
  payload.splice(18, 2);
  return (
    <MainContent>
      <RSRidesContainer>
        {payload.map((ride) => {
          return (
            <RideSpotRide
              distance={ride.node.distance ? ride.node.distance : 'over 5 Miles'}
              extLink={ride.node.ridespot_link.url}
              key={ride.node._meta.id}
              owner={
                ride.node.organization ? ride.node.organization.name[0].text : 'PeopleForBikes'
              }
              title={ride.node.title[0].text}
            />
          );
        })}
      </RSRidesContainer>
      <Button
        buttonAlign="center"
        buttonBg="#D0021B"
        buttonBorder="none"
        buttonColor="white"
        buttonFontSize="24px"
        buttonMargin="0 0 50px 0"
        buttonPadding="10px 30px"
        buttonTextTransform="uppercase"
        href="https://www.ridespot.org"
      >
        See More Rides on Ride Spot
      </Button>
    </MainContent>
  );
};

export default RidesList;
