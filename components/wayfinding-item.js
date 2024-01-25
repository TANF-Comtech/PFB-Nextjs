import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { linkResolver } from '~/utils';

const Container = styled.section`
  align-items: center !important;
  background-color: ${(props) => props.bgColor || props.theme.midnightBlue} !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  margin: 3vh 0 !important;
  padding: 4vh 2vw !important;
  text-decoration: none !important;

  @media (min-width: ${(props) => props.theme.sm}) {
    align-items: center !important;
    flex-direction: row !important;
    justify-content: space-between !important;
    margin: 4vh 0 !important;
  }

  &:hover {
    text-decoration: none !important;
  }
`;

const ContentContainer = styled.div`
  margin: 0 0 2vh 0 !important;
  text-align: center !important;
  width: calc(100% - 50px) !important;

  @media (min-width: ${(props) => props.theme.sm}) {
    margin: 0 2vw 0 0 !important;
    text-align: left !important;
  }

  a,
  a:focus,
  a:hover,
  a:visited {
    color: #fff !important;
    text-decoration: none !important;
  }
`;

const Title = styled.h3`
  color: ${(props) => props.textColor || '#fff'} !important;
  font-weight: 700 !important;
  margin: 0 !important;
  text-transform: uppercase !important;
`;

const Text = styled.p`
  color: white !important;
  margin-bottom: 0 !important;
`;

/**
 * <WayfindingItem>
 *
 * This creates an red background with a title and text next to it.
 *
 * @param { string } bgColor - background of the program
 * @param { string } path - where the title goes
 * @param { string } title - title that goes next to the icon
 * @param { string } text - content to be shown
 * @param { string } textColor - duh
 */
const WayfindingItem = ({ bgColor, path, title, text, textColor }) => {
  let item;

  switch (path.__typename) {
    case '_ExternalLink':
      item = (
        <>
          <a href={linkResolver(path)}>
            <Title textColor="#fff">{title}</Title>
          </a>
          <Text>{text}</Text>
        </>
      );
      break;
    case 'Owners_manual':
      item = (
        <>
          <Link href="/owners-manual">
            <Title textColor="#fff">{title}</Title>
          </Link>
          <Text>{text}</Text>
        </>
      );
      break;
    default:
      item = (
        <>
          <Link href={linkResolver(path)}>
            <Title textColor="#fff">{title}</Title>
          </Link>
          <Text>{text}</Text>
        </>
      );
  }

  return (
    <Container bgColor={bgColor}>
      <ContentContainer>{item}</ContentContainer>
    </Container>
  );
};

export default WayfindingItem;
