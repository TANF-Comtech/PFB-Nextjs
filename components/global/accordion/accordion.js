import React, { useState, useRef } from "react";
import "./accordion.css";

import Arrow from "./Arrow";
import useOnClickOutside from "./onClickUseOUtside";

const Accordion = ({ title, children }) => {
  const [active, setActive] = useState("");
  const [height, setHeight] = useState("0px");
  const [rotation, setRotation] = useState("accordion__icon");

  const content = useRef();
  const sensitive = useRef();

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
    <div className="accordion__section" ref={sensitive}>
      <button className={`accordion ${active}`} onClick={toggleAccordion}>
        <p className="accordion__title">{title}</p>
        <Arrow width={10} fill={"#777"} className={`${rotation}`} />
      </button>
      <div
        ref={content}
        style={{ maxHeight: `${height}` }}
        className="accordion__content"
      >
        <div className="accordion__text">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
