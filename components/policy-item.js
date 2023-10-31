import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { PrismicRichText } from '@prismicio/react';

import { linkResolver } from '~/utils';

import Header1 from '~/components/h1';
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
    color: #333 !important;
    text-decoration: none !important;
  }

  a:hover {
    color: ${(props) => props.theme.redAccent} !important;
  }
`;

const Text = styled.div`
  font-size: 18px !important;
  line-height: 24px !important;
  margin-bottom: 25px !important;

  li {
    list-style-type: disc !important;
    padding-left: 10px !important;
  }
`;

const Metadata = styled.div`
  align-items: center !important;
  display: flex !important;
`;

const MetaText = styled.h3`
  font-size: 22px !important;
  font-weight: 700 !important;
  line-height: 1.2 !important;
  margin: 0 0 2vh 0 !important;

  &:after {
    content: '|' !important;
    padding: 0 10px !important;
  }

  &:last-child:after {
    content: '' !important;
    padding: 0 !important;
  }
`;

const MetaItem = styled.div`
  margin-bottom: 2vh !important;

  a,
  a:visited,
  a:focus,
  a:active {
    color: ${(props) => props.theme.blueAccent} !important;
    font-size: 22px !important;
    font-weight: 700 !important;
    text-decoration: underline !important;
  }

  &:after {
    content: '|' !important;
    padding: 0 10px !important;
  }

  &:last-child:after {
    content: '' !important;
    padding: 0 !important;
  }
`;

/**
 * <PolicyItem>
 *
 * A simple presentation for content items that show up in lists
 *
 * @param { string } city - place (if local)
 * @param { number } date - year when law took place
 * @param { string } govLevel - zone of policy (federal || state || local)
 * @param { string } location - place (if state)
 * @param { string } path - relative string to policy page
 * @param { string } text - content to be shown
 * @param { string } title - title that goes next to the icon
 */

const PolicyItem = ({
  bill,
  city,
  date,
  govLevel,
  location,
  path,
  status,
  supportingDoc,
  title,
  text,
}) => {
  return (
    <Container>
      <ContentContainer>
        {!path ? (
          <Header1>{title}</Header1>
        ) : (
          <Link href={path}>
            <h2>{title}</h2>
          </Link>
        )}
        <Metadata>
          {date && <MetaText>{date}</MetaText>}
          {govLevel === 'Federal' && <MetaText>{govLevel}</MetaText>}
          {govLevel === 'State' && <MetaText>{`${govLevel} - ${location}`}</MetaText>}
          {govLevel === 'Local' && <MetaText>{`${govLevel} - ${city}`}</MetaText>}
        </Metadata>
        {text && (
          <Text>
            <strong>Summary:</strong> <PrismicRichText field={text} />
          </Text>
        )}
        {status && (
          <Text>
            <strong>Status:</strong>
            <p>{status}</p>
          </Text>
        )}
        <Metadata>
          {bill && (
            <MetaItem>
              <a href={linkResolver(bill, true)} rel="noopener" target="_blank">
                Link to the Bill
              </a>
            </MetaItem>
          )}
          {supportingDoc && (
            <MetaItem>
              <Link href={linkResolver(supportingDoc)} passHref>
                Supporting Documentation
              </Link>
            </MetaItem>
          )}
        </Metadata>

        {path ? (
          <Button
            buttonBg="#D23823"
            buttonBgHover="rgb(216,216,216)"
            buttonBorder="none"
            buttonColor="white"
            buttonPadding="10px 20px"
            buttonTextTransform="uppercase"
            href={path}
          >
            Read More
          </Button>
        ) : (
          <Button
            buttonAlign="center"
            buttonBg="#D0021B"
            buttonBorder="none"
            buttonColor="white"
            buttonFontSize="24px"
            buttonMargin="75px 0 0 0"
            buttonPadding="10px 30px"
            buttonTextTransform="uppercase"
            href="/policy/finder"
          >
            Find Other Policies
          </Button>
        )}
      </ContentContainer>
    </Container>
  );
};

export default PolicyItem;
