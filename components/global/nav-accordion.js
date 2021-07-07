import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import controlIcon from "../../public/thin-x.svg"

const AccordionWrapper = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  height: auto;
  justify-content: space-between;
  transition: 0.5s ease-in-out;
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
  transform: ${props => props.open ? "rotate(180deg)" : "rotate(45deg)"}; 
  transform-origin: 40% 40%;
`;

const Title = styled.h2`
  cursor: pointer;
  font-size: 46px;
  font-family: ${ props => props.theme.dharma };
  font-weight: 300;
  line-height: 42px;
  margin: 0;
  padding: 1vh 0; 
`;

/**
 * <NavAccordion>
 * 
 * Pass in the prop "title" to insert the text that you want to appear next to the arrow button
 * Within the element, pass in the text that you want to appear after the accordion has been activated.
 * 
 * @param {string} title - pass in the title of the accordion as a prop
 * @param {obj} children - accordion content should be passed in using the children object
 */

const NavAccordion = ({ title, children }) => {
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
      <AccordionWrapper onClick={ handleClick } open={ open }>
        <Title>
          {title}
        </Title>
        <ArrowButton
          alt="Accordion Control - click to reveal content"
          open={ open }
          src={ controlIcon }
        />
      </AccordionWrapper>
      <InternalWrapper open={ open } ref={ accordionContent }>
        { children }
      </InternalWrapper>
    </>
  );
};

export default NavAccordion;
