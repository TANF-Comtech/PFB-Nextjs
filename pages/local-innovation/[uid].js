import { useContext } from 'react'
import Link from 'next/link'
import { RichText } from 'prismic-reactjs'
import styled, { ThemeContext } from 'styled-components'

import { getPrograms, getProgramPage } from '../../lib/queries/local-innovation'
import { randomID, linkResolver } from '../../lib/utils'

import DefaultContext from '../../context/default/default-context'
import FallbackImage from '../../components/content/fallback-image'

import Wrapper from '../../components/global/wrapper'
import SiteMetaCustom from '../../components/meta/site-meta-custom'
import BigTitleBanner from '../../components/content/big-title-banner'
import Heading1 from '../../components/primitives/h1'
import MainContent from '../../components/global/main-content'
import Accordion from '../../components/global/accordion'
import Promo from '../../components/slices/promo'
import VisualGrid from '../../components/global/visual-grid'
import YouthBikingMap from '../../components/content/youth-biking-map'

const RedHeading = styled.h2`
  color: ${ props => props.theme.red };
  font-weight: 700;
  text-transform: uppercase;
`

export default function ProgramPage({ 
  fallback,
  page, 
  preview 
}) {

  // Destructure topic from main page payload and meta from global context
  const { program } = page
  const { meta } = useContext(DefaultContext)
  const themeProps = useContext(ThemeContext)

  // console.log(program)

  return (
    <>
      <SiteMetaCustom
        desc={ program.intro ? ( `${ program.intro.substring(0,180) }... ` ) : ( meta.desc ) }
        title={ program.title ? ( `${ program.title[0].text } | PeopleForBikes` ) : ( meta.title ) }
        path={ program ? ( `https://www.peopleforbikes.org/local-innovation/${program._meta.uid}` ) : ( meta.path ) }
      />

      <Wrapper 
        postPath={ program.body && "/local-innovation" }
        postTitle={ program.body && "Local Innovation" } 
        isWide={ true }
      >
        { program.title && 
          <BigTitleBanner>
            <Heading1>
              { program.title[0].text }
            </Heading1>
          </BigTitleBanner>
        }

        { program.body &&
          program.body.map((slice) => {

            // SUMMARY BLOCK
            if (slice.type === "content_block" ) {
              return (
                <MainContent
                  contentPadding="4vh 4vw"
                >
                  <RichText render={ slice.primary.main_content } />
                </MainContent>
              )
            }

            // PROMOS
            if (slice.type === "promo" ) {
              return (
                <MainContent
                  contentPadding="6vh 4vw"
                >
                  <Promo
                    bigWords={ slice.primary.bottom_text ? slice.primary.bottom_text : null }
                    path={ slice.primary.link ? linkResolver(slice.primary.link) : null}
                    smallWords={ slice.primary.top_text ? slice.primary.top_text : null }
                    source={ slice.primary.main_image.url }
                  />
                </MainContent>
              )
            }

            // PILLARS (Accordions)
            if (slice.type === "policy_pillar" ) {
              return (
                <>
                <MainContent
                  bgColor={ themeProps.midnightBlue }
                  contentPadding="8vh 4vw 2vh 4vw"
                  textColor="#fff"
                >
                  <h2 style={{ margin: 0 }}>
                    { slice.primary.long_name ? 
                      slice.primary.long_name : 
                      "Our Strategy"
                    }
                  </h2>
                </MainContent>
                <MainContent
                  bgColor={ themeProps.midnightBlue }
                  contentPadding="0 4vw 8vh 4vw"
                  textColor="#fff"
                >
                  { slice.fields && 
                    slice.fields.map((field) => {
                      return(
                        <Accordion
                          darkMode={ true }
                          key={ randomID(1234567890) }
                          title={ field.sub_pillar }
                        >
                          <p>{ field.sub_pillar_summary }</p>
                          { (field.news_item_1 || field.news_item_2 || field.news_item_3) &&
                            <strong>Our Work in This Area:</strong>
                          }
                          <ul>
                            { field.news_item_1 && <li>
                              <Link href={ linkResolver(field.news_item_1) } passHref>
                                <a>
                                  { field.news_item_title_1  }
                                </a>
                              </Link>
                            </li> }
                            { field.news_item_2 && <li>
                              <Link href={ linkResolver(field.news_item_2) } passHref>
                                <a>
                                  { field.news_item_title_2  }
                                </a>
                            </Link>
                            </li> }
                            { field.news_item_3 && <li>
                              <Link href={ linkResolver(field.news_item_3) } passHref>
                                <a>
                                  { field.news_item_title_3 }
                                </a>
                              </Link>
                            </li> }                                        
                          </ul>
                        </Accordion>
                      )
                    })
                  }
                </MainContent>
                { program._meta.uid === 'youth-cycling-programs' && 
                  <>
                    <MainContent
                      contentPadding="8vh 4vw 2vh 4vw"
                      maxWidth="1200px"
                    >
                      <RedHeading>National Youth Program Map</RedHeading>
                      <hr />
                    </MainContent>
                    <MainContent
                      contentPadding="0vh 4vw 4vh 4vw"
                      maxWidth="800px"
                    >
                      <YouthBikingMap />
                    </MainContent>
                  </>
                }
                </>
              )
            }  
            
            // NEWS
            if (slice.type === "related_news") {
              return(
                <>
                  <MainContent
                    contentPadding="8vh 4vw 0vh 4vw"
                  >
                    <RedHeading>Recent News</RedHeading>
                    <hr />
                  </MainContent>
                  <MainContent
                    contentPadding="0vh 4vw 4vh 4vw"
                  >
                    { slice.fields.map( (item) => {
                      return(
                        <ul>
                          { item.news_item_title && item.news &&
                            <li>
                              <Link href={ linkResolver(item.news) } passHref>
                                <a>
                                  { item.news_item_title }
                                </a>
                              </Link>
                            </li> 
                          }                                      
                        </ul>
                      )
                    })} 
                  </MainContent>       
                </>
              )
            }
            
            // LOGOS (<VisualGrid>)
            if (slice.type === "visual_grid") {
              return(
                <>
                  <MainContent
                    contentPadding="8vh 4vw 4vh 4vw"
                  >
                    <RedHeading>Program Partners</RedHeading>
                    <hr />
                  </MainContent>
                  <MainContent
                    contentPadding="0vh 4vw 8vh 4vw"
                  >
                    <VisualGrid
                      isOneItem={ slice.fields.length === 1 ? true : false }
                      payload={ slice.fields }
                      title={ slice.primary.grid_title }
                    />
                  </MainContent>
                </>
              )
            }            
        })}

      </Wrapper>
    </>    
  )
}

/* The return here sends the `page` prop back to the TopicPage component above for rendering */
export async function getStaticProps({ params, preview = false, previewData }) {
  const pageData = await getProgramPage(params.uid, previewData)

  return {
    props: {
      fallback: FallbackImage(),
      preview,
      page: pageData
    },
    revalidate: 60,
  }
}

// getStaticPaths requires the whole paths argument to be objects of URL it needs to statically render server-side
export async function getStaticPaths() {
  const allPrograms = await getPrograms()

  return {
    paths: allPrograms?.map(({ node }) => `/local-innovation/${node._meta.uid}`) || [],
    fallback: false,
  }
}