import React from 'react';
import styled from 'styled-components';
import numWords from 'num-words';

import MainContent from '~/components/main-content';
import WayfindingItem from '~/components/wayfinding-item';

const DeepBlue = styled.section`
  background-color: ${(props) => props.theme.midnightBlue} !important;
  color: #fff !important;
  margin-bottom: 2vh !important;
  padding: 4vh 0 !important;
`;

const SectionTitle = styled.h2`
  color: #fff !important;
  margin-bottom: 4vh !important;
`;

const Title = styled.h3`
  color: ${(props) => props.theme.blueBright} !important;
  font-family: ${(props) => props.theme.dharma} !important;
  font-size: 40px !important;
  font-weight: 300px !important;
  line-height: 40px !important;
  margin-bottom: 0 !important;
  text-transform: uppercase !important;

  @media screen and (min-width: 320px) {
    font-size: calc(40x + 20 * ((100vw - 320px) / 880)) !important;
    line-height: calc(40px + 20 * ((100vw - 320px) / 880)) !important;
  }
  @media screen and (min-width: 1200px) {
    font-size: 50px !important;
    line-height: 50px !important;
  }

  span {
    color: white !important;
    font-size: 40px !important;

    @media screen and (min-width: 320px) {
      font-size: calc(40x + 20 * ((100vw - 320px) / 880)) !important;
      line-height: calc(40px + 20 * ((100vw - 320px) / 880)) !important;
    }
    @media screen and (min-width: 1200px) {
      font-size: 50px !important;
      line-height: 50px !important;
    }
  }
`;

const Text = styled.p`
  color: white !important;
  margin-bottom: 0 !important;
`;

const Item = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.lightGray} !important;
  margin-bottom: 2vh !important;
  padding-bottom: 2vh !important;

  &:last-child {
    border-bottom: none !important;
  }
`;

/**
 * <MissionPillars>
 *
 * This creates the container for MissionPillars
 * One day this will come from the backend...
 *
 */
const MissionPillars = () => {
  return (
    <>
      <MainContent>
        <h2>How To Get Involved</h2>
        <WayfindingItem
          path="/team"
          title="Meet Our Team"
          text="Discover who is helping to deliver your next ride."
        />
        <WayfindingItem
          path="/subcommittees"
          title="Join a PeopleForBikes Subcommittee"
          text="Help guide the world of bicycling forward."
        />
        <WayfindingItem
          path="/board-orientation"
          title="PeopleForBikes Board Orientation"
          text="Learn how to effectively contribute to our organization."
        />
        <WayfindingItem
          path="/board"
          title="Discover our Board"
          text="Our advisors come from all over the world of biking."
        />
        <WayfindingItem
          path="/corporate-members"
          title="Meet Our Corporate Members"
          text="See which companies support our mission directly."
        />
      </MainContent>
    </>
  );
};

export default MissionPillars;
