import React from "react";
import styled from "styled-components";
import { linkResolver } from "../../lib/utils";
import BlueArrow from "../../public/PFB_BLUE_ARW_RIGHT.svg";
import MainContent from "../global/main-content";

const Wrapper = styled.section`
  display: flex;
  max-height: 25vh;
  margin: 10vh 0;
  align-items: center;
  padding-bottom: 10vh;
  border-bottom: solid 1px gray;
  @media screen and (max-width: ${(props) => props.theme.lg}) {
    max-height: 25vh;
    margin: 5vh 0;
    padding-bottom: 5vh;
  }
  @media screen and (max-width: ${(props) => props.theme.sm}) {
    flex-direction: column;
    max-height: 100vh;
    padding-bottom: 5vh;
    margin: 5vh 0;
  }
`;

const Tile = styled.div`
  display: flex;
  background-image: url(${(props) => props.source});
  background-position: center center;
  background-size: cover;
  flex-direction: column;
  justify-content: flex-end;
  height: 25vh;
  min-width: 30vw;
  @media screen and (max-width: ${(props) => props.theme.lg}) {
    height: 15vh;
    min-width: 40vw;
  }
  @media screen and (max-width: ${(props) => props.theme.sm}) {
    height: 35vh;
    width: 100%;
  }
  @media screen and (max-width: ${(props) => props.theme.xs}) {
    height: 25vh;
    width: 100%;
  }
`;

const SCLink = styled.a`
  text-decoration: none !important;
  height: 33%;
`;

const SCTitleContainer = styled.div`
  background-color: rgba(26, 26, 26, 0.5);
  height: 100%;
  width: 100%;
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
    font-size: 24px;
  }
  @media screen and (max-width: ${(props) => props.theme.lg}) {
    font-size: 28px;
  }
  @media screen and (max-width: ${(props) => props.theme.sm}) {
    font-size: 36px;
    line-height: 110%;
  }
  @media screen and (max-width: ${(props) => props.theme.xs}) {
    font-size: 24px;

  }
  @media screen and (max-width: ${(props) => props.theme.bm}) {
    font-size: 20px;

  }
`;

const Arrow = styled.img`
  width: calc(25vh * 0.33);
  @media screen and (max-width: ${(props) => props.theme.lg}) {
    width: calc(15vh * 0.33);
  }
  @media screen and (max-width: ${(props) => props.theme.sm}) {
    width: calc(35vh * 0.33);
  }
  @media screen and (max-width: ${(props) => props.theme.xs}) {
    width: calc(25vh * 0.33);
  }
`;

const Description = styled.p`
  max-height: 25vh;
  margin-left: 20px;
  margin-bottom: 0;
  overflow-wrap: break-word;
  overflow-y: hidden;
  display: block;
  @media screen and (max-width: ${(props) => props.theme.lg}) {
    max-height: 15vh;
  }
  @media screen and (max-width: ${(props) => props.theme.sm}) {
    max-height: 75vh;
    margin: 0;

    margin-top: 10px;
  }
  @media screen and (max-width: ${(props) => props.theme.xs}) {
    max-height: 75vh;
  }
`;

export default function CampaignList({ payload }) {
  return (
    <MainContent>
      {payload.map((cl) => {
        return (
          <Wrapper>
            <Tile key={cl.node._meta.id} source={cl.node.banner_image.url}>
              <SCLink href={linkResolver(cl.node.link, true)}>
                <SCTitleContainer>
                  <Arrow src={BlueArrow} />
                  {cl.node.big_text && <SCTitle>{cl.node.big_text}</SCTitle>}
                </SCTitleContainer>
              </SCLink>
            </Tile>
            <Description>{cl.node.description}</Description>
          </Wrapper>
        );
      })}
    </MainContent>
  );
}
