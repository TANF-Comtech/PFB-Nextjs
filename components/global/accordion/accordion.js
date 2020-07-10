import React from "react";
import Wrapper from "../wrapper";
import RightArrow from "../../../public/accordionArrow.svg";

const ArrowButton = ({ onClick, accordionIsOpen }) => (
  <>
    <div
      className={`accordionClosed ${accordionIsOpen ? "accordionOpen" : ""}`}
      onClick={onClick}
    >
      <RightArrow accordionIsOpen={accordionIsOpen} />
    </div>
  </>
);

const AccordionContainer = ({ accordionisOpen }) => (
  <div className={`containerHide ${accordionisOpen ? "containerReveal" : ""}`}>
    <Wrapper />
  </div>
);

export default function Accordion() {
  /****
   * The hook that's going to be used to handle the state change
   ****/
  const [accordionIsOpen, setAccordionIsOpen] = React.useState(false);
  /****
   * Toggle the button
   ****/
  const accordionToggleDrawer = () => setAccordionIsOpen(!accordionisOpen);

  return (
    <>
      <ArrowButton
        onClick={accordionToggleDrawer}
        accordionIsOpen={accordionIsOpen}
      />
      <AccordionContainer accordionisOpen={accordionIsOpen} />
    </>
  );
}
