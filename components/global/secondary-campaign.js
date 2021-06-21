import React from "react";
import styled from "styled-components";
import { linkResolver } from "../../lib/utils";
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
