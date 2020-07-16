/****
 * QUICK START:
 * 1. Simply pass in this component and insert the text that you want to appear in the banner.
 *
 * Ex.
 *
 * <BlueQuestion> Irure minim minim amet nulla pariatur ea do veniam duis qui id incididunt eiusmod.</BlueQuestion>
 ****/

import React from "react";
import styled from "styled-components";

import QuestionBubble from "../../public/question-bubbles.png";

/****
 * The main container of the whole banner. It holds the graphics and the information.
 ****/
const InfoContainer = styled.section`
  align-items: center;
  background-image: linear-gradient(90deg, #3e9fdc, #001f33);
  display: flex;
  height: 150px;
  justify-content: center;
  position: relative;
`;

/****
 * The next 3 styled components are gradients used to create the background lines effect
 ****/
const Gradient1 = styled.div`
  background-image: repeating-linear-gradient(
    135deg,
    #8ad9fa,
    #8ad9fa 2px,
    transparent 1px,
    transparent 10px
  );
  height: 100%;
  left: 0;
  opacity: 0.3;
  position: absolute;
  width: 100%;
`;

const Gradient2 = styled.div`
  background-image: repeating-linear-gradient(
    155deg,
    #2f79a7,
    #2f79a7 2px,
    transparent 1px,
    transparent 8px
  );
  height: 100%;
  opacity: 0.3;
  position: absolute;
  width: 100%;
`;

const Gradient3 = styled.div`
  background-image: repeating-linear-gradient(
    205deg,
    white,
    white 2px,
    transparent 1px,
    transparent 8px
  );
  height: 100%;
  opacity: 0.1;
  position: absolute;
  width: 100%;
`;

/****
 * This is information's home.
 ****/
const ContentContainer = styled.div`
  align-items: center;
  display: flex;
  position: relative;
  width: 600px;
  z-index: 10;
`;

/****
 * This container is styled to have a white border and red background. I'll pass the svg bubble question mark into here.
 ****/
const ButtonContainer = styled.div`
  flex-basis: 90px;
  margin-right: 10px;
`;

/****
 * More styling on the icon.
 ****/
const Graphic = styled.div`
  background-color: red;
  border: 5px solid white;
  border-radius: 45px;
  height: 80px;
  opacity: 1;
  width: 80px;
  background-image: url(${QuestionBubble});
  background-position: center center;
  background-repeat: no-repeat;
`;

const Text = styled.p`
  color: white;
  flex-basis: 510px;
  font-size: 18px;
  line-height: 1.3;
  margin: 0;
`;

export default function QuestionBar({ children }) {
  return (
    <InfoContainer>
      <Gradient1 />
      <Gradient2 />
      <Gradient3 />
      <ContentContainer>
        <ButtonContainer>
          <Graphic />
        </ButtonContainer>
        <Text>{children}</Text>
      </ContentContainer>
    </InfoContainer>
  );
}
