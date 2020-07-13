import styled from "styled-components";

import LogoType from './logotype'
import Logo from './logo'

const LogoContainer = styled.div`
  display: block;
  min-width: 120px;
`;

const LogoTypeDisappear = styled(LogoType)`
  @media(max-height: 600px) {
    display: none;
  }
`

function LogoVertical({ 
  fillPeople,
  fillFor,
  fillBikes,   
  logoTypeWidth,
  logoWidth
 }) {
  return (
    <LogoContainer>
      <Logo logoWidth={ logoWidth } />
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
