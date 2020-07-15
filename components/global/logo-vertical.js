import styled from "styled-components";

import LogoType from './logotype'
import Logo from './logo'

const LogoContainer = styled.div`
  display: block;
  width: 120px;
`;

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
      <LogoType 
        fillPeople={ fillPeople }
        fillFor={ fillFor }
        fillBikes={ fillBikes }
        logoTypeWidth={ logoTypeWidth } 
      />
    </LogoContainer>
  );
}

export default LogoVertical;
