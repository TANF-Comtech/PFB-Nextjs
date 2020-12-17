import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import Arrow from "../../public/red-arrow-triangle.svg"

const AccordionWrapper = styled.div`
  align-items: center;
  background-color: white;
  border-top: 1px solid black;
  cursor: pointer;
  display: flex;
  height: auto;
  padding: 4vh 0;
  transition: 0.5s ease-in-out;

  &:first-child {
    border-top: none;
  }
`;

const InternalWrapper = styled.div`
  max-height: ${(props) => props.open ? "auto" : "0"};
  opacity: ${(props) => props.open ? "1" : "0"};
  overflow: hidden;
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`;

const ArrowButton = styled.img`
  border: none;
  height: min-content;
  margin: none;
  transition: all 0.25s ease-in-out;
  transform: ${props => props.open ? "rotate(90deg)" : "rotate(0deg)"}; 
  transform-origin: 40% 40%;
`;

const Title = styled.h2`
  font-size: 40px;
  line-height: 40px;
  margin: 0;
  padding-left: 20px;

  @media screen and (min-width: 320px) {
    font-size: calc(40px + 15 * ((100vw - 320px) / 880));
    line-height: calc(40px + 15 * ((100vw - 320px) / 880));
  }
  @media screen and (min-width: 1200px) {
    font-size: 55px;
    line-height: 55px;
  }
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
        {children}
      </InternalWrapper>
    </>
  );
};

export default Accordion;
