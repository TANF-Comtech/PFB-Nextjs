/****
 * QUICK START:
 *  1. In order to use this component, simply pass it in to the page, and insert the text you want to appear
 * in the opaque box between the element.
 *
 * 2. Pass in the overlayImage prop along with whatever imported image you'd like to use in background.
 *
 * Ex.
 * <TwoImg overlayImg={Bike}>I want this text to appear</TwoImg>.
 ****/

import React from "react";
import styled from "styled-components";
import RightArrow from "../../public/arrow.png";

/****
 * Container that holds the background image and will be the main div for the rest of the components.
 ****/
const ImgContainer = styled.div`
  width: 400px;
  height: 400px;
  margin: 20px;
  background-size: cover;
  background-image: ${(props) => `url(${props.overlayImg})`};
  background-repeat: no-repeat;
  background-position: center center;
`;

/****
 * The container that is black with an a really low opacity. It will hold the text within in.
 ****/
const InnerContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 300px;
  height: 300px;
  background-color: rgba(0, 0, 0, 0.25);
  color: white;
  text-align: center;
  position: relative;
  top: 50px;
  left: 50px;
`;

/****
 * This is the actual text, i'm struggling with getting it in the middle of the container. I can get it to be in the center, but not vertically align it to the middle.
 ****/
const TxtContainer = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;

/****
 * This is the Arrow button that acutallly isn't a button at the moment. The arrow background currently was from material.io. However, I want to use the Noun project
 * since i can change the color and size that I need, but you need a subscription to use it. Does THOR have one? Can we get one?
 ****/
const Arrow = styled.button`
  /* REPLACE THIS BACKGROUND IMAGE!! */
  background-image: url(${RightArrow});
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  float: right;
  border: none;
  color: red;
  width: 40px;
  height: 40px;
  background-color: white;
  position: relative;
  top: 45%;
`;

const TwoImg = ({ children, overlayImg }) => {
  return (
    <>
      <ImgContainer overlayImg={overlayImg}>
        <Arrow />
        <InnerContainer>
          <TxtContainer>{children}</TxtContainer>
        </InnerContainer>
      </ImgContainer>
    </>
  );
};

export default TwoImg;
