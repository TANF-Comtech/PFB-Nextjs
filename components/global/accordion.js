import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";

import Arrow from "../../public/triangle.svg"

const AccordionWrapper = styled.div`
  align-items: center;
  background-color: white;
  border-top: 1px solid black;
  cursor: pointer;
  display: flex;
  height: auto;
  padding: 2% 0;
  transition: height 0.5s ${(props) => props.theme.cubicSmooth };
`;

const InternalWrapper = styled.div`
  max-height: ${(props) => props.open ? props.accordionHeight : "0"};
  opacity: ${(props) => props.open ? "1" : "0"};
  overflow: hidden;
  transform: ${(props) => props.open ? "scaleY(1)" : "scaleY(0)"};
  transform-origin: 50% 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`;

const ArrowButton = styled.img`
  border: none;
  height: min-content;
  margin: none;
  transition: all 0.1s ease-in-out;
  transform: ${props => props.open ? "rotate(90deg)" : "rotate(0deg)"}; 
  transform-origin: 40% 40%;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: bold;
  margin: none;
  padding-left: 10px;
`;

/****
 * QUICK START:
 * 1. Import the component, and insert it wherever you may want it.
 * 
 * 2. Pass in the prop "title" to insert the text that you want to appear next to the arrow button
 * 
 * 3. Within the element, pass in the text that you want to appear after the accordion has been activated.
 * 
 * Ex.
 * 
 *   <Accordion title="Can John be nice?">
          Answer: Ask a different question. It'll never happen.
      </Accordion>
 ****/

const Accordion = ({ title, children }) => {
  const accordionContent = useRef(null);
  const [accordionHeight, setAccordionHeight] = useState(0)

  // Get accordion element on load
  useEffect( () => {
    setAccordionHeight(accordionContent.current.clientHeight)
    console.log(accordionHeight)
  })

  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <AccordionWrapper onClick={handleClick} open={open}>
        <ArrowButton
          alt="Accordion Arrow - click to reveal content"
          open={ open }
          src={ Arrow }
        />
        <Title>
          {title}
        </Title>
      </AccordionWrapper>
      <InternalWrapper open={open} ref={accordionContent}>
        <p>{children}</p>
      </InternalWrapper>
    </>
  );
};

export default Accordion;
