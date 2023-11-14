import React, { useContext } from 'react';
import styled from 'styled-components';
import { PrismicRichText } from '@prismicio/react';
import Link from 'next/link';
import GlobalStyle from '~/styles/global-css';

import { htmlSerializer } from '~/lib/prismic/htmlSerializer';
import { getReports, getSingleReportPage } from '~/lib/queries/reports';
import { linkResolver } from '~/utils';
import data from '~/data';

import Promo from '~/components/promo';
import Grid from '~/components/grid';

import { Page } from '~/components/new/page';

import ResearchPromo from '~/public/new/Research_Promo.jpg';

const Box = styled.div`
  align-items: center !important;
  background-color: ${(props) => props.theme.midnightBlue} !important;
  display: flex !important;
  justify-content: center !important;
  min-height: 190px !important;
  padding: 25px !important;
`;

const Text = styled.h4`
  color: ${(props) => props.theme.blueBright} !important;
  font-size: 36px !important;
  font-weight: 700 !important;
  line-height: 36px !important;
  margin: 0 0 10px 0 !important;
  text-align: center !important;
  text-transform: uppercase !important;
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

const IntroWrapper = styled.div`
  margin: 3vh 0 1vh 0 !important;
`;

const GridWrapper = styled.section`
  margin: 2vh 0 !important;
`;

const ParagraphOfLinks = styled.p`
  a,
  a:visited,
  a:focus,
  a:hover {
    &:after {
      color: black !important;
      content: '|' !important;
      padding: 0 10px !important;
      text-decoration: none !important;
    }
    &:last-child:after {
      content: '' !important;
      padding: 0 !important;
    }
  }
`;

const ReportContainer = styled.section`
  margin: 5vh 0 !important;
`;

export default function ReportPage({ page, preview }) {
  // Destructure page payload and meta from global context
  const { report } = page;
  const { meta } = data;

  console.log(report)

  return (
    <>
    <GlobalStyle />
    <Page 
      title={report.title ? `${report.title[0].text} | PeopleForBikes` : meta.title} 
      showDonate={false}
    >
      <div className="mx-auto max-w-screen-xl p-8 pb-0 mt-36 md:p-16">
        <h1 className="font-dharma text-7xl font-bold">Report</h1>
        <hr className="mt-5" />
        <ReportContainer>
          { report.title && (
            <>
              <h2 className='font-dharma text-5xl mb-5'>{report.title[0].text}</h2>
            </>
          )}
          { report.report_tags &&
            <div className="flex flex-wrap gap-2">
              <span className="font-bold text-black/80">Topic:&nbsp;</span> 
              { report.report_tags.map((tag, i) => (
                <span 
                  className="rounded bg-lightestGray px-1 py-1 text-xs font-bold uppercase"
                  key={ i }
                >
                  {tag.tag.tag_name}
                </span>
              ))}
            </div>
          }
          { report.report_type &&
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="font-bold text-black/80">Type:&nbsp;</span> 
              { report.report_type.map((type, i) => (
                <span 
                  className="rounded bg-lightestGray px-1 py-1 text-xs font-bold uppercase"
                  key={ i }
                >
                  {type.type.type}
                </span>
              ))}
            </div>
          }
          { report.authors &&
            <div className="mt-2 line-clamp-3 leading-normal text-black/80">
              <span className="font-bold text-black/80">Author:&nbsp;</span> 
              { report.authors }
            </div>
          }
          { report.year &&
            <div className="mt-2 line-clamp-3 leading-normal text-black/80">
              <span className="font-bold text-black/80">Year:&nbsp;</span> 
              { report.year }
            </div>   
            
          }
          {report.summary && (
            <>
            <span className="font-bold block text-black/80 mt-2">Summary:&nbsp;</span> 
            <div className="mt-2 leading-normal text-black/80 legacy-page">
              <PrismicRichText 
                field={report.summary} 
                linkResolver={linkResolver} 
                components={ htmlSerializer }
              />
            </div> 
            </>
          )}
          {report.pdf && (
            <div className='legacy-page'>
              <strong>Full Report (Download):</strong>
              <p>
                <Link href={report.pdf.url} passHref target="_blank" rel="noopener">
                  <strong>Download PDF</strong>
                </Link>
              </p>
            </div>
          )}
          {report.link && (
            <div className='legacy-page'>
              <strong>Full Report (Link):</strong>
              <p>
                <Link href={linkResolver(report.link)} passHref>
                  <strong>Link to Report</strong>
                </Link>
              </p>
            </div>
          )}
          {report.body &&
            report.body.map((slice) => {
              return (
                slice.__typename === 'ReportBodyMultiPage_report' && (
                  <div class="legacy-page">
                    <p>
                      <strong>Supplemental Files:</strong>
                    </p>
                    <GridWrapper>
                      <Grid>
                        {slice.fields.map((doc) => {
                          return (
                            <Box key={doc.pdf_doc.size}>
                              <a href={doc.pdf_doc.url} target="_blank" rel="noopener">
                                <Text>{doc.link_name}</Text>
                                <Arrow src="/white-arrow.svg" />
                              </a>
                            </Box>
                          );
                        })}
                      </Grid>
                    </GridWrapper>
                  </div>
                )
              );
            })}
        </ReportContainer>        
      </div>
      <Promo
        bigWords=""
        path="/research"
        smallWords="Explore More Reports"
        source={ResearchPromo}
      />    
    </Page>
    </>
  );
}

/* The return here sends the `page` prop back to the Page component above for rendering */
export async function getStaticProps({ params, preview = false, previewData }) {
  const pageData = await getSingleReportPage(params.uid, previewData);

  return {
    props: {
      preview,
      page: pageData ?? null,
    },
    revalidate: 60,
  };
}

// getStaticPaths requires the whole paths argument to be objects of URL it needs to statically render server-side
export async function getStaticPaths() {
  const pages = await getReports();
  return {
    paths: pages?.map(({ node }) => `/reports/${node._meta.uid}`) || [],
    fallback: false,
  };
}
