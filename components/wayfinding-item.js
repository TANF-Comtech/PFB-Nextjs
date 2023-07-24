import React, { useCallback } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useSetAtom } from 'jotai';

import { ownersManualModalAtom } from '~/atoms';
import { linkResolver } from '~/utils';

import BlueArrowWhiteBlock from '~/public/blue-arrow-white-block.svg';

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

const Icon = styled.img`
  flex-basis: 50px !important;
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
  if (path._meta?.uid === 'owners-manual') {
    return <OwnersManual bgColor={bgColor} title={title} text={text} textColor={textColor} />;
  }

  return (
    <Container bgColor={bgColor}>
      {path.__typename === '_ExternalLink' ? (
        <ContentContainer>
          <a href={linkResolver(path)}>
            <Title textColor={textColor}>{title}</Title>
          </a>
          <Text>{text}</Text>
        </ContentContainer>
      ) : (
        <ContentContainer>
          <Link href={linkResolver(path)} passHref>
            <a>
              <Title textColor={textColor}>{title}</Title>
            </a>
          </Link>
          <Text>{text}</Text>
        </ContentContainer>
      )}

      <Link href={linkResolver(path)} passHref>
        <a>
          <Icon src={BlueArrowWhiteBlock} alt="Blue Arrow" />
        </a>
      </Link>
    </Container>
  );
};

export default WayfindingItem;

const OwnersManual = ({ bgColor, title, text, textColor }) => {
  const setIsOwnersManualModalOpen = useSetAtom(ownersManualModalAtom);

  const handleClick = useCallback(() => {
    setIsOwnersManualModalOpen(true);
  }, [setIsOwnersManualModalOpen]);

  return (
    <>
      <Container bgColor={bgColor}>
        <ContentContainer>
          <button onClick={handleClick}>
            <Title textColor={textColor}>{title}</Title>
          </button>
          <Text>{text}</Text>
        </ContentContainer>
        <button onClick={handleClick}>
          <Icon src={BlueArrowWhiteBlock} alt="Blue Arrow" />
        </button>
      </Container>
    </>
  );
};
