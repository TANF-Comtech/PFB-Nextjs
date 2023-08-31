import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import HeaderImage from '~/components/header-image';
import SummaryBlock from '~/components/summary-block';

import AdvocacyAcademyBG from '~/public/take-action/advocacy-academy.jpg';
import CityRatingsBG from '~/public/take-action/city-ratings.jpg';
import GrantsBG from '~/public/take-action/grants.jpg';
import WhiteArrow from '~/public/white-arrow.svg';

const Container = styled.section`
  padding-bottom: 10vh !important;

  a,
  a:visited,
  a:active,
  a:focus,
  a:hover {
    text-decoration: none !important;
  }
`;

const Arrow = styled.img`
  display: block !important;
  margin: 15px auto !important;
  width: 46px !important;
`;

/**
 * <TakeActionList>
 *
 * Put all the big join blocks onto the Join page
 * This is mostly static block, just simplies things as this page will never change
 */
export default function TakeActionList() {
  return (
    <>
      <Container>
        <a href="https://cityratings.peopleforbikes.org/" rel="nofollow" target="_blank">
          <HeaderImage source={CityRatingsBG}>
            <h1>City Ratings</h1>
            <Arrow src={WhiteArrow} />
          </HeaderImage>
        </a>
        <SummaryBlock bgColor="#002C40" textColor="#fff">
          <p>
            Is your city great for biking? Compare nearly 600 cities from across the U.S. and
            internationally with our annual PlacesForBikes City Ratings, a data-driven analysis to
            evaluate, identify and compare the best cities and towns for bicycling.
          </p>
        </SummaryBlock>
      </Container>
      <Container>
        <a href="https://academy.peopleforbikes.org/" rel="nofollow" target="_blank">
          <HeaderImage source={AdvocacyAcademyBG}>
            <h1>Advocacy Academy</h1>
            <Arrow src={WhiteArrow} />
          </HeaderImage>
        </a>
        <SummaryBlock bgColor="#002C40" textColor="#fff">
          <p>
            Want to make your city better for bikes? Visit our Advocacy Academy, an online video
            series and resource library providing city leaders, decision makers and advocates the
            necessary tools to make biking better in their communities.
          </p>
        </SummaryBlock>
      </Container>
      <Container>
        <Link href="/grants" passHref>
          <HeaderImage source={GrantsBG}>
            <h1>Community Grants</h1>
            <Arrow src={WhiteArrow} />
          </HeaderImage>
        </Link>
        <SummaryBlock bgColor="#002C40" textColor="#fff">
          <p>
            Since 1999, we have awarded more than 400 grants to non-profit organizations and local
            governments in all 50 states, Washington, D.C. and Puerto Rico. Click here to learn more
            about our Community Grant Program.
          </p>
        </SummaryBlock>
      </Container>
    </>
  );
}
