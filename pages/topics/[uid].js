import React, { useContext } from 'react';
import Link from 'next/link';
import { RichText, Date as ParseDate } from 'prismic-reactjs';
import styled from 'styled-components';

import { getTopics, getSingleTopicPage } from '~/lib/queries/topics';
import { getEBikesPages } from '~/lib/queries/electric-bikes';
import { randomID, linkResolver } from '~/utils';
import { setDateSuffix } from '~/utils/setDateSuffix';
import { ebikeFormatter } from '~/lib/algolia/ebikeFormatter';
import { AlgoliaIndex } from '~/lib/algolia/algoliaClient';
import data from '~/data';

import FallbackImage from '~/components/fallback-image';
import Wrapper from '~/components/wrapper';
import SiteMetaCustom from '~/components/site-meta-custom';
import HeaderImage from '~/components/header-image';
import MainContent from '~/components/main-content';
import ContentItem from '~/components/content-item';
import Header1 from '~/components/h1';
import SummaryBlock from '~/components/summary-block';
import Accordion from '~/components/accordion';
import Button from '~/components/button';
import SecondaryTitleBanner from '~/components/secondary-title-banner';
import WayfindingItem from '~/components/wayfinding-item';

const SpacedHeading = styled.h2`
  margin: 4vh 0;
`;

