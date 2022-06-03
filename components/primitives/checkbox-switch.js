import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { randomID } from '../../lib/utils';

import BasicInput from './input';
import BasicLabel from './label';

const Container = styled.div`
  align-items: center;
  display: flex;
  margin: 1.5vh 0;
`;

const CheckboxInput = styled(BasicInput).attrs({
  type: 'checkbox',
})`
  display: inline;
`;

/**
 * <CheckboxSwitch>
 *
 * A checkbox component for forms that can appear like a checkbox or switch
 * A container holds the <input> and <label> together in a flexbox for alignment
 * There is a LOT of style and pseudo classes required to pull this off above
 * Comments are mostly in the styled-components above
 *
 * @param {string} checkboxLabel - words that appear next to the input
 * @param {string} checked - value for the input
 * @param {string} className - should just be 'switch' if you want to see a switch
 * @param {string} disabled - makes the input visible but invalid
 */
const CheckboxSwitch = ({ checkboxLabel, checked, className, disabled }) => {
  // Check to make sure this is rendered
  const [rendered, setRendered] = useState(false);

  // useEffect() is similar to componentDidMount
  // so when the component gets mounted, we set it true
  useEffect(() => {
    setRendered(true),
      () => {
        setRendered(false);
      };
  });

  // Now we conditionally render to avoid SSR issues
  if (rendered) {
    return (
      <>
        <Container>
          <CheckboxInput
            checked={checked}
            className={className}
            disabled={disabled}
            id={randomID(10000000)}
            type="checkbox"
          />
          <BasicLabel htmlFor={randomID(10000000)}>{checkboxLabel}</BasicLabel>
        </Container>
      </>
    );
  }

  // If rendering fails
  else {
    return <p>Still loading...</p>;
  }
};

export default CheckboxSwitch;
