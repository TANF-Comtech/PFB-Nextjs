import React from 'react';
import styled from 'styled-components';

import { linkResolver, randomID } from '~/utils';

import MainContent from '~/components/main-content';
import Rule from '~/components/rule';

import BlueArrow from '~/public/pfb-blue-arrow-right.svg';

const Tile = styled.div`
  display: flex !important;
  background-image: url(${(props) => props.source}) !important;
  background-position: center center !important;
  background-repeat: no-repeat !important;
  background-size: contain !important;
  flex-direction: column !important;
  justify-content: flex-end !important;
  height: 0 !important;
  margin: 5px !important;
  padding-top: 50% !important;
  width: 100% !important;
`;

const SCLink = styled.a`
  text-decoration: none !important;
`;

const SCTitleContainer = styled.div`
  background-color: rgba(26, 26, 26, 0.5) !important;
  max-height: 75px !important;
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
`;

const SCTitle = styled.h3`
  color: white !important;
  font-size: 18px !important;
  font-weight: 700 !important;
  line-height: 1.1 !important;
  margin: 0 20px !important;
  text-transform: uppercase !important;
`;

const Arrow = styled.img`
  width: 50px !important;

  @media (min-width: ${(props) => props.theme.md}) {
    width: 60px !important;
  }
`;

const Description = styled.p`
  align-items: center !important;
  display: flex !important;
  font-size: 18px !important;
  margin-left: 10px !important;
`;

const Grid = styled.section`
  display: grid !important;
  grid-gap: 15px !important;
  grid-template-columns: 1fr !important;
  margin: 0 4vw !important;

  @media (min-width: ${(props) => props.theme.sm}) {
    grid-template-columns: 1fr 1fr !important;
  }
`;

/**
 * <SecondaryCampaign>
 *
 * A component that makes a nice image with title overlay and description
 *
 * @param { boolean } isHomepage - true if homepage usage
 * @param { array } payload - data block full of campaigns
 *
 * @returns { object } - JSX of Campaigns in a CSS grid
 */
export default function SecondaryCampaign({ payload = [], isHomepage = false }) {
  return (
    <>
      {isHomepage === true ? (
        payload.map((sc) => {
          return (
            <Tile
              key={sc.secondary_campaign._meta.id}
              source={sc.secondary_campaign.banner_image.url}
            >
              <SCLink href={linkResolver(sc.secondary_campaign.link, true)}>
                <SCTitleContainer>
                  <Arrow src={BlueArrow} />
                  {sc.secondary_campaign.big_text && (
                    <SCTitle>{sc.secondary_campaign.big_text}</SCTitle>
                  )}
                </SCTitleContainer>
              </SCLink>
            </Tile>
          );
        })
      ) : (
        <MainContent>
          {payload !== undefined &&
            payload.map((cl) => {
              return (
                <>
                  <Grid key={cl.item._meta.id}>
                    <Tile source={cl.item.banner_image?.url}>
                      {cl.item.link && (
                        <SCLink href={linkResolver(cl.item.link)}>
                          <SCTitleContainer>
                            <Arrow src={BlueArrow} />
                            <SCTitle>{cl.item.title[0].text}</SCTitle>
                          </SCTitleContainer>
                        </SCLink>
                      )}
                    </Tile>
                    <Description>{cl.item.description}</Description>
                  </Grid>
                  <Rule key={randomID(34093849018)} padding="4vh 4vw" />
                </>
              );
            })}
        </MainContent>
      )}
    </>
  );
}
