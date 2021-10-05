import React from "react";
import styled from "styled-components";

const Box = styled.div`
  width: 100%;
  background-color: #d8d8d8;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5vh 0;
`;

const Company = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  text-align: center;
  margin: 0;
`;

const CompName = styled.p`
  padding: 0 3vw;
`

const HyperCompName = styled.a`
  font-weight: bold;
  padding: 0 5vw;
  &:hover {
    color: inherit;
  }
`;

export default function CoalitionMember({ hit }) {
  return (
    <>
      <Box>
        <Company>
          {!hit.Website && <CompName>{hit.Name}</CompName>}
          {hit.Website &&
            (hit.Website.includes("http://") ||
              hit.Website.includes("https://") ||
              hit.Website.includes("HTTP://") ||
              hit.Website.includes("HTTPS://")) && (
              <HyperCompName
                style={{ textDecoration: "underline", color: "inherit" }}
                href={hit.Website}
              >
                {hit.Name}
              </HyperCompName>
            )}
          {hit.Website &&
            !(
              hit.Website.includes("http://") ||
              hit.Website.includes("https://") ||
              hit.Website.includes("HTTP://") ||
              hit.Website.includes("HTTPS://")
            ) && (
              <HyperCompName
                style={{ textDecoration: "underline", color: "inherit" }}
                href={`https://${hit.Website}`}
              >
                {hit.Name}
              </HyperCompName>
            )}
        </Company>
      </Box>
    </>
  );
}
