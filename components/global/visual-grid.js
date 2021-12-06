import { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'

import { linkResolver } from '../../lib/utils'
import evenOrOdd from '../../lib/utils/evenOrOdd'

import MainContent from './main-content'
import GridWide from './grid-wide'
import Button from '../../components/primitives/button'

const Box = styled.div`
  align-items: center;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 50px 25px;
`

const GridImage = styled.img`
  max-width: 250px;
`

const SectionTitle = styled.h3`
  font-size: 28px;
  font-weight: 300;
  line-height: 38px;
  margin: 6vh auto;
  text-align: center;
  
`

const Para = styled.p`
  margin: 4vh auto;
`

/**
 * <VisualGrid>
 * 
 * Component that takes visuals + text and puts them into a grid
 * 
 * @param { array } payload - group of the img/text combos
 * @param { string } title - visual grid heading
 * 
 */
const VisualGrid = ({
  payload,
  title
}) => {
  const themeProps = useContext(ThemeContext)

  console.log( payload )

  return (
    <MainContent maxWidth="800px">
      { title &&
        <SectionTitle>
          { title }
        </SectionTitle>      
      }
      { payload && 
        <GridWide
          gridGap="1px"
          gridGapColor="rgb(225,225,225)"
        >    
          { payload.map( (item) => {
            return(
              <Box>
                { 
                  item.graphic && 
                  <GridImage 
                    alt={ item.graphic.alt }
                    src={ item.graphic.url }
                  />
                }
                {
                  item.button_link &&
                  <Button
                    buttonAlign="center"
                    buttonBg={ themeProps.darkGray }
                    buttonBorder="none"
                    buttonColor="#fff"
                    buttonFontSize="14px"
                    buttonMargin="3vh"
                    href={ linkResolver(item.button_link) }
                  >
                    { item.button_text ? item.button_text : 'View' }
                  </Button>
                }
                {
                  item.label &&
                  <Para>
                    { item.label }
                  </Para>
                }
              </Box>
            )
          } ) }
          { evenOrOdd( payload.length ) === 'odd' && <Box /> }
        </GridWide> 
      }
    </MainContent>
  )
}

export default VisualGrid