import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { PrismicRichText } from '@prismicio/react';

import { htmlSerializer } from '~/lib/prismic/htmlSerializer';
import { getAllNews, getSingleNewsPage } from '~/lib/queries/news';
import { linkResolver } from '~/utils';
import getMetadata from '~/utils/getMetadata';

import { LegacyPage } from '~/components/legacy-page';
import SiteMetaCustom from '~/components/site-meta-custom';
import Wrapper from '~/components/wrapper';
import MainContent from '~/components/main-content';
import Promo from '~/components/promo';
import FallbackImage from '~/components/fallback-image';

import TakeActionPromo from '~/public/promo/take-action-banner.jpg';
import logo from '~/public/PFB_Stacked_LOGO_512x512.jpg';
import RedArrowWhiteBlock from '~/public/red-arrow-white-block.svg';

const DateBox = styled.div`
  font-size: 20px !important;
  font-family: ${(props) => props.theme.montserrat} !important;
  font-weight: 700 !important;
  margin-bottom: 1vh !important;
`;

// Style overrides for news articles are in here
const IntroWrapper = styled.div`
  margin: 3vh 0 1vh 0 !important;

  h2 {
    font-size: 35px !important;
    font-weight: 400 !important;
    line-height: 35px !important;
    margin-bottom: 1.5vh !important;
  }
  @media screen and (min-width: 320px) {
    h2 {
      font-size: calc(35px + 15 * ((100vw - 320px) / 880)) !important;
      line-height: calc(35px + 15 * ((100vw - 320px) / 880)) !important;
    }
  }
  @media screen and (min-width: 1200px) {
    h2 {
      font-size: 50px !important;
      line-height: 50px !important;
    }
  }

  h3 {
    font-size: 25px !important;
    font-weight: 700 !important;
    line-height: 25px !important;
    margin-bottom: 1.5vh !important;
  }
  @media screen and (min-width: 320px) {
    h3 {
      font-size: calc(25px + 10 * ((100vw - 320px) / 880)) !important;
      line-height: calc(25px + 10 * ((100vw - 320px) / 880)) !important;
    }
  }
  @media screen and (min-width: 1200px) {
    h3 {
      font-size: 35px !important;
      line-height: 35px !important;
    }
  }

  h4 {
    font-family: ${(props) => props.theme.montserrat};
    font-size: 18px !important;
    font-weight: 700 !important;
    line-height: 18px !important;
    margin-bottom: 1.5vh !important;
  }
  @media screen and (min-width: 320px) {
    h4 {
      font-size: calc(18px + 10 * ((100vw - 320px) / 880)) !important;
      line-height: calc(18px + 10 * ((100vw - 320px) / 880)) !important;
    }
  }
  @media screen and (min-width: 1200px) {
    h4 {
      font-size: 28px !important;
      line-height: 28px !important;
    }
  }

  li {
    list-style-type: disc !important;
    padding-left: 10px !important;
  }

  .block-img {
    margin-bottom: 0 !important;
  }

  .image-caption {
    display: block !important;
    font-size: 14px !important;
    font-style: normal !important;
    line-height: 1.5 !important;
  }

  .little-break {
    display: block !important;
    margin-bottom: 8vh !important;
  }

  .medium-break {
    display: block !important;
    margin-bottom: 12vh !important;
  }

  .big-break {
    display: block !important;
    margin-bottom: 16vh !important;
  }

  .horizontal-rule {
    background-color: ${(props) => props.theme.black};
    display: block !important;
    height: 1px !important;
    margin: 6vh 0 !important;
    width: 100% !important;
  }

  .yt-video-container {
    position: relative !important;
    padding-bottom: 56.25% !important;
    padding-top: 30px !important;
    height: 0 !important;
    overflow: hidden !important;

    iframe {
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
    }
  }
`;

const BoxOfLinksContainer = styled.section`
  margin: 4vh 0 !important;
`;

const BoxOfLinksTitle = styled.p`
  font-weight: 700 !important;
  margin: 0 5px !important;
`;

const BoxOfLinks = styled.section`
  display: flex !important;
  flex-wrap: wrap !important;

  a {
    background-color: ${(props) => props.theme.blue} !important;
    color: #fff !important;
    display: block !important;
    padding: 5px 8px !important;
    margin: 5px !important;
    text-decoration: none !important;
    transform: translateX(0) !important;
    transition: 0.2s ease-in-out !important;

    &:hover {
      transform: translateY(-2px) !important;
    }
  }
`;

