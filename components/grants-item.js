import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
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
`;

const Metadata = styled.div`
  align-items: flex-start !important;
  display: flex !important;
  flex-direction: column !important;

  @media (min-width: ${(props) => props.theme.sm}) {
    align-items: center !important;
    flex-direction: row !important;
  }
`;

const MetaText = styled.h3`
  font-size: 22px !important;
  font-weight: 700 !important;
  line-height: 1.2 !important;
  margin: 0 0 2vh 0 !important;

  &:after {
    @media (min-width: ${(props) => props.theme.sm}) {
      content: '|' !important;
      padding: 0 10px !important;
    }
  }

  &:last-child:after {
    @media (min-width: ${(props) => props.theme.sm}) {
      content: '' !important;
      padding: 0 !important;
    }
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
 * <GrantItem>
 *
 * A simple presentation for content items that show up in lists
 *
 * @param { amount } amount - size of the grant
 * @param { string } city - place (if local)
 * @param { number } date - year when law took place
 * @param { string } grantType - send it over
 * @param { string } location - place (if state)
 * @param { string } path - relative string to policy page
 * @param { string } text - content to be shown
 * @param { string } title - title that goes next to the icon
 */

const GrantsItem = ({
  amount,
  city,
  date,
  grantType,
  location,
  path,
  supportingDoc,
  text,
  title,
}) => {
  return (
    <Container>
      <ContentContainer>
        {!path ? (
          <h2>{title}</h2>
        ) : (
          <Link href={path}>
            <h2>{title}</h2>
          </Link>
        )}
        <Metadata>
          {date && <MetaText>{date} Cycle</MetaText>}
          {amount && (
            <MetaText>
              {`$${new Intl.NumberFormat('en-us').format(parseInt(amount))}`} Grant
            </MetaText>
          )}
          {grantType && <MetaText>{grantType} </MetaText>}
        </Metadata>
        {text && (
          <Text>
            <strong>Summary:</strong> <PrismicRichText field={text} linkResolver={linkResolver} />
          </Text>
        )}
        {location && (
          <Text>
            <strong>Location:</strong>{' '}
            {city && (
              <MetaText>
                {city}
                {location && `, ${location}`}{' '}
              </MetaText>
            )}
          </Text>
        )}
        <Metadata>
          {supportingDoc && (
            <MetaItem>
              <Link href={linkResolver(supportingDoc)} passHref>
                Learn More About This Grantee Organization
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
            href="/grants/finder"
          >
            Find Other Grants
          </Button>
        )}
      </ContentContainer>
    </Container>
  );
};

export default GrantsItem;
