import { useContext } from "react";
import ErrorPage from "next/error";
import styled from "styled-components";
import { RichText, Date as ParseDate } from "prismic-reactjs";
import Link from "next/link";

import {
  getMemberPages,
  getSingleMemberPage,
} from "../../lib/queries/member-center";
import { linkResolver } from "../../lib/utils";

import auth0ValidateToken from "../../lib/auth0/auth0ValidateToken";
import Cookies from "cookies";

import DefaultContext from "../../context/default/default-context";

import Wrapper from "../../components/global/wrapper";
import SiteMeta from "../../components/meta/site-meta";
import MainContent from "../../components/global/main-content";
import Header1 from "../../components/primitives/h1";
import BigTitleBanner from "../../components/content/big-title-banner";
import Button from "../../components/primitives/button";
import Grid from "../../components/global/grid";

import WhiteArrow from "../../public/white-arrow.svg";

const IframeWrapper = styled.iframe`
  margin: 25px 0;
  min-height: 300vh;
  width: 100%;
`;

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
  if (!page || page === null) {
    return <ErrorPage statusCode={404} />;
  }

  // Destructure page payload and meta from global context
  const { member_content } = page;
  const { meta } = useContext(DefaultContext);

  const [theReports, setTheReports] = useState(member_content.body && member_content.body)

  // Monthly sales reports array needs to be flipped around
  // Check to see if it's here and reverse() it if it is
  useEffect(() => {
    // Transform state obj to just be the reports, in reverse order
    theReports.map( slice => {
      if ( slice.type === 'biz_intel_hub' && slice.fields.length > 1) {
        setTheReports(slice.fields.reverse())
      } 
    })
  }, [])  

  return (
    <>
      <script
        async
        defer
        src="https://static.cdn.prismic.io/prismic.js?new=true&repo=peopleforbikes"
      ></script>
      <SiteMeta
        desc={
          member_content.main_content
            ? `${member_content.main_content[0].text.substring(0, 180)} ... `
            : meta.desc
        }
        title={
          member_content.title
            ? `${member_content.title[0].text} | People for Bikes`
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
      <Wrapper postPath="/members" postTitle="Member Center" isWide="true">
        {member_content.title && (
          <BigTitleBanner>
            <Header1>{member_content.title[0].text}</Header1>
          </BigTitleBanner>
        )}
        <MainContent>
          {member_content.main_content && (
            <IntroWrapper>
              <RichText
                render={member_content.main_content}
                linkResolver={linkResolver}
              />
            </IntroWrapper>
          )}
          {member_content._meta.uid === "business-intelligence-hub" && (
            <>
              <IframeWrapper
                src="https://datastudio.google.com/embed/reporting/fe9c9fc6-ee8b-43a6-ae3a-1a2f20377a04/page/63ESB"
                frameBorder="0"
                allowFullScreen="allowfullscreen"
                aria-label="PeopleForBikes Business Intelligence Hub"
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

          {/* Monthly Sales Report Slice */}
          { member_content.body &&
            member_content.body.map((slice) => {
              if (slice.type === "biz_intel_hub") {
                return (
                  <MainContent maxWidth="800px">
                    <h2>{slice.primary.sectionTitle}</h2>
                    <Grid>
                      { slice.fields.map( (edition) => {
                        return(
                          <Box key={ edition.date }>
                            { edition.pdf_item && 
                              <Link href={ edition.pdf_item.url } passHref>
                                <a>
                                  <Text>
                                    { new Date(ParseDate( edition.date ))
                                        .toLocaleString('en-us', { 
                                          month: 'long', 
                                          year: 'numeric' 
                                        }
                                    ) }
                                  </Text>
                                  <Arrow src={WhiteArrow} width="46px" />
                                </a>
                              </Link>
                            }
                          </Box>
                        );
                      })}
                    </Grid>
                  </MainContent>
                );
              }
            })
          }

          {member_content._meta.uid !== "business-intelligence-hub" && (
            <Button
              buttonAlign="center"
              buttonBg="#D0021B"
              buttonBorder="none"
              buttonColor="white"
              buttonFontSize="24px"
              buttonMargin="50px 0 0 0"
              buttonPadding="10px 30px"
              buttonTextTransform="uppercase"
              href="/members"
            >
              Back to Member Center
            </Button>
          )}
        </MainContent>
      </Wrapper>
    </>
  );
}

export async function getServerSideProps({
  req,
  res,
  params,
  preview = false,
  previewData,
}) {
  const cookies = new Cookies(req, res);
  const token = cookies.get("auth-token");

  if (token) {
    const data = await auth0ValidateToken(token);

    if (data.loggedIn) {
      const pageData = await getSingleMemberPage(params.uid, previewData);

      if(pageData.member_content.body !== null ) {
            
        pageData.member_content.body.map( slice => {
          if ( slice.type === 'biz_intel_hub' && slice.fields.length > 1) {
            slice.fields.reverse()
          } 
        })
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
          destination: "/log-in",
          permanent: false,
        },
      };
    }
  } else {
    return {
      redirect: {
        destination: "/log-in",
        permanent: false,
      },
    };
  }
}