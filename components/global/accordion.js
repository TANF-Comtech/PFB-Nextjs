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

import React, { useState } from "react";
import styled from "styled-components";
import Arrow from "./Arrow";

const AccordionWrapper = styled.div`
  display: flex;
  background-color: white;
  border-top: 1px solid black;
  height: auto;
  padding: 2%;
  transition: all 0.3s ease-in-out;
`;

const InternalWrapper = styled.div`
  display: flex;
  width: 100%;
  max-height: ${(props) => (props.open ? "100px" : "0")};
  transition: all 0.3s ease-in-out;
  overflow: hidden;
`;

const ArrowButton = styled.div`
  border: none;
  margin: none;
  display: flex;
  background-color: white;
  height: min-content;
  transition: all 0.3s ease-in-out;
  transform: ${(props) => (props.setOpen ? `rotate(90deg)` : "")};
`;

const Title = styled.div`
  margin: none;
  font-size: 24px;
`;

const Accordion = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <AccordionWrapper>
        <ArrowButton padding="5px" onClick={handleClick} open={open}>
          <Arrow width={24} open={open} />
        </ArrowButton>
        <Title>{title}</Title>
      </AccordionWrapper>
      <InternalWrapper open={open}>{children}</InternalWrapper>
    </>
  );
};

export default Accordion;
