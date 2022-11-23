import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { getNewHomepage } from '~/lib/queries/new-homepage';
import { randomID } from '~/utils';
import getMetadata from '~/utils/getMetadata';
import { linkResolver } from '~/utils';
import { arrayShuffle } from '~/utils/arrayShuffle';

import Wrapper from '~/components/wrapper';
import HeaderImage from '~/components/header-image';
import MainContent from '~/components/main-content';
import RideSpotPromo from '~/components/ridespot-promo';
import Button from '~/components/button';
import Carousel from '~/components/carousel';
import SecondaryCampaign from '~/components/secondary-campaign';
import NewsList from '~/components/news-list';
import SiteMetaCustom from '~/components/site-meta-custom';

const BigSectionTitle = styled.h2`
  color: ${(props) => props.theme.darkestGray};
  font-weight: 300;
  margin: 4vh 2vw 0 2vw;
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

const Grid = styled.section`
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 1fr;
  margin: 0 4vw;

  @media (min-width: ${(props) => props.theme.md}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const HeroText = styled.h1`
  margin: 4vh 0;
  padding: 0;
  max-width: 1200px;
  text-transform: uppercase;

  @media (min-width: ${(props) => props.theme.lg}) {
    padding: 0;
  }

  @media (max-width: ${(props) => props.theme.xs}) {
    font-size: 60px;
  }
`;

export default function Homepage({ page }) {
  const { new_homepage } = page;

  // Controls for random hero
  const [singleHero, setSingleHero] = useState();
  useEffect(() => {
    new_homepage.body.map((body) => {
      if (body.__typename === 'New_homepageBodyHero') {
        arrayShuffle(body.fields);
        body.fields.map((hero) => {
          setSingleHero(hero);
        });
      }
    });
  }, [new_homepage]);

  // metadata
  const { theTitle, theDesc, theKeywords, theImage, theImageWidth, theImageHeight } =
    getMetadata(new_homepage);

  return (
    <Wrapper postTitle="PeopleForBikes Homepage" isWide={true}>
      <SiteMetaCustom
        desc={theDesc}
        keywords={theKeywords}
        title={theTitle}
        imgHeight={theImageHeight}
        imgSrc={theImage}
        imgWidth={theImageWidth}
        path="https://www.peopleforbikes.org"
      />

      {singleHero && (
        <HeaderImage source={singleHero.hero_image.url}>
          <HeroText>{singleHero.hero_text}</HeroText>
          <Button
            href={linkResolver(singleHero.hero_link)}
            buttonAlign="center"
            buttonBg="#00A2DF"
            buttonColor="white"
            buttonBorder="none"
          >
            Help Support Our Mission
          </Button>
        </HeaderImage>
      )}

      {new_homepage.campaigns && (
        <MainContent maxWidth="1600px">
          <Carousel payload={new_homepage.campaigns} />
        </MainContent>
      )}

      {new_homepage.secondary_campaigns && (
        <MainContent contentPadding="0 4vw 8vh 4vw" maxWidth="1550px">
          <Grid>
            <SecondaryCampaign isHomepage={true} payload={new_homepage.secondary_campaigns} />
          </Grid>
        </MainContent>
      )}

      {new_homepage.body &&
        new_homepage.body.map((slice) => {
          if (slice.type === 'ridespot_promo') {
            return <RideSpotPromo key={randomID(98692845768957)} payload={slice.primary} />;
          }
        })}

      {new_homepage.news && (
        <>
          <BigSectionTitle>
            PeopleForBikes <span>News</span>
          </BigSectionTitle>
          <NewsList nodeName="news_item" payload={new_homepage.news} />
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
    </Wrapper>
  );
}

/* The return here sends the `page` prop back to the component above for rendering */
export async function getStaticProps({ params, preview = false, previewData }) {
  const data = await getNewHomepage(previewData);

  return {
    props: {
      preview,
      page: data ?? null,
    },
    revalidate: 60,
  };
}
