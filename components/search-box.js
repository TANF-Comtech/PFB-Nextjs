import React from 'react';
import styled from 'styled-components';
import { SearchBox } from 'react-instantsearch-dom';

/**
 * <CustomSearchBox>
 *
 * Overrides Algolia Searchbox instance to match PFB styles
 *
 * @param { string } translation - placeholder text
 * @param { string } width - says how long the search box should be (default 100)
 *
 */

const CustomSearchBox = styled(SearchBox)`
  form {
    position: relative !important;
  }

  input[type='search'] {
    border: 1px solid ${(props) => props.theme.lightGray} !important;
    border-radius: 0 !important;
    font-family: ${(props) => props.theme.dharma} !important;
    font-size: 48px !important;
    font-weight: 400 !important;
    line-height: 50px !important;
    margin-bottom: 2vh !important;
    padding: 1vh 60px 1vh 15px !important;
    width: '100%' !important;

    @media (min-width: ${(props) => props.theme.sm}) {
      width: ${(props) => props.width || '100%'} !important;
    }
  }

  button[type='submit'] {
    display: none !important;
  }

  button[type='reset'] {
    position: absolute !important;
    right: 25px !important;
    top: 25px !important;
  }

  svg[class='ais-SearchBox-resetIcon'] {
    height: 20px !important;
    transform: scale(0.75) !important;
    width: 20px !important;
  }
`;

export default CustomSearchBox;
