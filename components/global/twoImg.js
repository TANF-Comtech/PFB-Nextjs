import React from "react";
import styled from "styled-components";
import Text from "./text";

const ImgContainer = styled.div`
  width: 400px;
  height: 400px;
  background-size: cover;
  background-image: ${(props) => `url(${props.backgroundImage})`};
  background-repeat: no-repeat;
  background-position: center center;
`;
const TxtContainer = styled.div`
  width: 300px;
  height: 300px;
  background-color: rgba(0, 0, 0, 0.25);
  color: white;
  text-align: center;
  position: relative;
  top: 50px;
  left: 50px;
`;

export default function TwoImg(props) {
  return (
    <>
      <ImgContainer backgroundImage={props.backgroundImage}>
        <TxtContainer>
          <Text>This is a test</Text>
        </TxtContainer>
      </ImgContainer>
    </>
  );
}
