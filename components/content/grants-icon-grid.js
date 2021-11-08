import styled from 'styled-components'

import MainContent from '../global/main-content'
import GridWide from '../global/grid-wide'

import BatchIcon from '../../public/sponsor-logos/batch-logo.svg'
import CannondaleIcon from '../../public/sponsor-logos/cannondale-logo.svg'
import GiantIcon from '../../public/sponsor-logos/giant-logo.svg'
import NinerIcon from '../../public/sponsor-logos/niner-logo.svg'
import ShimanoIcon from '../../public/sponsor-logos/shimano-logo.svg'
import TrailTrustIcon from '../../public/sponsor-logos/trail-trust.jpeg'
import TrekIcon from '../../public/sponsor-logos/trek-logo.svg'
import VaastIcon from '../../public/sponsor-logos/vaast-logo.svg'
import TernIcon from '../../public/sponsor-logos/tern-logo.png'

const Box = styled.div`
  align-items: center;
  background-color: #fff;
  display: flex;
  justify-content: center;
  padding: 50px 25px;
`

const Logo = styled.img`
  max-width: 250px;
`

const Para = styled.p`
  text-align: center;
`

const GrantsIconGrid = () => {
  return (
    <MainContent maxWidth="800px">
      <Para>
        The PeopleForBikes Community Grant Program is funded by our partners in the bicycle industry. Thanks to the following participating members and their employees for making these awards possible:
      </Para>
      <GridWide
        gridGap="1px"
        gridGapColor="rgb(225,225,225)"
      >
        <Box>
          <Logo 
            alt="Batch Bicycles Logo"
            src={ BatchIcon }
          />
        </Box>
        <Box>
          <Logo 
            alt="Cannondale Bicycles Logo"
            src={ CannondaleIcon }
          />
        </Box>
        <Box>
          <Logo 
            alt="Giant Bicycles Logo"
            src={ GiantIcon }
          />
        </Box>
        <Box>
          <Logo 
            alt="Niner Bicycles Logo"
            src={ NinerIcon }
          />
        </Box>
        <Box>
          <Logo 
            alt="Shimano Logo"
            src={ ShimanoIcon }
          />
        </Box>
        <Box>
          <Logo 
            alt="Tern Logo"
            src={ TernIcon }
          />
        </Box>
        <Box>
          <Logo 
            alt="Trail Trust Icon"
            src={ TrailTrustIcon }
          />
        </Box>
                
        <Box>
          <Logo 
            alt="Trek Bicycles Logo"
            src={ TrekIcon }
          />
        </Box>
        <Box>
          <Logo 
            alt="Vaast Logo"
            src={ VaastIcon }
          />
        </Box>
      </GridWide>
    </MainContent>
  )
}

export default GrantsIconGrid