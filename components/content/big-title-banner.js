import styled from 'styled-components';
import MainContent from '../global/main-content';

const Background = styled.header`
  background-color: ${(props) => props.bgColor || props.theme.midnightBlue};
  color: ${(props) => props.color || 'white'};

  h1 {
    color: ${(props) => props.color || 'white'};
    text-transform: uppercase;
  }
`;

/**
 * <BigTitleBanner>
 *
 * Give those pages some pop! Put a big title banner at the top.
 *
 * @param { string } bgColor - background color for element (default: midnight blue)
 * @param { string } color - text color (default: white)
 * @param { object } children - React child elements
 */

const BigTitleBanner = ({ bgColor, color, children }) => {
  return (
    <Background bgColor={bgColor} color={color}>
      <MainContent>{children}</MainContent>
    </Background>
  );
};

export default BigTitleBanner;
