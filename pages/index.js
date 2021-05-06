import React, { useState, useEffect } from "react";
// import Link from "next/link";
import styled from "styled-components";

import { getNewHomepage } from "../lib/queries/new-homepage";
// import { randomID } from "../lib/utils";

import Wrapper from "../components/global/wrapper";
import HeaderImage from "../components/global/header-image";
// import Grid from "../components/global/grid";
// import MainContent from "../components/global/main-content";
// import RideSpotPromo from "../components/slices/ridespot-promo";
// import Promo from "../components/slices/promo";
// import ColorBanner from "../components/global/color-banner";
import Button from "../components/primitives/button";
// import Carousel from "../components/global/carousel";
// import NewsList from "../components/content/news-list";

// import WhiteArrow from "../public/white-arrow.svg";

import { arrayShuffle, linkResolver } from "../lib/utils";

const SectionTitle = styled.h3`
  color: ${(props) => props.theme.midnightBlue};
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 4vh;
`;

const BigSectionTitle = styled.h2`
  color: ${(props) => props.theme.darkestGray};
  font-weight: 300;
  margin-bottom: 25px;
  text-align: center;

  span {
    color: ${(props) => props.theme.redAccent};
    font-size: 46.66px;
    font-weight: 600;
    text-transform: uppercase;

    @media screen and (min-width: 320px) {
      font-size: calc(46.66px + 23.33 * ((100vw - 320px) / 880));
    }
    @media screen and (min-width: 1200px) {
      font-size: 70px;
    }
  }
`;

// Box Component soon...
const Box = styled.div`
  background-color: ${(props) => props.bgColor};
  min-height: 190px;
  padding: 25px 50px;
`;

const Number = styled.h3`
  align-items: center;
  background-color: white;
  border-radius: 23px;
  color: ${(props) => props.theme.midnightBlue};
  display: flex;
  font-size: 28px;
  height: 46px;
  justify-content: center;
  margin: 0 auto;
  width: 46px;
`;

const Text = styled.h4`
  color: white;
  font-size: 36px;
  font-weight: 300;
  line-height: 36px;
  margin-top: 1vh;
  text-align: center;
  text-decoration: underline;

  @media screen and (min-width: 320px) {
    font-size: calc(36px + 8 * ((100vw - 320px) / 880));
    line-height: calc(36px + 8 * ((100vw - 320px) / 880));
  }
  @media screen and (min-width: 1200px) {
    font-size: 44px;
    line-height: 44px;
  }
`;

const Arrow = styled.img`
  display: block;
  margin: 0 auto;
  width: 46px;
`;

export default function Homepage({ page }) {
  const { new_homepage } = page;
  const [singleHero, setSingleHero] = useState();

  useEffect(() => {
    new_homepage.body.map((body) => {
      if (body.__typename === "New_homepageBodyHero") {
        arrayShuffle(body.fields);
        body.fields.map((hero) => {
          setSingleHero(hero);
        });
      }
    });
  }, [new_homepage]);

  return (
    <Wrapper postTitle="People for Bikes Homepage" isWide={true}>
      {singleHero && (
        <HeaderImage source={singleHero.hero_image.url}>
          <h1>{singleHero.hero_text}</h1>

          <Button
            href={linkResolver(singleHero.hero_link)}
            buttonBg="#00A2DF"
            buttonColor="white"
            buttonBorder="none"
          >
            Our Mission
          </Button>
        </HeaderImage>
      )}

      {/* <MainContent>
        <SectionTitle>Our Mission</SectionTitle>
        <Grid gridGap="1vw">
          <Link
            href="/topics/recreational-bike-access"
            passHref
            key={randomID(90849875924875)}
          >
            <a>
              <Box bgColor="#00A2DF" key={randomID(90849875924875)}>
                <Number>1</Number>
                <Text>Improving Recreational Access for Bicycles</Text>
              </Box>
            </a>
          </Link>
          <Link
            href="/topics/bike-safety"
            passHref
            key={randomID(165131321310)}
          >
            <a>
              <Box bgColor="#00A2DF" key={randomID(9584230958298347510)}>
                <Number>2</Number>
                <Text>Building Safe Mobility Networks</Text>
              </Box>
            </a>
          </Link>
          <Link
            href="/topics/inclusive-biking"
            passHref
            key={randomID(85963453564)}
          >
            <a>
              <Box bgColor="#00A2DF" key={randomID(8987345834)}>
                <Number>3</Number>
                <Text>Fostering Diversity, Equity, and Inclusion</Text>
              </Box>
            </a>
          </Link>
          <Link
            href="/topics/sustainable-transportation"
            passHref
            key={randomID(1861553564)}
          >
            <a>
              <Box bgColor="#00A2DF" key={randomID(65423321432)}>
                <Number>4</Number>
                <Text>Promoting Sustainability</Text>
              </Box>
            </a>
          </Link>
          <Link href="/topics/bike-business" passHref key={randomID(165123341)}>
            <a>
              <Box bgColor="#00A2DF" key={randomID(1239482309)}>
                <Number>5</Number>
                <Text>Growing the Bike Industry</Text>
              </Box>
            </a>
          </Link>
          <Link href="/mission" passHref key={randomID(453908904875892)}>
            <a>
              <Box bgColor="#002C40" key={randomID(242349879)}>
                <Arrow src={WhiteArrow} width="46px" />
                <Text>Read More About Our Mission</Text>
              </Box>
            </a>
          </Link>
        </Grid>
      </MainContent>

      {homepage.campaigns && (
        <>
          <SectionTitle>Get Involved</SectionTitle>
          <Carousel payload={homepage.campaigns} />
        </>
      )}

      {homepage.body &&
        homepage.body.map((slice) => {
          if (slice.type === "ridespot_promo") {
            return (
              <RideSpotPromo
                key={randomID(98692845768957)}
                payload={slice.primary}
              />
            );
          }
        })}

      {homepage.news && (
        <>
          <BigSectionTitle>
            PeopleForBikes <span>News</span>
          </BigSectionTitle>
          <NewsList nodeName="news_item" payload={homepage.news} />
          <Button
            buttonAlign="center"
            buttonBg="#D0021B"
            buttonBorder="none"
            buttonColor="white"
            buttonFontSize="24px"
            buttonMargin="0 0 50px 0"
            buttonPadding="10px 30px"
            buttonTextTransform="uppercase"
            href="/news"
          >
            See All News
          </Button>
        </>
      )}

      {homepage.body &&
        homepage.body.map((slice) => {
          if (slice.type === "event_promo") {
            return (
              <Promo
                bigWords={slice.primary.bottom_text}
                key={randomID(4132168613)}
                path={slice.primary.link}
                smallWords={slice.primary.top_text}
                source={slice.primary.main_image.url}
              />
            );
          }
        })}

      {homepage.body &&
        homepage.body.map((slice) => {
          if (slice.type === "promo") {
            return (
              <Promo
                bigWords={slice.primary.bottom_text}
                key={randomID(4132168613)}
                path={slice.primary.link}
                smallWords={slice.primary.top_text}
                source={slice.primary.main_image.url}
              />
            );
          }
        })}

      <ColorBanner /> */}
    </Wrapper>
  );
}

/* The return here sends the `page` prop back to the component above for rendering */
export async function getStaticProps({ params, preview = false, previewData }) {
  const pageData = await getNewHomepage();

  return {
    props: {
      preview,
      page: pageData ?? null,
    },
    revalidate: 60,
  };
}
