import { useContext } from 'react'
import ErrorPage from 'next/error' 
import styled from 'styled-components'
import { RichText } from 'prismic-reactjs'
import Link from 'next/link'

import { getReports } from '../../lib/queries/reports'
import { linkResolver } from '../../lib/utils'

import DefaultContext from '../../context/default/default-context'

import Wrapper from '../../components/global/wrapper'
import SiteMeta from '../../components/meta/site-meta'
import MainContent from '../../components/global/main-content'
import Header1 from '../../components/primitives/h1'
import Promo from '../../components/slices/promo'
import Grid from '../../components/global/grid'
import Rule from '../../components/primitives/rule'

import ResearchPromo from '../../public/promo/promo-research.jpg'
import WhiteArrow from '../../public/white-arrow.svg'

const ReportSection = styled.section`
  margin: 5vh 0;
`

const ReportSectionHeader = styled.header`
  margin-bottom: 3vh;
`

const ReportListItem = styled.div`
  border-bottom: 1px solid ${ props => props.theme.lightestGray };
  margin: 2.5vh 0 1.25vh 0;
  padding-bottom: 1.75vh;

  &:last-child {
    border-bottom: none;
  }
`

export default function ReportsArchive({ page }) {

  // Getting an array of years from all reports, build a matrix
  // Set up years array, just look at first element and store it in position 0
  let years = [page[0].node.year]

  // Then look through all page nodes at their years
  // If they don't match, push that year into array
  // But how? Always compare current node year to the last item that has been pushed into arr
  page.map( (report) => {
    if( report.node.year !== years[years.length-1]) {
      years.push(report.node.year)
    }
  })
  years.pop() // gets rid of last null

  return (
    <Wrapper 
      postPath="/research/"
      postTitle="Research"
      isWide={ true }
    >
      <MainContent maxWidth="1200px">
        <Header1>Reports Archive</Header1>

        { years && years.map( (year) => {
          return(
            <ReportSection>
              <ReportSectionHeader>
                <h2 key={ year }>{ year }</h2>
                <hr />
              </ReportSectionHeader>
              
              { page.map( (report) => {
                if( report.node.year === year) {
                  return(
                    <>
                      { report.node.title &&
                        <ReportListItem>
                          <Link 
                            href={`/reports/${report.node._meta.uid}`} 
                            passHref >
                            <a>
                              <strong>{ report.node.title[0].text }</strong>
                            </a>
                          </Link>    
                        </ReportListItem>
                      }
                    </>
                  )
                }
              })}
            </ReportSection>
          )
        }) }         
      </MainContent>

      <Promo 
        bigWords="Research Library"
        path="/research"
        smallWords="Explore More Reports In Our"
        source={ ResearchPromo }
      /> 
    </Wrapper>
  )
}

/* The return here sends the `page` prop back to the component above for rendering */
export async function getStaticProps({ params, preview = false, previewData }) {
  const pageData = await getReports()

  return {
    props: {
      preview,
      page: pageData ?? null,
    },
    revalidate: 1,
  }
}