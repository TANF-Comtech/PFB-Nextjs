import { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { RichText, Date as ParseDate } from 'prismic-reactjs';
import Link from 'next/link';

import { getSingleMemberPage } from '../../lib/queries/member-center';

import { randomID, linkResolver } from '../../lib/utils';

import auth0ValidateToken from '../../lib/auth0/auth0ValidateToken';
import Cookies from 'cookies';

import DefaultContext from '../../context/default/default-context';

import Wrapper from '../../components/global/wrapper';
import SiteMetaCustom from '../../components/meta/site-meta-custom';
import SecondaryTitleBanner from '../../components/content/secondary-title-banner';
import HeaderImage from '../../components/global/header-image';
import MainContent from '../../components/global/main-content';
import SummaryBlock from '../../components/content/summary-block';
import Header1 from '../../components/primitives/h1';
import BigTitleBanner from '../../components/content/big-title-banner';
import Button from '../../components/primitives/button';
import Grid from '../../components/global/grid';
import ContentItemSimple from '../../components/content/content-item-simple';
import WayfindingItem from '../../components/slices/wayfinding-item';
import NumberedPillars from '../../components/content/numbered-pillars';
import VisualGrid from '../../components/global/visual-grid';

const IntroWrapper = styled.div`
  margin: 3vh 0 1vh 0;
`;

const Box = styled.div`
  background-color: ${(props) => props.theme.blueBright};
  min-height: 190px;
  padding: 25px;
`;

const Text = styled.h4`
  color: white;
  font-size: 36px;
  font-weight: 300;
  line-height: 36px;
  margin: 0 0 10px 0;
  text-align: center;

  @media screen and (min-width: 320px) {
    font-size: calc(36px + 8 * ((100vw - 320px) / 880));
    line-height: calc(36px + 8 * ((100vw - 320px) / 880));
  }
  @media screen and (min-width: 1200px) {
    font-size: 44px;
    line-height: 44px;
  }
`;

const Arrow = styled.img`
  display: block;
  margin: 0 auto;
  width: 46px;
`;

export default function MembersPage({ page, preview }) {
  // Destructure page payload and meta from global context
  const { member_content } = page;
  const { meta } = useContext(DefaultContext);
  const themeProps = useContext(ThemeContext);

  return (
    <>
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
          // HEADER - either bold red text + header image OR
          // big blue stripe with text
          member_content.main_text && member_content.secondary_text ? (
            <>
              <SecondaryTitleBanner
                mainText={member_content.secondary_text}
                secondaryText={member_content.main_text}
              />
              {member_content.header_image && (
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
          )
        }

        <MainContent>
          {/* MAIN BODY CONTENT */}
          {member_content.main_content && (
            <IntroWrapper>
              <RichText render={member_content.main_content} linkResolver={linkResolver} />
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
            if (slice.type === 'summary_block') {
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
                  <RichText render={slice.primary.summary_area} linkResolver={linkResolver} />
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
                              <a>
                                <Text>
                                  {new Date(ParseDate(edition.date)).toLocaleString('en-us', {
                                    month: 'long',
                                    year: 'numeric',
                                  })}
                                </Text>
                                <Arrow src="/white-arrow.svg" />
                              </a>
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
                        bgColor={
                          ((i === 2 || i === 5 || i === 8 || i === 11) && themeProps.darkGray) ||
                          ((i === 1 || i === 4 || i === 7 || i === 10) && themeProps.blue) ||
                          themeProps.midnightBlue
                        }
                        path={item.item_link}
                        text={item.item_description}
                        title={item.item_name}
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
    </>
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
          destination: '/log-in',
          permanent: false,
        },
      };
    }
  } else {
    return {
      redirect: {
        destination: '/log-in',
        permanent: false,
      },
    };
  }
}
