import styled from 'styled-components'
import MainContent from '../global/main-content'

const Para = styled.p`
  margin: 20px 0;
  
  @media screen and (min-width: 320px) {
    margin: calc(20px + 26 * ((100vw - 320px) / 880)) 0;
  }
  @media screen and (min-width: 1200px) {
    margin: 46px 0;
  }  
`

/**
 * <SummaryBlock>
 * 
 * A really simple paragraph, set off with big margins for landing pages. 
 * This could probably be used in a bunch of places.
 *
 * @param { object } children - React child elements
 */

const SummaryBlock = ({
  bgColor,
  children,
  textColor
}) => {
  return (
    <MainContent
      bgColor={ bgColor }
      textColor={ textColor }
    >
      <Para>{ children }</Para>
    </MainContent>
  )
}

export default SummaryBlock