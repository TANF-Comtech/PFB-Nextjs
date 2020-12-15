import { useContext } from 'react'
import ErrorPage from 'next/error'
import { Date as ParseDate } from 'prismic-reactjs'

import { getTopics, getSingleTopicPage } from '../../lib/queries/topics'
import { randomID, setDateSuffix } from '../../lib/utils'

import DefaultContext from '../../context/default-context'

import Wrapper from '../../components/global/wrapper'
import SiteMeta from '../../components/meta/site-meta'
import HeaderImage from '../../components/global/header-image'
import MainContent from '../../components/global/main-content'
import ContentItem from '../../components/content/content-item'


/* You must reference the `topic` prop to get data from `getStaticProps` - check bottom of this file */
export default function TopicPage({ page, preview }) {
  if( !page || page === null ) {
    return <ErrorPage statusCode={404} />
  }

  console.log(page)

  // Destructure topic out of page prop
  const { topic } = page[0]
  const { meta } = useContext(DefaultContext)

  

  return (
    <>
      <SiteMeta
        desc={ topic.intro ? ( `${ topic.intro.substring(0,180) }... ` ) : ( meta.desc ) }
        title={ topic.title ? ( `${ topic.title[0].text } | People for Bikes` ) : ( meta.title ) }
        imgHeight={ topic.banner_image ? ( topic.banner_image['1x'].dimensions.height ) : ( meta.imgHeight )  }
        imgSrc={ topic.banner_image ? ( topic.banner_image['1x'].url ) : ( meta.imgSrc ) }
        imgWidth={ topic.banner_image ? ( topic.banner_image['1x'].dimensions.width ) : ( meta.imgWidth ) }
        path={ topic ? ( `https://www.peopleforbikes.org/topics/${topic._meta.uid}` ) : ( meta.path ) }
      />    
      <Wrapper 
        postPath="/topics/"
        postTitle="Topics"
        isWide={ topic.banner_image ? true : false }
      >
        { topic.banner_image ? (
          <HeaderImage 
            headingRGBA="255,255,255,1"
            source={ topic.banner_image.url }
          >
            <h1>{topic.title[0].text}</h1>
          </HeaderImage>
        ) : (
          <h1>{topic.title[0].text}</h1>
        ) }
        
        <MainContent>
          { page[1].length !== 0 ? ( 
            <>
              <h2>PeopleForBikes at Work on { topic.title[0].text }</h2>
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
            <>
            </>
          )}
           
        </MainContent>     
      </Wrapper>
    </>
  )
}

/* The return here sends the `page` prop back to the TopicPage component above for rendering */
export async function getStaticProps({ params, preview = false, previewData }) {
  const pageData = await getSingleTopicPage(params.uid, previewData)

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
  const allTopics = await getTopics()
  return {
    paths: allTopics?.map(({ node }) => `/topics/${node._meta.uid}`) || [],
    fallback: true,
  }
}