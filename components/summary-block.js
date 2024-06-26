import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { linkResolver } from '~/utils';

import MainContent from '~/components/main-content';
import Button from '~/components/button';

const Para = styled.div`
  margin: 20px 0 !important;
  text-align: ${(props) => (props.buttons ? 'center' : 'left')} !important;

  @media screen and (min-width: 320px) {
    margin: calc(20px + 26 * ((100vw - 320px) / 880)) 0 !important;
  }
  @media screen and (min-width: 1200px) {
    margin: 46px 0 !important;
  }

  p {
    font-size: ${(props) => props.fontSize && props.fontSize + ' !important'};
    line-height: ${(props) => props.lineHeight && props.lineHeight + ' !important'};
    margin-left: auto !important;
    margin-right: auto !important;
    max-width: ${(props) => props.maxWidth || '100%'} !important;
  }

  li {
    list-style-type: disc;
    padding-left: 10px;
  }
`;

const Title = styled.h2`
  color: ${(props) => (props.textColor ? props.textColor : '#fff')} !important;
  margin: 4vh auto !important;
  max-width: ${(props) => props.maxWidth || '100%'} !important;
  text-align: center !important;
  text-transform: uppercase !important;
`;

const Buffer = styled.div`
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : '0')} !important;
`;

/**
 * <SummaryBlock>
 *
 * A really simple paragraph, set off with big margins for landing pages.
 * This could probably be used in a bunch of places.
 * NOTE - the main text block is left justified unless you have a button
 *  If button present, text is centered.
 *
 * @param { object } bgColor - background color of element
 * @param { object } buttons - group of buttons from payload
 * @param { object } children - React child elements
 * @param { object } fontSize - size of the font you want
 * @param { string } marginBottom - gives a little space if we need it
 * @param { string } maxWidth - width of paragraph (default 100%;)
 * @param { string } textColor - color of text, duh
 * @param { string } title - text that goes above the summary block (optional)
 */

const SummaryBlock = ({
  bgColor,
  buttons,
  children,
  fontSize,
  lineHeight,
  marginBottom,
  maxWidth,
  textColor,
  title,
}) => {
  const themeProps = useContext(ThemeContext);

  return (
    <Buffer marginBottom={marginBottom}>
      <MainContent bgColor={bgColor} textColor={textColor}>
        {title && (
          <Title maxWidth={maxWidth} textColor={textColor}>
            {title}
          </Title>
        )}
        <Para buttons={buttons} fontSize={fontSize} lineHeight={lineHeight} maxWidth={maxWidth}>
          {children}
        </Para>
        {buttons &&
          buttons.map((button) => {
            return (
              // @TODO add valid key prop from button
              // eslint-disable-next-line react/jsx-key
              <Button
                buttonAlign="center"
                buttonBg={themeProps.blue}
                buttonBorder="none"
                buttonColor="#fff"
                buttonFontSize="28px"
                buttonMargin="4vh"
                href={linkResolver(button.button_link)}
              >
                {button.button_text}
              </Button>
            );
          })}
      </MainContent>
    </Buffer>
  );
};

export default SummaryBlock;
