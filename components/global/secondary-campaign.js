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
`;

const SCLink = styled.a`
  text-decoration: none !important;
`;

const SCcontainer = styled.div`
  display: flex;
`;

const SCTitleContainer = styled.div`
  background-color: rgba(26, 26, 26, 0.3);
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SCTitle = styled.h3`
  color: white;
  font-weight: 400;
  margin: 0;
  margin-left: 20px;
`;

const Arrow = styled.img`
  width: 50px;
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
