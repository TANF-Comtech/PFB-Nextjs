import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { PrismicRichText } from '@prismicio/react';

import { linkResolver } from '~/utils';
import Button from '~/components/button';

const Container = styled.section`
  align-items: flex-start;
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
  margin: 4vh 0;

  a,
  a:visited,
  a:active,
  a:focus,
  a:hover {
    color: #333;
    text-decoration: none;
  }

  a:hover {
    color: ${(props) => props.theme.redAccent};
  }
`;

const Text = styled.div`
  font-size: 18px;
  line-height: 24px;
  margin-bottom: 25px;
`;

const Metadata = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;

  @media (min-width: ${(props) => props.theme.sm}) {
    align-items: center;
    flex-direction: row;
  }
`;

const MetaText = styled.h3`
  font-size: 22px;
  font-weight: 700;
  line-height: 1.2;
  margin: 0 0 2vh 0;

  &:after {
    @media (min-width: ${(props) => props.theme.sm}) {
      content: '|';
      padding: 0 10px;
    }
  }

  &:last-child:after {
    @media (min-width: ${(props) => props.theme.sm}) {
      content: '';
      padding: 0;
    }
  }
`;

const MetaItem = styled.div`
  margin-bottom: 2vh;

  a,
  a:visited,
  a:focus,
  a:active {
    color: ${(props) => props.theme.blueAccent} !important;
    font-size: 22px;
    font-weight: 700;
    text-decoration: underline !important;
  }

  &:after {
    content: '|';
    padding: 0 10px;
  }

  &:last-child:after {
    content: '';
    padding: 0;
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
            <a>
              <h2>{title}</h2>
            </a>
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
                <a>Learn More About This Grantee Organization</a>
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