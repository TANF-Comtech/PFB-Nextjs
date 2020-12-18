import { useContext } from 'react'
import ErrorPage from 'next/error'
import Link from 'next/link'
import { Date as ParseDate } from 'prismic-reactjs'
import styled from 'styled-components'

import { getPolicies, getSinglePolicyPage } from '../../lib/queries/policies'
import { randomID, setDateSuffix } from '../../lib/utils'

import DefaultContext from '../../context/default-context'

import Wrapper from '../../components/global/wrapper'
import SiteMeta from '../../components/meta/site-meta'
import MainContent from '../../components/global/main-content'
import Header1 from '../../components/primitives/h1'
import PolicyItem from '../../components/content/policy-item'
import SummaryBlock from '../../components/content/summary-block'

const SpacedHeading = styled.h2`
  margin: 4vh 0;
`

/* You must reference the `policy` prop to get data from `getStaticProps` - check bottom of this file */
export default function policyPage({ page, preview }) {
  if( !page || page === null ) {
    return <ErrorPage statusCode={404} />
  }

  // Destructure page payload and meta from global context
  const { policy } = page
  const { meta } = useContext(DefaultContext)

  return (
    <>
      <SiteMeta
        desc={ policy.main_content ? ( `${ policy.main_content[0].text.substring(0,180) } ... ` ) : ( meta.desc ) }
        title={ policy.title ? ( `${ policy.title[0].text } | People for Bikes` ) : ( meta.title ) }
        imgHeight={ meta.imgHeight }
        imgSrc={ meta.imgSrc }
        imgWidth={ meta.imgWidth }
        path={ policy ? ( `https://www.peopleforbikes.org/policy/${policy._meta.uid}` ) : ( meta.path ) }
      />    
      <Wrapper 
        postPath="/policy"
        postTitle="Policy"
        isWide="false"
      >
        <MainContent>
          <PolicyItem 
            bill={ policy.bill_link ? policy.bill_link : null }
            city={ policy.city ? policy.city : null }
            date={ policy.year ? policy.year : null }
            fullDisplay="true"
            govLevel={ policy.government_level ? policy.government_level : null }
            location={ policy.location ? policy.location.location[0].text : null }
            status={ policy.status ? policy.status : null }
            supportingDoc={ policy.supporting_document ? policy.supporting_document : null }
            title={ policy.title[0].text }
            text={ policy.main_content ? policy.main_content : null }
          />
        </MainContent>

        {/* 
        <SummaryBlock
          bgColor="#002C40"
          maxWidth="900px"
          textColor="#fff"
        >
          <p>{ policy.intro }</p>
        </SummaryBlock>

        { policy.body ? (
          <MainContent maxWidth="900px">
            { pillars[0].fields.map( pillar => {
              return(
                <Accordion
                  key={ randomID(1234567890) }
                  title={ pillar.sub_pillar }
                >
                  <p>{ pillar.sub_pillar_summary }</p>
                  { (pillar.news_item_1 || pillar.news_item_2 || pillar.news_item_3) &&
                    <strong>Our Work in This Area:</strong>
                  }
                  <ul>
                    { pillar.news_item_1 && <li>
                      <Link href={ `/news/${ pillar.news_item_1._meta.uid }` } passHref>
                        <a>
                          { pillar.news_item_1.title[0].text  }
                        </a>
                      </Link>
                    </li> }
                    { pillar.news_item_2 && <li>
                      <Link href={ `/news/${ pillar.news_item_2._meta.uid }` } passHref>
                        <a>
                          { pillar.news_item_2.title[0].text  }
                        </a>
                    </Link>
                    </li> }
                    { pillar.news_item_3 && <li>
                      <Link href={ `/news/${ pillar.news_item_3._meta.uid }` } passHref>
                        <a>
                          { pillar.news_item_3.title[0].text  }
                        </a>
                      </Link>
                    </li> }                                        
                  </ul>
                </Accordion>
              )
            } ) }
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
            { page[1].length !== 0 ? ( 
              <>
                <SpacedHeading>
                  PeopleForBikes at Work on { policy.title[0].text }
                </SpacedHeading>
                <h3>News</h3>
                { page[1].map( (newsItem) => {
                
                  // Check for publication_date from individual news post
                  // If not present, use publication date from Prismic CMS
                  const newDate = newsItem.data.publication_date ? 
                    ( new Date(ParseDate( newsItem.data.publication_date ))) : 
                    ( new Date(ParseDate( newsItem.last_publication_date )))
                  return (
                    <ContentItem 
                      date={ `${newDate.toLocaleString('en-us', { month: 'long' } )} 
                              ${setDateSuffix(newDate.getDate())}, 
                              ${newDate.getFullYear()}` }
                      key={ newsItem.id }
                      image={ newsItem.data.header_image && newsItem.data.header_image }
                      path={ `/news/${newsItem.uid}` }
                      text={ newsItem.data.main_content[0].type === "paragraph" ? newsItem.data.main_content[0].text : "" }
                      title={ newsItem.data.title[0].text }
                    />
                  )
                })} 
              </>
            ) : (
              <></>
            )}
          </MainContent>          
        ) }
         */}
      </Wrapper>
    </>
  )
}

/* The return here sends the `page` prop back to the policyPage component above for rendering */
export async function getStaticProps({ params, preview = false, previewData }) {
  const pageData = await getSinglePolicyPage(params.uid, previewData)

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
  const policies = await getPolicies()
  return {
    paths: policies?.map(({ node }) => `/policy/${node._meta.uid}`) || [],
    fallback: true,
  }
}