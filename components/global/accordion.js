import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import RedArrow from '../../public/red-arrow-triangle.svg';
import WhiteArrow from '../../public/white-arrow-triangle.svg';

const AccordionWrapper = styled.div`
  align-items: center;
  background-color: ${(props) => (props.darkMode === true ? props.theme.midnightBlue : '#fff')};
  border-top: ${(props) => (props.darkMode === true ? '1px solid #fff' : '1px solid #222')};
  cursor: pointer;
  display: flex;
  height: auto;
  padding: ${(props) => (props.smallMode === true ? '3vh 0' : '4vh 0')};
  transition: 0.5s ease-in-out;

  &:first-child {
    border-top: none;
  }
`;

const InternalWrapper = styled.div`
  max-height: ${(props) => (props.open ? 'auto' : '0')};
  opacity: ${(props) => (props.open ? '1' : '0')};
  overflow: hidden;
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`;

const ArrowButton = styled.img`
  border: none;
  height: min-content;
  margin: none;
  transition: all 0.25s ease-in-out;
  transform: ${(props) => (props.open ? 'rotate(90deg)' : 'rotate(0deg)')};
  transform-origin: 40% 40%;
  width: ${(props) => (props.smallMode === true ? '10px' : '17px')};
`;

const Title = styled.h2`
  color: ${(props) => (props.darkMode === true ? props.theme.blueBright : props.theme.black)};
  font-family: ${(props) =>
    props.smallMode === true ? props.theme.montserrat : props.theme.dharma};
  font-size: ${(props) => (props.smallMode === true ? '18px' : '40px')};
  font-weight: ${(props) => (props.smallMode === true ? '700' : '400')};
  line-height: ${(props) => (props.smallMode === true ? '18px' : '40px')};
  margin: 0;
  padding-left: 20px;
  text-transform: ${(props) => (props.smallMode === true ? 'uppercase' : 'inherit')};

  @media screen and (min-width: 320px) {
    font-size: ${(props) =>
      props.smallMode === true ? '20px' : 'calc(40px + 15 * ((100vw - 320px) / 880))'};
    line-height: ${(props) =>
      props.smallMode === true ? '20px' : 'calc(40px + 15 * ((100vw - 320px) / 880))'};
  }
  @media screen and (min-width: 1200px) {
    font-size: ${(props) => (props.smallMode === true ? '22px' : '55px')};
    line-height: ${(props) => (props.smallMode === true ? '22px' : '55px')};
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
