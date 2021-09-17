import { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components'

import { linkResolver } from '../../lib/utils'

import MainContent from '../global/main-content'
import Button from '../primitives/button'

const Para = styled.div`
  margin: 20px 0;
  text-align: center;
  
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
  buttonLink,
  buttonText,
  children,
  maxWidth,
  textColor
}) => {
  const themeProps = useContext(ThemeContext)

  return (
    <MainContent
      bgColor={ bgColor }
      textColor={ textColor }
    >
      <Para maxWidth={ maxWidth } >
        { children }
      </Para>
      { buttonLink && buttonText &&
        <Button
          buttonAlign="center"
          buttonBg={ themeProps.blue }
          buttonColor="#fff"
          buttonFontSize="24px"
          buttonMargin="4vh"
          href={ linkResolver(buttonLink) }
        >
          { buttonText }
        </Button>
      }
    </MainContent>
  )
}

export default SummaryBlock