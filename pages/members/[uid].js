import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { PrismicRichText } from '@prismicio/react';
import { asDate } from '@prismicio/helpers';
import Link from 'next/link';
import Cookies from 'cookies';

import { getSingleMemberPage } from '~/lib/queries/member-center';
import { randomID, linkResolver } from '~/utils';
import auth0ValidateToken from '~/lib/auth0/auth0ValidateToken';
import data from '~/data';

import { LegacyPage } from '~/components/legacy-page';
import Wrapper from '~/components/wrapper';
import SiteMetaCustom from '~/components/site-meta-custom';
import SecondaryTitleBanner from '~/components/secondary-title-banner';
import HeaderImage from '~/components/header-image';
import MainContent from '~/components/main-content';
import SummaryBlock from '~/components/summary-block';
import Header1 from '~/components/h1';
import BigTitleBanner from '~/components/big-title-banner';
import Button from '~/components/button';
import Grid from '~/components/grid';
import WayfindingItem from '~/components/wayfinding-item';
import NumberedPillars from '~/components/numbered-pillars';
import VisualGrid from '~/components/visual-grid';

const IntroWrapper = styled.div`
  margin: 3vh 0 1vh 0 !important;
`;

const Box = styled.div`
  background-color: ${(props) => props.theme.blueBright} !important;
  min-height: 190px !important;
  padding: 25px !important;
`;

const Text = styled.h4`
  color: white !important;
  font-size: 36px !important;
  font-weight: 300 !important;
  line-height: 36px !important;
  margin: 0 0 10px 0 !important;
  text-align: center !important;

  @media screen and (min-width: 320px) {
    font-size: calc(36px + 8 * ((100vw - 320px) / 880)) !important;
    line-height: calc(36px + 8 * ((100vw - 320px) / 880)) !important;
  }
  @media screen and (min-width: 1200px) {
    font-size: 44px !important;
    line-height: 44px !important;
  }
`;

const Arrow = styled.img`
  display: block !important;
  margin: 0 auto !important;
  width: 46px !important;
`;

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

const Title = styled.h3`
  color: ${(props) => props.theme.darkestGray} !important;
  font-size: 40px !important;
  line-height: 50px !important;
  margin: 0 !important;
`;

/**
 * <ContentItemSimple>
 *
 * Almost exactly like ContentItem but different font, colors and no imagery
 * Oy vey with the 10% different components...
 *
 * @param { string } path - tells us the URL to the item
 * @param { string } title - title that goes next to the icon
 * @param { string } text - content to be shown
 */
const ContentItemSimple = ({ path, title, text }) => {
  const themeProps = useContext(ThemeContext);

  return (
    <Container>
      <ContentContainer>
        {!path ? (
          <Title>{title}</Title>
        ) : (
          <Link href={linkResolver(path)}>
            <Title>{title}</Title>
          </Link>
        )}
        {text && <PrismicRichText field={text} />}
        {path && (
          <Button
            buttonBg={themeProps.darkGray}
            buttonBgHover={themeProps.darkestGray}
            buttonColor="white"
            buttonPadding="10px 25px"
            buttonTextTransform="uppercase"
            href={linkResolver(path)}
          >
            Explore
          </Button>
        )}
      </ContentContainer>
    </Container>
  );
};