const ImgContainer = styled.section`
  display: block !important;
`;

const Caption = styled.div`
  font-size: 14px !important;
`;

const Deck = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.darkGray} !important;
  border-top: 1px solid ${(props) => props.theme.darkGray} !important;
  font-weight: 300 !important;
  margin: 50px 0 !important;
  padding: 30px !important;
  font-style: italic !important;

  p {
    margin: 0 !important;
  }
`;

const Container = styled.section`
  a,
  a:visited,
  a:focus,
  a:hover,
  a:active {
    text-decoration: none !important;
  }
`;

const ColorContainer = styled.section`
  align-items: center !important;
  background-color: ${(props) => props.bgColor || props.theme.redAccent};
  background-position: center center !important;
  background-size: cover !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  padding: 2vh 5vw !important;
  text-align: center !important;

  h1 {
    color: white !important;
    margin-bottom: 10px !important;
  }

  span {
    color: white !important;
    display: block !important;
    font-family: ${(props) => props.theme.montserrat};
    font-size: 24px !important;
    font-weight: 300 !important;
    line-height: 30px !important;
    margin-bottom: 25px !important;
  }
  @media screen and (min-width: 320px) {
    span {
      font-size: calc(24px + 4 * ((100vw - 320px) / 880)) !important;
      line-height: calc(30px + 8 * ((100vw - 320px) / 880)) !important;
    }
  }
  @media screen and (min-width: 1200px) {
    span {
      font-size: 28px !important;
      line-height: 38px !important;
    }
  }
`;

const Arrow = styled.img`
  display: block !important;
  margin: 0 auto !important;
  width: 46px !important;
