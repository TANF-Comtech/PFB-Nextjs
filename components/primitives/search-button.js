import React from 'react';
import styled from 'styled-components';

const Watchglass = styled.svg`
  cursor: pointer;
  height: ${(props) => props.size};
  fill: ${(props) => props.color};
  width: ${(props) => props.size};
`;

/**
 * <SearchButton>
 *
 * Just drops a search button into the mix wherever you need it
 *
 * @param { string } color - fill of SVG watchglass
 * @param { string } size - how big the SVG should appear
 *
 */
const SearchButton = ({ color = '#111', size = '32px' }) => {
  return (
    <>
      <Watchglass
        color={color}
        height={size}
        width={size}
        viewBox="1 -1 100 100"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M72.1,64.2c4.8-6,7.4-13.5,7.4-21.3c0-19-15.5-34.4-34.5-34.4C26,8.6,10.5,24,10.5,43S26,77.4,44.9,77.4  c7.6,0,15.1-2.6,21.3-7.4l20.7,20.7l5.9-5.9L72.1,64.2z M44.9,69.2c-14.4,0-26.1-11.7-26.1-26.1C18.8,28.7,30.5,17,44.9,17  C59.3,17,71,28.7,71,43.1C71,57.5,59.3,69.2,44.9,69.2z" />
      </Watchglass>
    </>
  );
};

export default SearchButton;