export default function MembersPage({ page, preview }) {
  // Destructure page payload and meta from global context
  const { member_content } = page;
  const { meta } = data;
  const themeProps = useContext(ThemeContext);

  return (
    <LegacyPage>
      <SiteMetaCustom
        desc={
          member_content.main_content
            ? `${member_content.main_content[0].text.substring(0, 180)} ... `
            : meta.desc
        }
        title={
          member_content.title
            ? `${member_content.title[0].text} | PeopleForBikes Corporate Member Center`
            : meta.title
        }
        imgHeight={meta.imgHeight}
        imgSrc={meta.imgSrc}
        imgWidth={meta.imgWidth}
        path={
          member_content
            ? `https://www.peopleforbikes.org/members/${member_content._meta.uid}`
            : meta.path
        }
      />
      <Wrapper postPath="/members/member-home" postTitle="Member Center" isWide="true">
        {
          <>
            {/* HEADER - either bold red text + header image OR */}
            {/* big blue stripe with text */}
            {/* MEMBER HOME page is custom overrides due to client requests - check it out! */}
            {member_content.main_text && member_content.secondary_text ? (
              <>
                <SecondaryTitleBanner
                  mainText={member_content.secondary_text}
                  secondaryText={member_content.main_text}
                />
                {member_content.header_image && member_content._meta.uid !== 'member-home' && (
                  <HeaderImage source={member_content.header_image.url} />
                )}
              </>
            ) : (
              <>
                {member_content.title && (
                  <BigTitleBanner>
                    <Header1>{member_content.title[0].text}</Header1>
                  </BigTitleBanner>
                )}
              </>
            )}

            {/* SUMMARY BLOCK - IF BEFORE MAIN CONTENT */}
            {/* We have to check the `summary_block_after_main_content` key in the slice */}
            {/* If set to FALSE, it means the summary block shows up BEFORE the main content */}
            {member_content.body &&
              member_content.body.map((slice) => {
                // SUMMARY BLOCK
                if (
                  slice.type === 'summary_block' &&
                  slice.primary.summary_block_after_main_content === false
                ) {
                  return (
                    <SummaryBlock
                      bgColor={
                        member_content._meta.uid === 'owners-manual'
                          ? '#fff'
                          : themeProps.midnightBlue
                      }
                      buttons={slice.fields.length > 0 && slice.fields}
                      key={randomID(10000000)}
                      fontSize="28px"
                      lineHeight="42px"
                      maxWidth="800px"
                      textColor={
                        member_content._meta.uid === 'owners-manual' ? themeProps.black : '#fff'
                      }
                      title={slice.primary.summary_title && slice.primary.summary_title}
                    >
                      <PrismicRichText
                        field={slice.primary.summary_area}
                        linkResolver={linkResolver}
                      />
                    </SummaryBlock>
                  );
                }
              })}
          </>
        }

        <MainContent>
          {/* MAIN BODY CONTENT */}
          {member_content.main_content && (
            <IntroWrapper>
              <PrismicRichText field={member_content.main_content} linkResolver={linkResolver} />
            </IntroWrapper>
          )}

          {/* DATA STUDIO */}
          {member_content._meta.uid === 'business-intelligence-hub' && (
            <>
              <iframe
                width="100%"
                height="8000"
                src="https://datastudio.google.com/embed/reporting/fe9c9fc6-ee8b-43a6-ae3a-1a2f20377a04/page/pHFSB"
                frameBorder="0"
                allowFullScreen
              />
              <Button
                buttonAlign="center"
                buttonBg="#D0021B"
                buttonBorder="none"
                buttonColor="white"
                buttonFontSize="24px"
                buttonMargin="0 0 50px 0"
                buttonPadding="10px 30px"
                buttonTextTransform="uppercase"
                href="/members/business-intelligence-hub-archive"
              >
                View Past Editions
              </Button>
            </>
          )}
        </MainContent>

        {/* SLICES */}
        {member_content.body &&
          member_content.body.map((slice) => {
            // SUMMARY BLOCK
            // We have to check the `summary_block_after_main_content` key in the slice
            // If set to TRUE, it means the summary block shows up AFTER the main content
            if (
              slice.type === 'summary_block' &&
              slice.primary.summary_block_after_main_content === true
            ) {
              return (
                <SummaryBlock
                  bgColor={
                    member_content._meta.uid === 'owners-manual' ? '#fff' : themeProps.midnightBlue
                  }
                  buttons={slice.fields}
                  key={randomID(10000000)}
                  fontSize="28px"
                  lineHeight="42px"
                  maxWidth="800px"
                  textColor={
                    member_content._meta.uid === 'owners-manual' ? themeProps.black : '#fff'
                  }
                  title={slice.primary.summary_title && slice.primary.summary_title}
                >
                  <PrismicRichText field={slice.primary.summary_area} linkResolver={linkResolver} />
                </SummaryBlock>
              );
            }

            // SALES REPORT SLICE
            if (slice.type === 'biz_intel_hub') {
              return (
                <MainContent maxWidth="800px">
                  <h2>{slice.primary.sectionTitle}</h2>
                  <Grid>
                    {slice.fields.map((edition) => {
                      return (
                        <Box key={edition.date}>
                          {edition.pdf_item && (
                            <Link href={edition.pdf_item.url} passHref>
                              <Text>
                                {new Date(asDate(edition.date)).toLocaleString('en-us', {
                                  month: 'long',
                                  year: 'numeric',
                                })}
                              </Text>
                              <Arrow src="/white-arrow.svg" />
                            </Link>
                          )}
                        </Box>
                      );
                    })}
                  </Grid>
                </MainContent>
              );
            }

            // ITEM LIST
            if (slice.type === 'item_list') {
              return (
                <MainContent>
                  {slice.fields.map((item, i) => {
                    return (
                      // @TODO add valid key prop from field
                      // eslint-disable-next-line react/jsx-key
                      <WayfindingItem
                        bgColor={themeProps.midnightblue}
                        path={item.item_link}
                        text={item.item_description}
                        title={item.item_name}
                        key={i}
                      />
                    );
                  })}
                </MainContent>
              );
            }

            // NUMBERED PILLARS
            if (slice.type === 'mission_content') {
              return <NumberedPillars payload={slice.fields} title={slice.primary.pillar_title} />;
            }

            // VISUAL GRID
            if (slice.type === 'visual_grid') {
              return <VisualGrid payload={slice.fields} title={slice.primary.grid_title} />;
            }

            // CONTENT LIST
            if (slice.type === 'content_list') {
              return (
                <MainContent maxWidth="800px">
                  {slice.fields.map((item) => {
                    return (
                      <ContentItemSimple
                        key={randomID(1000000000)}
                        path={item.content_link}
                        text={item.content_description}
                        title={item.content_title}
                      />
                    );
                  })}
                </MainContent>
              );
            }

            // EMBED
            if (slice.type === 'embed') {
              return (
                <>
                  <MainContent>
                    <hr />
                  </MainContent>

                  <MainContent
                    bgColor={
                      slice.primary.dark_background === true ? themeProps.midnightBlue : '#fff'
                    }
                    maxWidth="1200px"
                  >
                    {slice.primary.embed_intro && (
                      <div
                        className={
                          slice.primary.dark_background === true
                            ? 'gray-50 text-center'
                            : 'gray-950 text-center'
                        }
                      >
                        <PrismicRichText
                          field={slice.primary.embed_intro}
                          linkResolver={linkResolver}
                        />
                      </div>
                    )}
                    {slice.primary.embed_link && (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: slice.primary.embed_link,
                        }}
                      ></div>
                    )}
                    {slice.primary.embed_button_text && slice.primary.embed_button_link && (
                      <Button
                        buttonAlign="center"
                        buttonBg="#4D4D4F"
                        buttonBorder="none"
                        buttonColor="white"
                        buttonFontSize="18px"
                        buttonMargin="60px 0"
                        buttonPadding="10px 30px"
                        buttonTextTransform="uppercase"
                        href={linkResolver(slice.primary.embed_button_link)}
                      >
                        {slice.primary.embed_button_text}
                      </Button>
                    )}
                  </MainContent>
                </>
              );
            }
          })}

        {/* Back to Member Home Button */}
        {member_content._meta.uid !== 'business-intelligence-hub' && (
          <>
            {member_content._meta.uid !== 'member-home' && (
              <Button
                buttonAlign="center"
                buttonBg="#D0021B"
                buttonBorder="none"
                buttonColor="white"
                buttonFontSize="24px"
                buttonMargin="50px 0 0 0"
                buttonPadding="10px 30px"
                buttonTextTransform="uppercase"
                href="/members/member-home"
              >
                Back to Member Center
              </Button>
            )}
          </>
        )}
      </Wrapper>
    </LegacyPage>
  );
}

export async function getServerSideProps({ req, res, params, preview = false, previewData }) {
  const cookies = new Cookies(req, res);
  const token = cookies.get('auth-token');

  if (token) {
    const data = await auth0ValidateToken(token);

    if (data.loggedIn) {
      const pageData = await getSingleMemberPage(params.uid, previewData);

      if (!pageData) {
        return {
          notFound: true,
        };
      }

      if (pageData.member_content.body !== null) {
        pageData.member_content.body.map((slice) => {
          if (slice.type === 'biz_intel_hub' && slice.fields.length > 1) {
            slice.fields.reverse();
          }
        });
      }

      return {
        props: {
          preview,
          page: pageData ?? null,
        },
      };
    } else {
      return {
        redirect: {
          destination: `/log-in?redirect=${params.uid}`,
          permanent: false,
        },
      };
    }
  } else {
    return {
      redirect: {
        destination: `/log-in?redirect=${params.uid}`,
        permanent: false,
      },
    };
  }
}
