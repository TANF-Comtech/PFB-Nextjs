import Link from 'next/link'
import styled from "styled-components"
import { Date as ParseDate } from 'prismic-reactjs'

import { newsTopTwenty } from '../lib/queries/news'
import { linkResolver, setDateSuffix } from '../lib/utils'

import HeaderImage from '../components/global/header-image'
import Wrapper from '../components/global/wrapper'
import MainContent from '../components/global/main-content'
import ContentItem from '../components/content/content-item'

const BigBlueBanner = styled.header`
  background-color: ${props => props.theme.midnightBlue};

  h1 {
    color: white;
    text-transform: uppercase;
  }
`

export default function Homepage({ page }) {
  
  
  console.log(page)

  return (
    <>  
      <Wrapper 
        postTitle="Latest News from PeopleForBikes"
        isWide={ true }
      >
        <BigBlueBanner>
          <MainContent>
            <h1>News</h1>
          </MainContent>
        </BigBlueBanner>

        {/* <HeaderImage 
          headingRGBA="255,255,255,1"
          source={ HPHero }
        >
          <span>Together We Make</span>
          <h1>Biking Better</h1>
        </HeaderImage> */}

        { page &&
          <>
            <MainContent>
              { page.map( (news) => { 
                
                // Check for publication_date from individual news post
                // If not present, use publication date from Prismic CMS
                const newDate = news.node.publication_date ? 
                  ( new Date(ParseDate( news.node.publication_date ))) : 
                  ( new Date(ParseDate( news.node._meta.lastPublicationDate )))
                return (
                  <ContentItem 
                    date={ `${newDate.toLocaleString('en-us', { month: 'long' } )} 
                            ${setDateSuffix(newDate.getDate())}, 
                            ${newDate.getFullYear()}` }
                    key={ news.node._meta.id }
                    image={ news.node.header_image && news.node.header_image }
                    path={ `/news/${news.node._meta.uid}` }
                    text={ news.node.main_content[0].type === "paragraph" ? news.node.main_content[0].text : "" }
                    title={ news.node.title[0].text }
                  />
                )
              })}
            </MainContent>
          </>
        }

      </Wrapper>
    </>
  )
}

/* The return here sends the `page` prop back to the component above for rendering */
export async function getStaticProps({ params, preview = false, previewData }) {
  const pageData = await newsTopTwenty()

  return {
    props: {
      preview,
      page: pageData ?? null,
    },
    revalidate: 1,
  }
}