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

import React, { useState, useRef } from "react";
import styled from "styled-components";
import Arrow from "./Arrow";
import useOnClickOutside from "../hooks/onClickUseOutside";

const Accordion = ({ title, children }) => {
  const [active, setActive] = useState("");
  const [height, setHeight] = useState("0px");
  const [rotation, setRotation] = useState("accordion__icon");

  const content = useRef();
  const sensitive = useRef();

  const AccordionContainer = styled.div`
    display: flex;
    justify-content: center;
    border-top: 1px solid black;
  `;

  const AccordionButton = styled.button`
    background-color: white;
    border: none;
  `;

  const toggleAccordion = () => {
    setActive(active === "" ? "active" : "");
    setHeight(
      active === "active" ? "0px" : `${content.current.scrollHeight}px`
    );
    setRotation(
      active === "active" ? "accordion__icon" : "accordion__icon rotate"
    );
  };

  useOnClickOutside(sensitive, () => {
    setActive("");
    setHeight("0px");
    setRotation("accordion__icon");
  });

  return (
    <AccordionContainer>
      <div className="accordion__section" ref={sensitive}>
        <AccordionButton
          className={`accordion ${active}`}
          onClick={toggleAccordion}
        >
          <Arrow width={24} className={`${rotation}`} />
        </AccordionButton>
        <p className="accordion__title">{title}</p>

        <div
          ref={content}
          style={{ maxHeight: `${height}` }}
          className="accordion__content"
        >
          <div className="accordion__text">{children}</div>
        </div>
      </div>
    </AccordionContainer>
  );
};

export default Accordion;