`;

function Donate({ bgColor }) {
  return (
    <>
      <Container>
        <a href="https://www.classy.org/campaign/give-the-gift-of-better-biking/c532765" rel="nofollow" target="_blank">
          <ColorContainer bgColor={bgColor}>
            <MainContent maxWidth="800px">
              <h1>Donate Now</h1>
              <span>Bring Better Biking to Your Community</span>
              <Arrow src="/red-arrow-white-block.svg" />
            </MainContent>
          </ColorContainer>
        </a>
      </Container>
    </>
  );
}

export default function NewsPage({ fallback, page, preview }) {
  // Set up router
  const router = useRouter();

  // Destructure page payload and meta from global context
  const { news } = page;

  // Implement metadata hook
  const {
    theTitle,
    theByline,
    theDesc,
    theKeywords,
    thePath,
    theDate,
    theDateModified,
    theImage,
    theImageWidth,
    theImageHeight,
  } = getMetadata(news);

  // Set fallback index, one of six possible fallback images
  const [fi, setFi] = useState(Math.floor(Math.random(5)));

  // Every time a new path comes up we shuffle the placeholder images
  // useEffect 'watch' dependency is where we watch the router's path
  useEffect(() => {
    setFi(Math.floor(Math.random(5)));
  }, [router.query.uid]);

  // Build full date obj from theDate
  let theDateLongform = null;
  if (news.publication_date) {
    theDateLongform = new Date(news.publication_date.replace(/-/g, '/'));
  }

  // Sets up article-specific JSON
  const newsJSONPayload = {
    '@context': 'http://schema.org',
    '@type': 'NewsArticle',
    'description': theDesc,
    'image': {
      '@context': 'http://schema.org',
      '@type': 'ImageObject',
      'url': theImage,
      'height': theImageHeight,
      'width': theImageWidth,
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': thePath,
    },
    'url': thePath,
    'inLanguage': 'en',
    'author': [
      {
        '@context': 'http://schema.org',
        '@type': 'Person',
        'url': 'https://www.peopleforbikes.org',
        'name': theByline,
      },
    ],
    'datePublished': theDate,
    'dateModified': theDateModified,
    'headline': theTitle,
    'publisher': {
      '@type': 'Organization',
      'name': 'PeopleForBikes',
      '@id': 'https://www.peopleforbikes.org/#publisher',
      'logo': {
        '@context': 'http://schema.org',
        '@type': 'ImageObject',
        'url': `${logo}`,
      },
    },
    'copyrightHolder': {
      '@type': 'Organization',
      'name': 'PeopleForBikes',
      '@id': 'https://www.peopleforbikes.org/#publisher',
    },
    'sourceOrganization': {
      '@type': 'Organization',
      'name': 'PeopleForBikes',
      '@id': 'https://www.peopleforbikes.org/#publisher',
    },
    'isAccessibleForFree': true,
    'hasPart': {
      '@type': 'WebPageElement',
      'isAccessibleForFree': true,
    },
    'isPartOf': {
      '@type': 'CreativeWork',
      'name': 'PeopleForBikes',
    },
  };

  return (
    <LegacyPage>
      <SiteMetaCustom
        desc={theDesc}
        keywords={theKeywords}
        title={theTitle}
        imgHeight={theImageHeight}
        imgSrc={theImage}
        imgWidth={theImageWidth}
        ldJSON={newsJSONPayload}
        path={thePath}
      />
      <Wrapper postPath="/news" postTitle="News" isWide="true">
        <MainContent maxWidth="700px">
          {theDateLongform !== null && (
            <DateBox>
              {`${theDateLongform.toLocaleString('en-us', { month: 'long' })}
                ${theDateLongform.toLocaleString('en-us', { day: 'numeric' })},
                ${theDateLongform.toLocaleString('en-us', { year: 'numeric' })}`}
            </DateBox>
          )}
          {news.title && <h2>{news.title[0].text}</h2>}
          <p>By: {theByline}</p>
          {news.header_image ? (
            <ImgContainer>
              <img
                loading="lazy"
                src={news.header_image.url}
                alt={news.header_image.alt ? news.header_image.alt : 'Biking related image'}
              />
              {news.header_image.alt && <Caption>{news.header_image.alt}</Caption>}
            </ImgContainer>
          ) : (
            <ImgContainer>
              <img loading="lazy" src={fallback[fi].path} alt={fallback[fi].alt} />
            </ImgContainer>
          )}
          {news.deck && (
            <Deck>
              <p>{news.deck}</p>
            </Deck>
          )}
          {news.main_content && (
            <IntroWrapper>
              <PrismicRichText
                field={news.main_content}
                linkResolver={linkResolver}
                components={htmlSerializer}
              />
            </IntroWrapper>
          )}
          {news.topics.length > 1 && (
            <BoxOfLinksContainer>
              {news.topics[0].topic !== null && <BoxOfLinksTitle>Related Topics:</BoxOfLinksTitle>}
              <BoxOfLinks>
                {news.topics.map((topic) => {
                  if (topic.topic !== null) {
                    return (
                      <a
                        href={`/topics/${topic.topic._meta.uid}`}
                        key={topic.topic._meta.id}
                        className="!text-white"
                      >
                        <strong>{topic.topic.title[0].text}</strong>
                      </a>
                    );
                  }
                })}
              </BoxOfLinks>
            </BoxOfLinksContainer>
          )}
          {news.locations.length > 1 && (
            <BoxOfLinksContainer>
              {news.locations[0].location !== null && (
                <BoxOfLinksTitle>Related Locations:</BoxOfLinksTitle>
              )}
              <BoxOfLinks>
                {news.locations.map((location) => {
                  if (location.location !== null) {
                    return (
                      <a
                        href={`/locations/${location.location._meta.uid}`}
                        key={location.location._meta.id}
                        className="!text-white"
                      >
                        <strong>{location.location.location[0].text}</strong>
                      </a>
                    );
                  }
                })}
              </BoxOfLinks>
            </BoxOfLinksContainer>
          )}
        </MainContent>
        <Promo
          bigWords="Take Action"
          path="/take-action"
          smallWords="How You Can"
          source={TakeActionPromo}
        />
        <Donate />
      </Wrapper>
    </LegacyPage>
  );
}

/* The return here sends the `page` prop back to the Page component above for rendering */
export async function getStaticProps({ params, preview = false, previewData }) {
  const pageData = await getSingleNewsPage(params.uid, previewData);

  if (!pageData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      preview,
      page: pageData ?? null,
      fallback: FallbackImage(),
    },
    revalidate: 60,
  };
}

// getStaticPaths requires the whole paths argument to be objects of URL it needs to statically render server-side
export async function getStaticPaths() {
  const pages = await getAllNews();
  return {
    paths: pages?.map(({ node }) => `/news/${node._meta.uid}`) || [],
    fallback: false,
  };
}
