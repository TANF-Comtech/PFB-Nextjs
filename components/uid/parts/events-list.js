import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Date as ParseDate } from 'prismic-reactjs';

import MainContent from '~/components/main-content';

const DateBlock = styled.div`
  align-items: center;
  background-color: ${(props) => props.theme.blueBright};
  display: flex;
  flex-direction: column;
  font-family: ${(props) => props.theme.dharma};
  font-weight: 700;
  justify-content: center;
  padding: 15px 40px;
  min-width: 180px;

  @media screen and (min-width: ${(props) => props.theme.sm}) {
    margin-right: 25px;
  }
`;

const Month = styled.span`
  color: black;
  display: block;
  font-size: 48px;
  margin: 0;
  text-transform: uppercase;
`;
const Day = styled.span`
  color: white;
  display: block;
  font-size: 120px;
  line-height: 100px;
  margin: 0;
`;
const Year = styled.span`
  color: black;
  display: block;
  font-size: 36px;
  margin: 0;
  text-transform: uppercase;
`;

const Container = styled.section`
  align-items: center;
  border-bottom: 1px solid rgb(216, 216, 216);
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
  padding-bottom: 25px;

  @media (min-width: ${(props) => props.theme.sm}) {
    flex-direction: row;
  }

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const ContentContainer = styled.div`
  flex: 1 1 0px;
  margin: 0;

  a,
  a:visited,
  a:active,
  a:focus,
  a:hover {
    text-decoration: none;
  }
`;

const Title = styled.h4`
  color: black;
  font-size: 40px;
  line-height: 38px;
  margin-bottom: 8px;
`;

const Text = styled.p`
  font-size: 18px;
  line-height: 28px;
  margin-bottom: 0;
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
          <Link href={path}>
            <a>{title && <Title>{title}</Title>}</a>
          </Link>
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
        const newEventDate = new Date(ParseDate(event.node.date));
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
