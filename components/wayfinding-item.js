import React, { useCallback } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useSetAtom } from 'jotai';

import { ownersManualModalAtom } from '~/atoms';
import { linkResolver } from '~/utils';

import BlueArrowWhiteBlock from '~/public/blue-arrow-white-block.svg';

const Container = styled.section`
  align-items: center;
  background-color: ${(props) => props.bgColor || props.theme.midnightBlue};
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 3vh 0;
  padding: 4vh 2vw;
  text-decoration: none;

  @media (min-width: ${(props) => props.theme.sm}) {
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    margin: 4vh 0;
  }

  &:hover {
    text-decoration: none;
  }
`;

const Icon = styled.img`
  flex-basis: 50px;
`;

const ContentContainer = styled.div`
  margin: 0 0 2vh 0;
  text-align: center;
  width: calc(100% - 50px);

  @media (min-width: ${(props) => props.theme.sm}) {
    margin: 0 2vw 0 0;
    text-align: left;
  }

  a,
  a:focus,
  a:hover,
  a:visited {
    color: #fff;
    text-decoration: none;
  }
`;

const Title = styled.h3`
  color: ${(props) => props.textColor || '#fff'};
  font-weight: 700;
  margin: 0;
  text-transform: uppercase;
`;

const Text = styled.p`
  color: white;
  margin-bottom: 0;
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
