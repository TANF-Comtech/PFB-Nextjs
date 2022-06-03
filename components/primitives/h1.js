import React from 'react';
import styled from 'styled-components';

const Heading = styled.h1`
  margin: 4vh 0;
  padding: 0;
  text-transform: uppercase;

  @media (min-width: ${(props) => props.theme.lg}) {
    padding: 0;
  }
`;

/**
 * <Heading1>
 *
 * About as simple as a component could be
 * Heading1 is the just the basic heading on the top of most pages
 * It's inheriting most of it's style from /components/styles/global-css.js
 *
 * @param {object} children - inherited nested components, core React idea
 *
 */
const Heading1 = ({ children }) => {
  return (
    <>
      <Heading>{children}</Heading>
    </>
  );
};

export default Heading1;
