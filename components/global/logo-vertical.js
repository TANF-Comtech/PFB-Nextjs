import styled from "styled-components";

import LogoType from './logotype'
import Logo from './logo'

const LogoContainer = styled.div`
  display: block;
  width: 120px;
`;

function LogoVertical({ logoWidth, logoTypeWidth }) {
  return (
    <LogoContainer>
      <Logo logoWidth={ logoWidth } />
      <LogoType logoTypeWidth={ logoTypeWidth } />
    </LogoContainer>
  );
}

export default LogoVertical;
