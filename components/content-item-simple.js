import React, { useContext } from 'react';
import Link from 'next/link';
import styled, { ThemeContext } from 'styled-components';
import { PrismicRichText } from '@prismicio/react';

import { linkResolver } from '~/utils';

import Button from '~/components/button';

const Container = styled.section`
  align-items: flex-start !important;
  border-bottom: 1px solid rgb(216, 216, 216) !important;
  display: flex !important;
  flex-direction: column !important;
  margin-bottom: 25px !important;
  padding-bottom: 25px !important;

  @media (min-width: ${(props) => props.theme.sm}) {
    flex-direction: row !important;
  }

  &:last-child {
    border-bottom: none !important;
    padding-bottom: 0 !important;
  }
`;

const ContentContainer = styled.div`
  flex: 1 1 0px !important;
  margin: 4vh 0 !important;

  a,
  a:visited,
  a:active,
  a:focus,
  a:hover {
    text-decoration: none !important;
  }

  li {
    list-style-type: disc !important;
    padding-left: 10px !important;
  }
`;

const Title = styled.h3`
  color: ${(props) => props.theme.darkestGray} !important;
  font-size: 40px !important;
  line-height: 50px !important;
  margin: 0 !important;
`;

/**
 * <ContentItemSimple>
 *
 * Almost exactly like ContentItem but different font, colors and no imagery
 * Oy vey with the 10% different components...
 *
 * @param { string } path - tells us the URL to the item
 * @param { string } title - title that goes next to the icon
 * @param { string } text - content to be shown
 */
const ContentItemSimple = ({ path, title, text }) => {
  const themeProps = useContext(ThemeContext);

  return (
    <Container>
      <ContentContainer>
        {!path ? (
          <Title>{title}</Title>
        ) : (
          <Link href={linkResolver(path)}>
            <a>
              <Title>{title}</Title>
            </a>
          </Link>
        )}
        {text && <PrismicRichText field={text} />}
        {path && (
          <Button
            buttonBg={themeProps.darkGray}
            buttonBgHover={themeProps.darkestGray}
            buttonColor="white"
            buttonPadding="10px 25px"
            buttonTextTransform="uppercase"
            href={linkResolver(path)}
          >
            Explore
          </Button>
        )}
      </ContentContainer>
    </Container>
  );
};
export default ContentItemSimple;
