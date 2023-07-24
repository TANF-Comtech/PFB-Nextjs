import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import FallbackImage from '~/components/fallback-image';
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
    text-decoration: none !important;
  }
`;

// @TODO switch to <h4> when converting to Tailwind
const Title = styled.h5`
  font-size: 24px !important;
  font-weight: 700 !important;
  margin-bottom: 0 !important;
  color: ${(props) => props.theme.black} !important;
  margin: 0 !important;
`;

const Text = styled.p`
  font-size: 18px !important;
  line-height: 24px !important;
  margin-bottom: 25px !important;
`;

const Datestamp = styled.p`
  font-size: 18px !important;
  font-weight: 700 !important;
  margin-bottom: 0 !important;
`;

const Image = styled.img`
  flex: 1 1 0px !important;
  height: auto !important;
  margin: 25px 0 0 0 !important;
  max-width: 100% !important;

  @media (min-width: ${(props) => props.theme.sm}) {
    margin: 25px 25px 25px 0 !important;
    max-width: 300px !important;
  }

  @media (min-width: ${(props) => props.theme.md}) {
    max-width: 500px !important;
  }
`;

/**
 * <ContentItem>
 *
 * A simple presentation for content items that show up in lists
 *
 * @param { string } date - when the content item occurred (optional)
 * @param { string } deck - intro to article, dek in content terms (optional)
 * @param { object } image - image to go with post (optional)
 * @param { string } path - tells us the URL to the item
 * @param { number } randomId - generated to give us a randomized ID for fallback images
 * @param { string } title - title that goes next to the icon
 * @param { string } text - content to be shown
 */
const ContentItem = ({ date, deck, image, path, title, text }) => {
  return (
    <Container>
      <div className="mr-8 aspect-[4/3] w-1/3 overflow-hidden">
        {image.url ? (
          <Image
            alt={image.alt ? image.alt : 'Bike-oriented image'}
            loading="lazy"
            src={image['1x'] ? image['1x'].url : image.url}
            className="object-cover"
          />
        ) : (
          // Utilizes fallback image functionality
          <Image alt={image.alt} loading="lazy" src={image.path} className="object-cover" />
        )}
      </div>
      <ContentContainer>
        {!path ? (
          <Title>{title}</Title>
        ) : (
          <Link href={path}>
            <a>
              <Title>{title}</Title>
            </a>
          </Link>
        )}
        {date && <Datestamp>{date}</Datestamp>}
        {deck !== null ? (
          <Text>{deck}</Text>
        ) : text ? (
          <Text>{`${text.substring(0, 300)} ...`}</Text>
        ) : (
          <></>
        )}
        {path && (
          <Button
            buttonBg="#404040"
            buttonBgHover="rgb(216,216,216)"
            buttonColor="white"
            buttonPadding="10px 20px"
            buttonTextTransform="uppercase"
            href={path}
          >
            Read More
          </Button>
        )}
      </ContentContainer>
    </Container>
  );
};
export default ContentItem;
