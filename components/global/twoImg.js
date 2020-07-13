import React from "react";
import styled from "styled-components";
import Bike from "../../public/bike.jpg";

const ImgContainer = styled.div`
  width: 400px;
  height: 400px;
  background-size: cover;
  background-image: url(${Bike});
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
      <ImgContainer>
        <TxtContainer>This is a test</TxtContainer>
      </ImgContainer>
    </>
  );
}
