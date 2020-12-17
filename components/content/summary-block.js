import styled from 'styled-components'
import MainContent from '../global/main-content'

const Para = styled.div`
  margin: 20px 0;
  
  @media screen and (min-width: 320px) {
    margin: calc(20px + 26 * ((100vw - 320px) / 880)) 0;
  }
  @media screen and (min-width: 1200px) {
    margin: 46px 0;
  }  

  p {
    margin-left: auto;
    margin-right: auto;
    max-width: ${ props => props.maxWidth || '100%' };
  }
`

/**
 * <SummaryBlock>
 * 
 * A really simple paragraph, set off with big margins for landing pages. 
 * This could probably be used in a bunch of places.
 *
 * @param { object } bgColor - background color of element
 * @param { object } children - React child elements
 * @param { object } maxWidth - width of paragraph (default 100%;)
 * @param { object } textColor - color of text, duh
 */

const SummaryBlock = ({
  bgColor,
  children,
  maxWidth,
  textColor
}) => {
  return (
    <MainContent
      bgColor={ bgColor }
      textColor={ textColor }
    >
      <Para maxWidth={ maxWidth } >
        { children }
      </Para>
    </MainContent>
  )
}

export default SummaryBlock