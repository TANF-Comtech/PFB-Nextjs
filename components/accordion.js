import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import RedArrow from '~/public/red-arrow-triangle.svg';
import WhiteArrow from '~/public/white-arrow-triangle.svg';

const AccordionWrapper = styled.div`
  align-items: center !important;
  background-color: ${(props) =>
    props.darkMode === true ? props.theme.midnightBlue : '#fff'} !important;
  border-top: ${(props) =>
    props.darkMode === true ? '1px solid #fff' : '1px solid #222'} !important;
  cursor: pointer !important;
  display: flex !important;
  height: auto !important;
  padding: ${(props) => (props.smallMode === true ? '3vh 0' : '4vh 0')} !important;
  transition: 0.5s ease-in-out !important;

  &:first-child {
    border-top: none !important;
  }
`;

const InternalWrapper = styled.div`
  max-height: ${(props) => (props.open ? 'auto' : '0')} !important;
  opacity: ${(props) => (props.open ? '1' : '0')} !important;
  overflow: hidden !important;
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1) 0ms !important;
`;

const ArrowButton = styled.img`
  border: none !important;
  height: min-content !important;
  margin: none !important;
  transition: all 0.25s ease-in-out !important;
  transform: ${(props) => (props.open ? 'rotate(90deg)' : 'rotate(0deg)')} !important;
  transform-origin: 40% 40% !important;
  width: ${(props) => (props.smallMode === true ? '10px' : '17px')} !important;
`;

const Title = styled.h2`
  color: ${(props) =>
    props.darkMode === true ? props.theme.blueBright : props.theme.black} !important;
  font-family: ${(props) =>
    props.smallMode === true ? props.theme.montserrat : props.theme.dharma} !important;
  font-size: ${(props) => (props.smallMode === true ? '18px' : '40px')} !important;
  font-weight: ${(props) => (props.smallMode === true ? '700' : '400')} !important;
  line-height: ${(props) => (props.smallMode === true ? '18px' : '40px')} !important;
  margin: 0 !important;
  padding-left: 20px !important;
  text-transform: ${(props) => (props.smallMode === true ? 'uppercase' : 'inherit')} !important;

  @media screen and (min-width: 320px) {
    font-size: ${(props) =>
      props.smallMode === true ? '20px' : 'calc(40px + 15 * ((100vw - 320px) / 880))'} !important;
    line-height: ${(props) =>
      props.smallMode === true ? '20px' : 'calc(40px + 15 * ((100vw - 320px) / 880))'} !important;
  }
  @media screen and (min-width: 1200px) {
    font-size: ${(props) => (props.smallMode === true ? '22px' : '55px')} !important;
    line-height: ${(props) => (props.smallMode === true ? '22px' : '55px')} !important;
  }
`;

/**
 * <Accordion>
 *
 * Pass in the prop "title" to insert the text that you want to appear next to the arrow button
 * Within the element, pass in the text that you want to appear after the accordion has been activated.
 *
 * @param {bool} darkMode - true for dark, false for normal
 * @param {bool} smallMode - true for small, false for normal
 * @param {string} title - pass in the title of the accordion as a prop
 * @param {obj} children - accordion content should be passed in using the children object
 */

const Accordion = ({ darkMode = false, smallMode = false, title, children }) => {
  const accordionContent = useRef(null);
  const [accordionHeight, setAccordionHeight] = useState(0);
  const [open, setOpen] = useState(false);

  // Get accordion element height on page load
  useEffect(() => {
    setAccordionHeight(accordionContent.current.clientHeight);
  }, []);

  // Toggle accordion state when clicked
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <AccordionWrapper darkMode={darkMode} onClick={handleClick} open={open} smallMode={smallMode}>
        <ArrowButton
          alt="Accordion Arrow - click to reveal content"
          open={open}
          smallMode={smallMode}
          src={darkMode === true ? WhiteArrow : RedArrow}
        />
        <Title darkMode={darkMode} smallMode={smallMode}>
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
