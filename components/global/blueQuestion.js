import React from "react";
import QuestionBubble from "../../public/question-bubbles.png";
import styled from "styled-components"

const InfoContainer = styled.section`
align-items: center;
  background-image: linear-gradient(90deg, #3E9FDC, #001f33);
  display: flex;
  height: 150px;
  justify-content: center;
  position: relative;
`
const Gradient1 = styled.div`
background-image: repeating-linear-gradient(
    135deg,
    #8AD9FA,
    #8AD9FA 2px,
    transparent 1px,
    transparent 10px 
  );
  height: 100%;
  left: 0;
  opacity: 0.3;
  position: absolute;
  width: 100%;
`
const Gradient2 = styled.div`
background-image: repeating-linear-gradient(
    155deg,
    #2F79A7,
    #2F79A7 2px,
    transparent 1px,
    transparent 8px 
  );
  height: 100%;
  opacity: 0.3;
  position: absolute;
  width: 100%;
`
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
`
const ContentContainer = styled.div`
align-items: center;
display: flex;
position: relative;
width: 600px;
  z-index: 10;
`
const ButtonContainer = styled.div `
flex-basis: 90px;
  margin-right: 10px;
`
const Graphic = styled.div`
  background-color: red;
  border: 5px solid white;
  border-radius: 45px;
  height: 80px;
  opacity: 1;
  width: 80px;
`

const Text = styled.p`
  color: white;
  flex-basis: 510px;
  font-size: 18px;
  line-height: 1.3;
  margin: 0;
`
const Bold = styled.span `
font-weight: bold;
`

export default function QuestionBar() {

  return(

  )
}