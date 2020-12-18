import styled from "styled-components";

import LogoType from './logotype'
import Logo from './logo'

const LogoContainer = styled.div`
  display: block;
  min-width: 100px;

  @media(min-width: ${props => props.theme.xs}) {
    min-width: 120px;
  }
`;

const LogoTypeDisappear = styled(LogoType)`
  @media(max-height: 600px) {
    display: none;
  }
`
/**
 * <LogoVertical>
 * 
 * LogoVertical arranges the <Logo> and <LogoType> components sequentially in a column
 * It has a lot of props because it can be adjusted in a lot of ways, so heads up!
 * 
 * @param {text} fillPeople - color for the 'People' words of the logo
 * @param {text} fillFor - color for the 'For' words of the logo
 * @param {text} fillBikes - color for the 'Bikes' words of the logo
 * @param {text} logoTypeWidth - how wide the <LogoType> component appears
 * @param {text} logoWidth - how tall and wide the <Logo> is (because it's square)
 * @param {text} logoViewboxPassdown - passes the viewbox size down to <Logo>
 * 
 */
function LogoVertical({ 
  fillPeople,
  fillFor,
  fillBikes,   
  logoTypeWidth,
  logoWidth,
  logoViewboxPassdown
 }) {
  return (
    <LogoContainer>
      <Logo 
        logoWidth={ logoWidth } 
        logoViewbox={ logoViewboxPassdown }
      />
      <LogoTypeDisappear
        fillPeople={ fillPeople }
        fillFor={ fillFor }
        fillBikes={ fillBikes }
        logoTypeWidth={ logoTypeWidth } 
      />
    </LogoContainer>
  );
}

export default LogoVertical;
