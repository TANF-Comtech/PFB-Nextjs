import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

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

/**
 * <Accordion>
 * 
 * Pass in the prop "title" to insert the text that you want to appear next to the arrow button
 * Within the element, pass in the text that you want to appear after the accordion has been activated.
 * 
 * @param {string} title - pass in the title of the accordion as a prop
 * @param {obj} children - accordion content should be passed in using the children object
 */

const Accordion = ({ title, children }) => {
  const accordionContent = useRef(null);
  const [accordionHeight, setAccordionHeight] = useState(0)
  const [open, setOpen] = useState(false);

  // Get accordion element height on page load
  useEffect( () => {
    setAccordionHeight(accordionContent.current.clientHeight)
  })

  // Toggle accordion state when clicked
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
