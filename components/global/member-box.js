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

export default function CoalitionMember({ hit }) {
  return (
    <>
      <Box>
        <Company>
          {!hit.Website && hit.Name}
          {hit.Website &&
            (hit.Website.includes("http://") ||
              hit.Website.includes("https://") ||
              hit.Website.includes("HTTP://") ||
              hit.Website.includes("HTTPS://")) && (
              <a
                href={hit.Website}
                style={{ color: "inherit", textDecoration: "underline", fontWeight: 'bold' }}
              >
                {hit.Name}
              </a>
            )}
          {hit.Website &&
            !(
              hit.Website.includes("http://") ||
              hit.Website.includes("https://") ||
              hit.Website.includes("HTTP://") ||
              hit.Website.includes("HTTPS://")
            ) && (
              <a
                href={`https://${hit.Website}`}
                style={{ color: "inherit", textDecoration: "underline", fontWeight: 'bold' }}
              >
                {hit.Name}
              </a>
            )}
        </Company>
      </Box>
    </>
  );
}
