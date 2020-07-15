import React from "react";
import QuestionBubble from "../../public/question-bubbles.png";
import styled from "styled-components";

/****
 * I really ripped you off on this one. I just went and took a look at what you had done in the code sandbox and made everything into styled
 * components here. Only thing I need to do is insert the image into the bubble now.
 ****/

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
 * The next 3 styled components are gradients used to create the effect that we saw in the wireframe. Although not quite as complicated.
 * But it's still pretty cool and I wanna learn more about how to do this.
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

/****
 * Text stylnig.
 ****/
const Text = styled.p`
  color: white;
  flex-basis: 510px;
  font-size: 18px;
  line-height: 1.3;
  margin: 0;
`;

/****
 * Used to bold only one part of the text.
 ****/
const Bold = styled.span`
  font-weight: bold;
`;

export default function QuestionBar() {
  return (
    <InfoContainer>
      <Gradient1 />
      <Gradient2 />
      <Gradient3 />
      <ContentContainer>
        <ButtonContainer>
          <Graphic />
        </ButtonContainer>
        <Text>
          <Bold>Questions?</Bold> For assistance in setting up your Employee Pro
          Purchase Program, please contact Erik Esborg at 303/449-4893 x103,
          erik@peopleforbikes.org.
        </Text>
      </ContentContainer>
    </InfoContainer>
  );
}
