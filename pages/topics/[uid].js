import Head from 'next/head'
import ErrorPage from 'next/error'

import { getTopics, getSingleTopicPage } from '../../lib/queries/topics'

import Wrapper from '../../components/global/wrapper'
import Heading1 from '../../components/primitives/h1'
import MainContent from '../../components/global/main-content'


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
      <Wrapper postTitle={topic.title[0].text}>
        <h1>{topic.title[0].text}</h1>
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