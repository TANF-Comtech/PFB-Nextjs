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

export default function CoalitionMember({ name, url }) {
  return (
    <Box>
      <Company>
        <a href={url} style={{ color: "inherit" }}>
          {name}
        </a>
      </Company>
    </Box>
  );
}
