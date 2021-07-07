import React from "react";
import styled from "styled-components";
import { linkResolver, randomID } from "../../lib/utils";

import MainContent from "../global/main-content";
import Rule from "../primitives/rule"

import BlueArrow from "../../public/PFB_BLUE_ARW_RIGHT.svg";

const Tile = styled.div`
  display: flex;
  background-image: url(${(props) => props.source});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
  flex-direction: column;
  justify-content: flex-end;
  height: 0;
  margin: 5px;
  padding-top: 50%;
  width: 100%;
`;

const SCLink = styled.a`
  text-decoration: none !important;
`;

const SCTitleContainer = styled.div`
  background-color: rgba(26, 26, 26, 0.5);
  max-height: 75px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SCTitle = styled.h3`
  color: white;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.1;
  margin: 0 20px;
  text-transform: uppercase;
`;

const Arrow = styled.img`
  width: 50px;

  @media (min-width: ${ props => props.theme.md }) {
    width: 60px;
  }
`;

const Description = styled.p`
  align-items: center;
  display: flex;
  font-size: 18px;
  margin-left: 10px;
`;

const Grid = styled.section`
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 1fr;
  margin: 0 4vw;

  @media( min-width: ${ props => props.theme.sm } ) {
    grid-template-columns: 1fr 1fr;
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
export default function SecondaryCampaign({ 
  payload = [],
  isHomepage = false
}) {
  return (
    <>
      { isHomepage === true ? (
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
          { payload !== undefined &&
            payload.map((cl) => {
            return (
              <>
              <Grid key={ cl.item._meta.id }>
                <Tile source={ cl.item.banner_image?.url }>
                  { cl.item.link && 
                    <SCLink href={ linkResolver(cl.item.link) }>
                      <SCTitleContainer>
                        <Arrow src={ BlueArrow } />
                        <SCTitle>{ cl.item.title[0].text }</SCTitle>
                      </SCTitleContainer>
                    </SCLink>                  
                  }
                </Tile>
                <Description>{ cl.item.description }</Description>
              </Grid>
              <Rule
                key={ randomID(34093849018) }
                padding="4vh 4vw"
              />
              </>
            );
          })}
        </MainContent>
      )}
    </>
  );
}
