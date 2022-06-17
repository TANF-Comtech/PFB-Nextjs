import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { RichText } from 'prismic-reactjs';

import { linkResolver } from '../../lib/utils';

import ActionIcon from '../../public/icons/action.svg';
import BatteryIcon from '../../public/icons/battery.svg';
import CartIcon from '../../public/icons/cart.svg';
import ChartIcon from '../../public/icons/chart.svg';
import CheckIcon from '../../public/icons/check.svg';
import EventIcon from '../../public/icons/event.svg';
import GovIcon from '../../public/icons/gov.svg';
import GreenIcon from '../../public/icons/green.svg';
import HeartIcon from '../../public/icons/heart.svg';
import LinkIcon from '../../public/icons/link.svg';
import MicIcon from '../../public/icons/mic.svg';
import NewsIcon from '../../public/icons/news.svg';
import PeopleIcon from '../../public/icons/people.svg';
import TruckIcon from '../../public/icons/truck.svg';
import DEIIcon from '../../public/icons/circles.svg';

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
      {icon === 'Action (exclamation icon)' && <Icon src={ActionIcon} alt="Exclamation Icon" />}
      {icon === 'Chart (research icon)' && <Icon src={ChartIcon} alt="Research Icon" />}
      {icon === 'E-bikes (battery icon)' && <Icon src={BatteryIcon} alt="Battery Icon" />}
      {icon === 'Event (calendar icon)' && <Icon src={EventIcon} alt="Event Icon" />}
      {icon === 'Green (leaves icon)' && <Icon src={GreenIcon} alt="Leaves Icon" />}
      {icon === 'Group (people icon)' && <Icon src={PeopleIcon} alt="People Icon" />}
      {icon === 'Join (link icon)' && <Icon src={LinkIcon} alt="Link Icon" />}
      {icon === 'Legal (gov icon)' && <Icon src={GovIcon} alt="Gov Icon" />}
      {icon === 'Podcast (mic icon)' && <Icon src={MicIcon} alt="Mic Icon" />}
      {icon === 'Retailers (cart icon)' && <Icon src={CartIcon} alt="Cart Icon" />}
      {icon === 'Register (check icon)' && <Icon src={CheckIcon} alt="Check Icon" />}
      {icon === 'News (newspaper icon)' && <Icon src={NewsIcon} alt="News Icon" />}
      {icon === 'Support (heart icon)' && <Icon src={HeartIcon} alt="Heart Icon" />}
      {icon === 'Suppliers (truck icon)' && <Icon src={TruckIcon} alt="Truck Icon" />}
      {icon === 'Circles (DEI icon)' && <Icon src={DEIIcon} alt="DEI Icon" />}

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
