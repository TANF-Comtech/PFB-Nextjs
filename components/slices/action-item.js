import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { RichText } from 'prismic-reactjs';

import { linkResolver } from '../../lib/utils';

const Container = styled.section`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 0 4vh 0;
  text-decoration: none;

  @media (min-width: ${(props) => props.theme.sm}) {
    align-items: flex-start;
    flex-direction: row;
    justify-content: flex-start;
  }

  &:hover {
    text-decoration: none;
  }
`;

const Icon = styled.img`
  flex-basis: 50px;
`;

const ContentContainer = styled.div`
  margin: 2vh 0 0 0;

  @media (min-width: ${(props) => props.theme.sm}) {
    margin: 0 0 0 2vw;
  }

  a,
  a:focus,
  a:hover,
  a:visited {
    color: ${(props) => props.theme.red};
    text-decoration: none;
  }
`;

const Title = styled.h2`
  color: ${(props) => props.theme.red};
  font-weight: 700;
  margin-bottom: 1vh;
  text-align: center;

  @media (min-width: ${(props) => props.theme.sm}) {
    text-align: left;
  }
`;

const Text = styled.p`
  margin-bottom: 0;
  text-align: center;

  @media (min-width: ${(props) => props.theme.sm}) {
    text-align: left;
  }
`;

/**
 * <ActionItem>
 *
 * This creates an icon with a title and text next to it.
 *
 * @param { array } extendedText - content to be shown
 * @param { string } icon - img icon source string
 * @param { string } path - where the title goes
 * @param { string } title - title that goes next to the icon
 * @param { string } text - content to be shown
 */
const ActionItem = ({ extendedText = null, icon, path, title, text }) => {
  return (
    <Container>
      {icon === 'Action (exclamation icon)' && (
        <Icon src="/icons/action.svg" alt="Exclamation Icon" />
      )}
      {icon === 'Chart (research icon)' && <Icon src="/icons/chart.svg" alt="Research Icon" />}
      {icon === 'E-bikes (battery icon)' && <Icon src="/icons/battery.svg" alt="Battery Icon" />}
      {icon === 'Event (calendar icon)' && <Icon src="/icons/event.svg" alt="Event Icon" />}
      {icon === 'Green (leaves icon)' && <Icon src="/icons/green.svg" alt="Leaves Icon" />}
      {icon === 'Group (people icon)' && <Icon src="/icons/people.svg" alt="People Icon" />}
      {icon === 'Join (link icon)' && <Icon src="/icons/link.svg" alt="Link Icon" />}
      {icon === 'Legal (gov icon)' && <Icon src="/icons/gov.svg" alt="Gov Icon" />}
      {icon === 'Podcast (mic icon)' && <Icon src="/icons/mic.svg" alt="Mic Icon" />}
      {icon === 'Retailers (cart icon)' && <Icon src="/icons/cart.svg" alt="Cart Icon" />}
      {icon === 'Register (check icon)' && <Icon src="/icons/check.svg" alt="Check Icon" />}
      {icon === 'News (newspaper icon)' && <Icon src="/icons/news.svg" alt="News Icon" />}
      {icon === 'Support (heart icon)' && <Icon src="/icons/heart.svg" alt="Heart Icon" />}
      {icon === 'Suppliers (truck icon)' && <Icon src="/icons/truck.svg" alt="Truck Icon" />}
      {icon === 'Circles (DEI icon)' && <Icon src="/icons/circles.svg" alt="DEI Icon" />}

      {path && path.__typename === '_ExternalLink' ? (
        <ContentContainer>
          <a href={linkResolver(path)}>
            <Title>{title}</Title>
          </a>
          <Text>{text}</Text>
        </ContentContainer>
      ) : (
        <ContentContainer>
          {path ? (
            <Link href={linkResolver(path)} passHref>
              <a>
                <Title>{title}</Title>
              </a>
            </Link>
          ) : (
            <Title>{title}</Title>
          )}
          {extendedText !== null ? (
            <RichText render={extendedText} linkResolver={linkResolver} />
          ) : (
            <Text>{text}</Text>
          )}
        </ContentContainer>
      )}
    </Container>
  );
};

export default ActionItem;
