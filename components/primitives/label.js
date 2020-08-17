import styled from "styled-components"

const BasicLabel = styled.label`
  cursor: pointer;
  font-size: 14px;
  line-height: 21px;
  margin-left: 8px;

  @media (min-width: ${props => props.theme.bm}) {
    font-size: calc(14px + 4 * ((100vw - 320px) / 880));
  }

  @media (min-width: ${props => props.theme.lg}) {
    font-size: 18px;
  }
`

export default BasicLabel