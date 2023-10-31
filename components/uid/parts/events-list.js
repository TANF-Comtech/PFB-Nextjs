import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { asDate } from '@prismicio/helpers';

import MainContent from '~/components/main-content';

const DateBlock = styled.div`
  align-items: center !important;
  background-color: ${(props) => props.theme.blueBright} !important;
  display: flex !important;
  flex-direction: column !important;
  font-family: ${(props) => props.theme.dharma} !important;
  font-weight: 700 !important;
  justify-content: center !important;
  padding: 15px 40px !important;
  min-width: 180px !important;

  @media screen and (min-width: ${(props) => props.theme.sm}) {
    margin-right: 25px !important;
  }
`;

const Month = styled.span`
  color: black !important;
  display: block !important;
  font-size: 48px !important;
  margin: 0 !important;
  text-transform: uppercase !important;
`;
const Day = styled.span`
  color: white !important;
  display: block !important;
  font-size: 120px !important;
  line-height: 100px !important;
  margin: 0 !important;
`;
const Year = styled.span`
  color: black !important;
  display: block !important;
  font-size: 36px !important;
  margin: 0 !important;
  text-transform: uppercase !important;
`;

const Container = styled.section`
  align-items: center !important;
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
  margin: 0 !important;

  a,
  a:visited,
  a:active,
  a:focus,
  a:hover {
    text-decoration: none !important;
  }
`;

const Title = styled.h4`
  color: black !important;
  font-size: 40px !important;
  line-height: 38px !important;
  margin-bottom: 8px !important;
`;

const Text = styled.p`
  font-size: 18px !important;
  line-height: 28px !important;
  margin-bottom: 0 !important;
`;

/**
 * <EventItem>
 *
 * A simple presentation for an event item, usually shows in a list
 *
 * @param { string } date - DD, two digit
 * @param { string } month - Mon, three letter only
 * @param { string } year - YYYY
 * @param { string } path - tells us the URL to the item
 * @param { string } title - title that goes next to the icon
 * @param { string } text - content to be shown
 */
const EventItem = ({ day, month, year, path, title, text }) => {
  return (
    <Container>
      <DateBlock>
        <Month>{month}</Month>
        <Day>{day}</Day>
        <Year>{year}</Year>
      </DateBlock>

      <ContentContainer>
        {!path ? (
          title && <Title>{title}</Title>
        ) : (
          <Link href={path}>{title && <Title>{title}</Title>}</Link>
        )}
      </ContentContainer>
    </Container>
  );
};

/**
 * <EventsList>
 *
 * Provides topics landing page list content (all locations)
 *
 * @param { array } eventTitle - title of the event
 * @param { array } payload - response from Prismic API
 */
const EventsList = ({ eventTitle, payload }) => {
  return (
    <MainContent maxWidth="800px">
      {eventTitle && <h2>{eventTitle}</h2>}
      {payload.map((event) => {
        // Get date
        const newEventDate = asDate(ParseDate(event.node.date));
        return (
          <EventItem
            day={newEventDate.toLocaleString('en-us', { day: '2-digit' })}
            month={newEventDate.toLocaleString('en-us', { month: 'short' })}
            year={newEventDate.getFullYear()}
            key={event.node._meta.id}
            // path={ `/events/${event.node._meta.uid}` }
            text={event.node.main_content ? event.node.main_content : null}
            title={event.node.title[0].text}
          />
        );
      })}
    </MainContent>
  );
};

export default EventsList;
