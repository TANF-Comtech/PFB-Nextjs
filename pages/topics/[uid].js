import Head from 'next/head'
import ErrorPage from 'next/error'

import { getTopics, getSingleTopicPage } from '../../lib/queries/topics'

import WideWrapper from '../../components/global/wrapper-wide'
import HeaderImage from '../../components/global/header-image'

import MainContent from '../../components/global/main-content'
import ContentItem from '../../components/content/content-item'


/* You must reference the `topic` prop to get data from `getStaticProps` - check bottom of this file */
export default function TopicPage({ page, preview }) {
  if (!page?.topic?._meta?.uid) {
    return <ErrorPage statusCode={404} />
  }

  // Destructure topic out of page prop
  const { topic } = page
  return (
    <>
      <Head>
        <title>
          {topic.title[0].text} | People for Bikes
        </title>
      </Head>
      <WideWrapper postTitle="People for Bikes Homepage">
        <HeaderImage 
          headingRGBA="255,255,255,1"
          source={ topic.banner_image.url }
        >
          <h1>{topic.title[0].text}</h1>
        </HeaderImage>
        <MainContent>
          <h2>People for Bikes work in {topic.title[0].text}</h2>
          <h3>News</h3>
          <ContentItem 
            date="September 5th, 2020"
            title="Opening of New Cycletrack in Sedona"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
          />
          <ContentItem 
            date="July 12th, 2020"
            title="DRAFT Digital Happy Hour Success"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
          />
          <ContentItem 
            date="October 23rd, 2019"
            title="Tucson makes huge leap in City Ratings"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
          />
          <h3>Grants and Policy</h3>
          <ContentItem 
            date="September 7th, 2020"
            title="2020 ebike laws for Arizona released"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
          />
          <ContentItem 
            date="April 12th, 2020"
            title="Opening of New Cycletrack in Sedona"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
          />   
        </MainContent>        
      </WideWrapper>
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