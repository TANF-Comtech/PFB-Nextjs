import styled from 'styled-components'

import MainContent from './main-content'
import GridWide from './grid-wide'

const Box = styled.div`
  align-items: center;
  background-color: #fff;
  display: flex;
  justify-content: center;
  padding: 50px 25px;
`

const GridImage = styled.img`
  max-width: 250px;
`

const Para = styled.p`
  text-align: center;
`

const VisualGrid = ({
  payload,
  title
}) => {
  return (
    <MainContent maxWidth="800px">
      <Para>
        The PeopleForBikes Community Grant Program is funded by our partners in the bicycle industry. Thanks to the following participating members and their employees for making these awards possible:
      </Para>
      <GridWide
        gridGap="1px"
        gridGapColor="rgb(225,225,225)"
      >
        {/* <Box>
          <GridImage 
            alt="Batch Bicycles GridImage"
            src={ BatchIcon }
          />
        </Box>
        <Box>
          <GridImage 
            alt="Cannondale Bicycles GridImage"
            src={ CannondaleIcon }
          />
        </Box>
        <Box>
          <GridImage 
            alt="Giant Bicycles GridImage"
            src={ GiantIcon }
          />
        </Box>
        <Box>
          <GridImage 
            alt="Niner Bicycles GridImage"
            src={ NinerIcon }
          />
        </Box>
        <Box>
          <GridImage 
            alt="Shimano GridImage"
            src={ ShimanoIcon }
          />
        </Box>
        <Box>
          <GridImage 
            alt="Trek Bicycles GridImage"
            src={ TrekIcon }
          />
        </Box>
        <Box>
          <GridImage 
            alt="Vaast GridImage"
            src={ VaastIcon }
          />
        </Box>
        <Box>
          <GridImage 
            alt="Tern GridImage"
            src={ TernIcon }
          />
        </Box> */}
      </GridWide>
    </MainContent>
  )
}

export default VisualGrid