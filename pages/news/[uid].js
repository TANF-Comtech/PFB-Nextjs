import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { RichText } from 'prismic-reactjs';

import { htmlSerializer } from '~/lib/prismic/htmlSerializer';
import { getAllNews, getSingleNewsPage } from '~/lib/queries/news';
import { linkResolver } from '~/utils';
import { setDateSuffix } from '~/utils/setDateSuffix';
import getMetadata from '~/utils/getMetadata';

import SiteMetaCustom from '~/components/site-meta-custom';
import Wrapper from '~/components/wrapper';
import MainContent from '~/components/main-content';
import Promo from '~/components/promo';
import FallbackImage from '~/components/fallback-image';

import TakeActionPromo from '~/public/promo/take-action-banner.jpg';
import logo from '~/public/PFB_Stacked_LOGO_512x512.jpg';
import RedArrowWhiteBlock from '~/public/red-arrow-white-block.svg';

const DateBox = styled.div`
  font-size: 20px;
  font-family: ${(props) => props.theme.montserrat};
  font-weight: 700;
  margin-bottom: 1vh;
`;

// Style overrides for news articles are in here
const IntroWrapper = styled.div`
  margin: 3vh 0 1vh 0;

  h2 {
    font-size: 35px;
    font-weight: 400;
    line-height: 35px;
    margin-bottom: 1.5vh;
  }
  @media screen and (min-width: 320px) {
    h2 {
      font-size: calc(35px + 15 * ((100vw - 320px) / 880));
      line-height: calc(35px + 15 * ((100vw - 320px) / 880));
    }
  }
  @media screen and (min-width: 1200px) {
    h2 {
      font-size: 50px;
      line-height: 50px;
    }
  }

  h3 {
    font-size: 25px;
    font-weight: 700;
    line-height: 25px;
    margin-bottom: 1.5vh;
  }
  @media screen and (min-width: 320px) {
    h3 {
      font-size: calc(25px + 10 * ((100vw - 320px) / 880));
      line-height: calc(25px + 10 * ((100vw - 320px) / 880));
    }
  }
  @media screen and (min-width: 1200px) {
    h3 {
      font-size: 35px;
      line-height: 35px;
    }
  }

  h4 {
    font-family: ${(props) => props.theme.montserrat};
    font-size: 18px;
    font-weight: 700;
    line-height: 18px;
    margin-bottom: 1.5vh;
  }
  @media screen and (min-width: 320px) {
    h4 {
      font-size: calc(18px + 10 * ((100vw - 320px) / 880));
      line-height: calc(18px + 10 * ((100vw - 320px) / 880));
    }
  }
  @media screen and (min-width: 1200px) {
    h4 {
      font-size: 28px;
      line-height: 28px;
    }
  }

  .block-img {
    margin-bottom: 0;
  }

  .image-caption {
    font-style: italic;
    font-size: 15px;
    line-height: 15px;
  }

  .little-break {
    display: block;
    margin-bottom: 8vh;
  }

  .medium-break {
    display: block;
    margin-bottom: 12vh;
  }

  .big-break {
    display: block;
    margin-bottom: 16vh;
  }

  .horizontal-rule {
    background-color: ${(props) => props.theme.black};
    display: block;
    height: 1px;
    margin: 6vh 0;
    width: 100%;
  }
`;

const BoxOfLinksContainer = styled.section`
  margin: 4vh 0;
`;

const BoxOfLinksTitle = styled.p`
  font-weight: 700;
  margin: 0 5px;
`;

const BoxOfLinks = styled.section`
  display: flex;
  flex-wrap: wrap;

  a {
    background-color: ${(props) => props.theme.blue};
    color: #fff;
    display: block;
    padding: 5px 8px;
    margin: 5px;
    text-decoration: none;
    transform: translateX(0);
    transition: 0.2s ease-in-out;

    &:hover {
      transform: translateY(-2px);
    }
  }
`;

const ImgContainer = styled.section`
  display: block;
`;

const Caption = styled.div`
  font-size: 14px;
`;

const Deck = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.darkGray};
  border-top: 1px solid ${(props) => props.theme.darkGray};
  font-weight: 300;
  margin: 50px 0;
  padding: 30px;
  font-style: italic;

  p {
    margin: 0;
  }
`;

const Container = styled.section`
  a,
  a:visited,
  a:focus,
  a:hover,
  a:active {
    text-decoration: none;
  }
`;

const ColorContainer = styled.section`
  align-items: center;
  background-color: ${(props) => props.bgColor || props.theme.redAccent};
  background-position: center center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2vh 5vw;
  text-align: center;

  h1 {
    color: white;
    margin-bottom: 10px;
  }

  span {
    color: white;
    display: block;
    font-family: ${(props) => props.theme.montserrat};
    font-size: 24px;
    font-weight: 300;
    line-height: 30px;
    margin-bottom: 25px;
  }
  @media screen and (min-width: 320px) {
    span {
      font-size: calc(24px + 4 * ((100vw - 320px) / 880));
      line-height: calc(30px + 8 * ((100vw - 320px) / 880));
    }
  }
  @media screen and (min-width: 1200px) {
    span {
      font-size: 28px;
      line-height: 38px;
    }
  }
`;

const Arrow = styled.img`
  display: block;
  margin: 0 auto;
  width: 46px;
`;

function Donate({ bgColor }) {
  return (
    <>
      <Container>
        <a href="https://www.classy.org/give/117371" rel="nofollow" target="_blank">
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
    <>
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
                ${setDateSuffix(theDateLongform.toLocaleString('en-us', { day: 'numeric' }))},
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
              <RichText
                render={news.main_content}
                linkResolver={linkResolver}
                htmlSerializer={htmlSerializer}
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
                      <a href={`/topics/${topic.topic._meta.uid}`} key={topic.topic._meta.id}>
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
    </>
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
