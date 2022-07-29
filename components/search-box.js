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
    position: relative;
  }

  input[type='search'] {
    border: 1px solid ${(props) => props.theme.lightGray};
    border-radius: 0;
    font-family: ${(props) => props.theme.dharma};
    font-size: 48px;
    font-weight: 400;
    line-height: 50px;
    margin-bottom: 2vh;
    padding: 1vh 60px 1vh 15px;
    width: '100%';

    @media (min-width: ${(props) => props.theme.sm}) {
      width: ${(props) => props.width || '100%'};
    }
  }

  button[type='submit'] {
    display: none;
  }

  button[type='reset'] {
    position: absolute;
    right: 25px;
    top: 25px;
  }

  svg[class='ais-SearchBox-resetIcon'] {
    height: 20px;
    transform: scale(0.75);
    width: 20px;
  }
`;

export default CustomSearchBox;
