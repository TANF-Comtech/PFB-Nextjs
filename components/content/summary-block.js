import { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components'

import { linkResolver } from '../../lib/utils'

import MainContent from '../global/main-content'
import Button from '../primitives/button'

const Para = styled.div`
  margin: 20px 0;
  text-align: ${ props => props.buttonLink === undefined ? 'left' : 'center' };
  
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
 * NOTE - the main text block is left justified unless you have a button
 *  If button present, text is centered.
 *
 * @param { object } bgColor - background color of element
 * @param { object } buttonLink - destination for button (optional)
 * @param { string } buttonText - text for button (optional)
 * @param { object } children - React child elements
 * @param { string } maxWidth - width of paragraph (default 100%;)
 * @param { string } textColor - color of text, duh
 * @param { string } title - text that goes above the summary block (optional)
 */

const SummaryBlock = ({
  bgColor,
  buttonLink,
  buttonText,
  children,
  maxWidth,
  textColor,
  title
}) => {
  const themeProps = useContext(ThemeContext)

  return (
    <MainContent
      bgColor={ bgColor }
      textColor={ textColor }
    >
      { title && 
        <h2>{ title }</h2>
      }
      <Para 
        buttonLink={ buttonLink }
        maxWidth={ maxWidth } 
      >
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