import React from 'react';
import styled from 'styled-components';

const BasicLabel = styled.label`
  cursor: pointer !important;
  font-size: 14px !important;
  line-height: 21px !important;
  margin-left: 8px !important;

  @media (min-width: ${(props) => props.theme.bm}) {
    font-size: calc(14px + 4 * ((100vw - 320px) / 880)) !important;
  }

  @media (min-width: ${(props) => props.theme.lg}) {
    font-size: 18px !important;
  }
`;

export default BasicLabel;
