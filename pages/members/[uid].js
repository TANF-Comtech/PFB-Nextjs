import { useContext } from 'react'
import ErrorPage from 'next/error' 
import styled from 'styled-components'
import { RichText, Date as ParseDate } from 'prismic-reactjs'
import Link from 'next/link'

import { getMemberPages, 
         getSingleMemberPage } from '../../lib/queries/member-center'
import { linkResolver } from '../../lib/utils'

import DefaultContext from '../../context/default/default-context'

import Wrapper from '../../components/global/wrapper'
import SiteMeta from '../../components/meta/site-meta'
import MainContent from '../../components/global/main-content'
import Header1 from '../../components/primitives/h1'
import BigTitleBanner from '../../components/content/big-title-banner'
import Button from '../../components/primitives/button'
import Grid from '../../components/global/grid'

import WhiteArrow from '../../public/white-arrow.svg'

const IframeWrapper = styled.iframe`
  margin: 25px 0;
  min-height: 300vh;
  width: 100%;
`

const IntroWrapper = styled.div`
  margin: 3vh 0 1vh 0;
`

const Box = styled.div`
  background-color: ${props => props.theme.blueBright};
  min-height: 190px;
  padding: 25px;
`

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
`

const Arrow = styled.img`
  display: block;
  margin: 0 auto;
  width: 46px;
`

export default function MembersPage({ page, preview }) {
  if( !page || page === null ) {
    return <ErrorPage statusCode={404} />
  }

  // Destructure page payload and meta from global context
  const { member_content } = page
  const { meta } = useContext(DefaultContext)

  return (
    <>
      <SiteMeta
        desc={ member_content.main_content ? ( `${ member_content.main_content[0].text.substring(0,180) } ... ` ) : ( meta.desc ) }
        title={ member_content.title ? ( `${ member_content.title[0].text } | People for Bikes` ) : ( meta.title ) }
        imgHeight={ meta.imgHeight }
        imgSrc={ meta.imgSrc }
        imgWidth={ meta.imgWidth }
        path={ member_content ? ( `https://www.peopleforbikes.org/members/${member_content._meta.uid}` ) : ( meta.path ) }
      />    
      <Wrapper 
        postPath="/members"
        postTitle="Member Center"
        isWide="true"
      >
        { member_content.title && 
          <BigTitleBanner>
            <Header1>
              { member_content.title[0].text }
            </Header1>
          </BigTitleBanner>
        }        
        <MainContent>
          { member_content.main_content && 
            <IntroWrapper>
              <RichText render={ member_content.main_content } linkResolver={ linkResolver } />
            </IntroWrapper>
          }           
          { member_content._meta.uid === 'business-intelligence-hub' &&
            <>
              <IframeWrapper 
                src="https://datastudio.google.com/embed/reporting/fe9c9fc6-ee8b-43a6-ae3a-1a2f20377a04/page/63ESB" 
                frameBorder="0" 
                allowFullScreen="allowfullscreen"
                aria-label="PeopleForBikes Business Intelligence Hub" />
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
          }

          {/* BIZ INTEL SLICE */}
          { member_content.body && 
            member_content.body.map( (slice) => {
              if( slice.type === "biz_intel_hub" ) {
                return (
                  <MainContent maxWidth="800px"> 
                    <h2>{ slice.primary.sectionTitle }</h2>
                    <Grid>
                      { slice.fields.map( (edition) => {
                        const newDate = new Date(ParseDate( edition.date ))
                        const newDateOptions = { month: 'long', day: 'numeric', year: 'numeric' }
                        return(
                          <Box key={ edition.date }>
                            <Link href={ edition.pdf_item.url } passHref>
                              <a>
                                <Text>
                                  Week of { newDate.toLocaleString('en-us', newDateOptions) }
                                </Text>
                                <Arrow src={ WhiteArrow } width="46px" />
                              </a>
                            </Link>
                          </Box>
                        )
                      })}
                    </Grid>
                  </MainContent>
                )
              }
            })            
          }
          { member_content._meta.uid !== 'business-intelligence-hub' &&
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
          }
        </MainContent>

      </Wrapper>
    </>
  )
}

/* The return here sends the `page` prop back to the member_contentPage component above for rendering */
export async function getStaticProps({ params, preview = false, previewData }) {
  const pageData = await getSingleMemberPage(params.uid, previewData)

  return {
    props: {
      preview,
      page: pageData ?? null,
    },
    revalidate: 1,
  }
}

// getStaticPaths requires the whole paths argument to be objects of URL it needs to statically render server-side
export async function getStaticPaths() {
  const pages = await getMemberPages()
  return {
    paths: pages?.map(({ node }) => `/members/${node._meta.uid}`) || [],
    fallback: true,
  }
}