/* You must reference the `topic` prop to get data from `getStaticProps` - check bottom of this file */
export default function TopicPage({ fallback, page, preview }) {
  // Destructure topic from main page payload and meta from global context
  const { topic } = page[0];
  const { meta } = data;
  const pillars = []; // setup for pillar content

  return (
    <>
      {
        // Sniff for pillars - set up as array or null
        topic.body
          ? topic.body.map((slice) => {
              slice.__typename === 'TopicBodyPolicy_pillar'
                ? pillars.push(slice)
                : pillars.push(null);
            })
          : pillars.push(null)
      }
      <SiteMetaCustom
        desc={topic.intro ? `${topic.intro.substring(0, 180)}... ` : meta.desc}
        title={topic.title ? `${topic.title[0].text} | PeopleForBikes` : meta.title}
        imgHeight={topic.banner_image ? topic.banner_image['1x'].dimensions.height : meta.imgHeight}
        imgSrc={topic.banner_image ? topic.banner_image['1x'].url : meta.imgSrc}
        imgWidth={topic.banner_image ? topic.banner_image['1x'].dimensions.width : meta.imgWidth}
        path={topic ? `https://www.peopleforbikes.org/topics/${topic._meta.uid}` : meta.path}
      />

      <Wrapper
        postPath={topic.body ? '/policy' : '/topics/'}
        postTitle={topic.body ? 'Policy' : 'Topics'}
        isWide={topic.banner_image ? true : false}
      >
        {
          // NON E-BIKES TOPICS
          topic._meta.uid !== 'electric-bikes' ? (
            <>
              {topic.banner_image ? (
                <HeaderImage headingRGBA="255,255,255,1" source={topic.banner_image.url}>
                  <MainContent maxWidth="900px">
                    <Header1>
                      {topic.body ? pillars[0].primary.long_name : topic.title[0].text}
                    </Header1>
                  </MainContent>
                </HeaderImage>
              ) : (
                <Header1>{topic.body ? pillars[0].primary.long_name : topic.title[0].text}</Header1>
              )}

              <SummaryBlock bgColor="#002C40" maxWidth="900px" textColor="#fff">
                <p>{topic.intro}</p>
              </SummaryBlock>

              {
                // POLICY PILLARS
                topic.body ? (
                  <MainContent maxWidth="900px">
                    {pillars[0].fields.map((pillar) => {
                      return (
                        <Accordion key={randomID(1234567890)} title={pillar.sub_pillar}>
                          <p>{pillar.sub_pillar_summary}</p>
                          {(pillar.news_item_1 || pillar.news_item_2 || pillar.news_item_3) && (
                            <strong>Our Work in This Area:</strong>
                          )}
                          <ul>
                            {pillar.news_item_1 && (
                              <li>
                                <Link href={`/news/${pillar.news_item_1._meta.uid}`} passHref>
                                  <a>{pillar.news_item_1.title[0].text}</a>
                                </Link>
                              </li>
                            )}
                            {pillar.news_item_2 && (
                              <li>
                                <Link href={`/news/${pillar.news_item_2._meta.uid}`} passHref>
                                  <a>{pillar.news_item_2.title[0].text}</a>
                                </Link>
                              </li>
                            )}
                            {pillar.news_item_3 && (
                              <li>
                                <Link href={`/news/${pillar.news_item_3._meta.uid}`} passHref>
                                  <a>{pillar.news_item_3.title[0].text}</a>
                                </Link>
                              </li>
                            )}
                          </ul>
                        </Accordion>
                      );
                    })}
                    <Button
                      buttonAlign="center"
                      buttonBg="#D0021B"
                      buttonBorder="none"
                      buttonColor="white"
                      buttonFontSize="24px"
                      buttonMargin="50px 0"
                      buttonPadding="10px 30px"
                      buttonTextTransform="uppercase"
                      href="/policy"
                    >
                      Explore Other Policy Pillars
                    </Button>
                  </MainContent>
                ) : (
                  <MainContent>
                    {page[1].length !== 0 ? (
                      <>
                        <SpacedHeading>
                          PeopleForBikes at Work on {topic.title[0].text}
                        </SpacedHeading>
                        <h3>News</h3>
                        {page[1].map((newsItem) => {
                          // Check for publication_date from individual news post
                          // If not present, use publication date from Prismic CMS
                          const newDate = newsItem.data.publication_date
                            ? new Date(ParseDate(newsItem.data.publication_date))
                            : new Date(ParseDate(newsItem.last_publication_date));
                          return (
                            <ContentItem
                              date={`${newDate.toLocaleString('en-us', {
                                month: 'long',
                              })}
                              ${setDateSuffix(newDate.getDate())},
                              ${newDate.getFullYear()}`}
                              key={newsItem.id}
                              image={
                                Object.keys(newsItem.data.header_image).length !== 0 &&
                                newsItem.data.header_image
                                  ? newsItem.data.header_image
                                  : fallback[Math.floor(Math.random() * 6)]
                              }
                              path={`/news/${newsItem.uid}`}
                              text={
                                newsItem.data.main_content[0].type === 'paragraph'
                                  ? newsItem.data.main_content[0].text
                                  : ''
                              }
                              title={newsItem.data.title[0].text}
                            />
                          );
                        })}
                      </>
                    ) : (
                      <></>
                    )}
                  </MainContent>
                )
              }
            </>
          ) : (
            // E_BIKES
            <>
              <SecondaryTitleBanner
                secondaryText="Learn about the world of "
                mainText="electric bikes"
              />
              {topic.banner_image && (
                <HeaderImage headingRGBA="255,255,255,1" source={topic.banner_image.url} />
              )}
              {topic.body &&
                topic.body.map((slice) => {
                  return (
                    slice.__typename === 'TopicBodyElectric_bikes_content' && (
                      <MainContent maxWidth="1000px" key={randomID(123647890)}>
                        {slice.primary && (
                          <RichText
                            render={slice.primary.main_content}
                            linkResolver={linkResolver}
                          />
                        )}
                        {slice.fields &&
                          slice.fields.map((pillar) => {
                            return (
                              <WayfindingItem
                                key={randomID(894589778)}
                                path={pillar.pillars}
                                title={pillar.pillars.title[0].text}
                                text={pillar.pillar_subtext}
                              />
                            );
                          })}
                      </MainContent>
                    )
                  );
                })}
            </>
          )
        }
      </Wrapper>
    </>
  );
}

/* The return here sends the `page` prop back to the TopicPage component above for rendering */
export async function getStaticProps({ params, preview = false, previewData }) {
  const pageData = await getSingleTopicPage(params.uid, previewData);

  const errorCode = pageData.ok ? false : pageData.statusCode;
  if (errorCode) {
    res.statusCode = errorCode;
  }

  // E-bikes for Algolia (only run on /topics/electric-bikes)
  if (params.uid === 'electric-bikes') {
    const ebikesData = await getEBikesPages();
    if (process.env.ALGOLIA_INDEXING_ENABLED === 'true') {
      const algoliaFormattedData = ebikeFormatter(ebikesData);
      await AlgoliaIndex().saveObjects(algoliaFormattedData);
    }
  }

  return {
    props: {
      fallback: FallbackImage(),
      preview,
      page: pageData,
    },
    revalidate: 60,
  };
}

// getStaticPaths requires the whole paths argument to be objects of URL it needs to statically render server-side
export async function getStaticPaths() {
  const allTopics = await getTopics();

  return {
    paths: allTopics?.map(({ node }) => `/topics/${node._meta.uid}`) || [],
    fallback: false,
  };
}
