import { useContext } from 'react'
import ErrorPage from 'next/error' 
import styled from 'styled-components'
import { RichText } from 'prismic-reactjs'
import Link from 'next/link'

import { getReports, 
         getSingleReportPage } from '../../lib/queries/reports'
import { linkResolver } from '../../lib/utils'

import DefaultContext from '../../context/default/default-context'

import Wrapper from '../../components/global/wrapper'
import SiteMeta from '../../components/meta/site-meta'
import MainContent from '../../components/global/main-content'
import Header1 from '../../components/primitives/h1'
import Promo from '../../components/slices/promo'
import Grid from '../../components/global/grid'

import ResearchPromo from '../../public/promo/promo-research.jpg'
import WhiteArrow from '../../public/white-arrow.svg'

const Box = styled.div`
  align-items: center;
  background-color: ${props => props.theme.midnightBlue};
  display: flex;
  justify-content: center;
  min-height: 190px;
  padding: 25px;
`

const Text = styled.h4`
  color: ${props => props.theme.blueBright};
  font-size: 36px;
  font-weight: 700;
  line-height: 36px;
  margin: 0 0 10px 0;
  text-align: center;
  text-transform: uppercase;

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

const IntroWrapper = styled.div`
  margin: 3vh 0 1vh 0;
`

const GridWrapper = styled.section`
  margin: 2vh 0;
`

const ParagraphOfLinks = styled.p`
  a, a:visited, a:focus, a:hover {
    &:after {
      color: black;
      content: "|";
      padding: 0 10px;
      text-decoration: none;
    }

    &:last-child:after {
      content: "";
      padding: 0;
    }
  }
`

const ReportContainer = styled.section`
  margin: 5vh 0;
`

export default function ReportPage({ page, preview }) {
  if( !page || page === null ) {
    return <ErrorPage statusCode={404} />
  }

  // Destructure page payload and meta from global context
  const { report } = page
  const { meta } = useContext(DefaultContext)

  return (
    <>
      <SiteMeta
        desc={ report.main_content ? ( `${ report.main_content[0].text.substring(0,180) } ... ` ) : ( meta.desc ) }
        title={ report.title ? ( `${ report.title[0].text } | People for Bikes` ) : ( meta.title ) }
        imgHeight={ meta.imgHeight }
        imgSrc={ meta.imgSrc }
        imgWidth={ meta.imgWidth }
        path={ report ? ( `https://www.peopleforbikes.org/reports/${report._meta.uid}` ) : ( meta.path ) }
      />    
      <Wrapper 
        postPath="/reports"
        postTitle="Reports"
        isWide="true"
      >        
        <MainContent>
          <Header1>Report</Header1>
          <hr />

          <ReportContainer>
          { report.title && 
            <>
              <h2>
                { report.title[0].text }
              </h2>
            </>
            
          }          
          { report.year && 
            <>
              <strong>Publication Year:</strong>
              <p>{ report.year }</p>
            </>
          }          
          { report.summary && 
            <IntroWrapper>
              <strong>Summary:</strong>
              <RichText render={ report.summary } linkResolver={ linkResolver } />
            </IntroWrapper>
          }
          { report.pdf &&
            <>
              <strong>Full Report (Download):</strong>
              <p>
                <Link href={ report.pdf.url } passHref >
                  <a target="_blank" rel="noopener">
                    <strong>Download PDF</strong>
                  </a>
                </Link>
              </p>
            </>
          }
          { report.link &&
            <>
              <strong>Full Report (Link):</strong>
              <p>
                <Link href={ linkResolver(report.link) } passHref>
                  <a>
                    <strong>Link to Report</strong>
                  </a>
                </Link>
              </p>
            </>
          }          
          { report.body &&
            report.body.map( (slice) => {
              return(
                slice.__typename === "ReportBodyMultiPage_report" && 
                <>
                  <p>
                    <strong>Supplemental Files:</strong>
                  </p>
                  <GridWrapper>
                    <Grid>
                      { slice.fields.map( (doc) => {
                        return(
                          <Box key={ doc.pdf_doc.size }>
                            <a href={ doc.pdf_doc.url } target="_blank" rel="noopener">
                              <Text>
                                { doc.link_name }
                              </Text>
                              <Arrow src={ WhiteArrow } width="46px" />
                            </a>
                          </Box>
                        )
                      })}
                    </Grid>
                  </GridWrapper>
                </>
              )
            })
          }
          { report.topics &&
            <>
            { report.topics[0].topic !== null &&
              <strong>Related Topics:</strong>
            }
            <ParagraphOfLinks>
              { report.topics.map( (topic) => {
                if(topic.topic !== null) {
                  return(
                    <a 
                      href={ `/topics/${ topic.topic._meta.uid }` }
                      key={ topic.topic._meta.id }
                    >
                      <strong>{ topic.topic.title[0].text }</strong>
                    </a>
                  )
                }
              })}
            </ParagraphOfLinks>
            </>
          }            
          { report.locations && 
            <>
            { report.locations[0].location !== null &&
              <strong>Related Locations:</strong>
            }
            <ParagraphOfLinks>
              { report.locations.map( (location) => {
                if( location.location !== null ) {
                  return(
                    <a 
                      href={ `/locations/${ location.location._meta.uid }` }
                      key={ location.location._meta.id }
                    >
                      <strong>{ location.location.location[0].text }</strong>
                    </a>
                  )
                }
              })}
            </ParagraphOfLinks>
            </>
          }          
          </ReportContainer>
        </MainContent>

        <Promo 
          bigWords="Research Library"
          path="/research"
          smallWords="Explore More Reports In Our"
          source={ ResearchPromo }
        /> 

      </Wrapper>
    </>
  )
}

/* The return here sends the `page` prop back to the Page component above for rendering */
export async function getStaticProps({ params, preview = false, previewData }) {
  const pageData = await getSingleReportPage(params.uid, previewData)

  return {
    props: {
      preview,
      page: pageData ?? null,
    },
    revalidate: 60,
  }
}

// getStaticPaths requires the whole paths argument to be objects of URL it needs to statically render server-side
export async function getStaticPaths() {
  const pages = await getReports()
  return {
    paths: pages?.map(({ node }) => `/reports/${node._meta.uid}`) || [],
    fallback: false,
  }
}