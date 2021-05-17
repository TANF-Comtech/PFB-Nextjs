import React from "react";
import styled from "styled-components";
import { linkResolver } from "../../lib/utils";
import BlueArrow from "../../public/PFB_BLUE_ARW_RIGHT.svg";

const Tile = styled.div`
  display: flex;
  background-image: url(${(props) => props.source});
  background-position: center center;
  background-size: cover;
  flex-direction: column;
  justify-content: flex-end;
  height: 40vh;
  margin: 5px;
  @media screen and (max-width: ${(props) => props.theme.lg}) {
    height: 30vh;
  }
  @media screen and (max-width: ${(props) => props.theme.md}) {
    height: 25vh;
  }
  @media screen and (max-width: ${(props) => props.theme.sm}) {
    height: 35vh;
    width: 100%;
  }
  @media screen and (max-width: ${(props) => props.theme.xs}) {
    height: 30vh;
  }
  @media screen and (max-width: ${(props) => props.theme.ty}) {
    height: 20vh;
  }
  @media screen and (max-width: ${(props) => props.theme.bm}) {
    height: 15vh;
  }
`;

const SCLink = styled.a`
  text-decoration: none !important;
  height: 33%;
`;

const SCTitleContainer = styled.div`
  background-color: rgba(26, 26, 26, 0.5);
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SCTitle = styled.h3`
  color: white;
  font-weight: 400;
  margin: 0;
  margin-left: 20px;
  text-transform: uppercase;
  @media screen and (max-width: ${(props) => props.theme.lg}) {
    font-size: 20px;
  }
  @media screen and (max-width: ${(props) => props.theme.md}) {
    font-size: 24px;
  }
  @media screen and (min-width: ${(props) => props.theme.sm}) {
    font-size: 24px;
  }
  @media screen and (max-width: ${(props) => props.theme.ty}) {
    font-size: 20px;
  }
`;

const Arrow = styled.img`
  width: calc(40vh * 0.33);
  @media screen and (max-width: ${(props) => props.theme.lg}){
    width: calc(30vh * 0.33);
  }
  @media screen and (max-width: ${(props) => props.theme.md}){
    width: calc(25vh * 0.33);
  }
  @media screen and (max-width: ${(props) => props.theme.sm}){
    width: calc(35vh * 0.33);
  }
  @media screen and (max-width: ${(props) => props.theme.xs}){
    width: calc(30vh * 0.33);
  }
  @media screen and (max-width: ${(props) => props.theme.ty}){
    width: calc(20vh * 0.33);
  }
  @media screen and (max-width: ${(props) => props.theme.bm}){
    width: calc(15vh * 0.33);
  }
`;

export default function SecondaryCampaign({ payload }) {
  return (
    <>
      {payload.map((sc) => {
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
      })}
    </>
  );
}
