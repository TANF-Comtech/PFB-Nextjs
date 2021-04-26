import styled from 'styled-components'
import Link from 'next/link'

import { getReports } from '../../lib/queries/reports'
import { linkResolver, randomID } from '../../lib/utils'

import Wrapper from '../../components/global/wrapper'
import MainContent from '../../components/global/main-content'
import Header1 from '../../components/primitives/h1'
import Promo from '../../components/slices/promo'
import Button from '../../components/primitives/button'

import ResearchPromo from '../../public/promo/promo-research.jpg'

import { AlgoliaIndex } from '../../lib/algolia/algoliaClient'
import { reportsFormatter } from '../../lib/algolia/reportsFormatter'

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
        <Header1 key={ randomID(5687502984) }>Reports Archive</Header1>

        { years && years.map( (year) => {
          return(
            <ReportSection key={ year }>
              <ReportSectionHeader key={ randomID(120981371398475) }>
                <h2>{ year }</h2>
                <hr />
              </ReportSectionHeader>
              
              { page.map( (report) => {
                if( report.node.year === year) {

                  return(
                    <>
                      { report.node.title &&
                        <ReportListItem
                          key={report.node._meta.id} 
                        >
                          <Link 
                            href={ linkResolver(report.node._meta) } 
                            passHref >
                            <a>
                              <strong>{ report.node.title[0].text }</strong>
                            </a>
                          </Link>
                          { report.node.summary &&
                            <p>
                              { `${report.node.summary[0].text.substring(0,180)} ...` }
                            </p>    
                          }
                          <Button
                            buttonBg="#404040"
                            buttonBgHover="rgb(216,216,216)"
                            buttonColor="white"
                            buttonMargin="0 0 20px 0"
                            buttonPadding="10px 20px"
                            buttonTextTransform="uppercase"
                            href={ linkResolver(report.node._meta) }
                          >
                            Read More
                          </Button>
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

  const algoliaFormattedData = reportsFormatter(pageData)
  await AlgoliaIndex().saveObjects(algoliaFormattedData)

  return {
    props: {
      preview,
      page: pageData ?? null,
    },
    revalidate: 1,
  }
}