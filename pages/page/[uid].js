import { useRouter } from 'next/router'
import Head from 'next/head'
import ErrorPage from 'next/error'

import { getSingleBasicPage, getAllBasicPagesWithUID } from '../../lib/api'

import Wrapper from '../../components/global/wrapper'
import Heading1 from '../../components/global/h1'
import MainContent from '../../components/global/main-content'
import BasicButton from '../../components/global/button'
import CheckboxSwitch from '../../components/global/checkbox-switch'
import RadioSet from '../../components/global/radio'
import Accordion from '../../components/global/accordion'
import BlueQuestion from '../../components/global/blueQuestion'

/* You must reference the `pages` prop to get data from `getStaticProps` - check bottom of this file */
export default function BasicPage({ page, preview }) {
  // const router = useRouter()
  // if (!router.isFallback && !page?.node?._meta?.uid) {
  //   return <ErrorPage statusCode={404} />
  // }

  return (
    <>
      <Head>
        <title>
          {page.basic_page.title[0].text} | People for Bikes
        </title>
      </Head>
      <Wrapper postTitle={page.basic_page.title[0].text}>
        <h1>{page.basic_page.title[0].text}</h1>
      </Wrapper>
    </>
  )
}

/* The return here sends the `page` prop back to the BasicPage component above for rendering */
export async function getStaticProps({ params, preview = false, previewData }) {
  const pageData = await getSingleBasicPage(params.uid, previewData)

  return {
    props: {
      preview,
      page: pageData ?? null,
    },
    revalidate: 1,
  }
}

// getStaticPaths requires a the whole paths argument to be objects of URL it needs to statically render server-side
export async function getStaticPaths() {
  const allPages = await getAllBasicPagesWithUID()
  return {
    // paths: [
    //   { 
    //     params: { 
    //       uid: 'guidelines'
    //     }
    //   }
    // ],
    paths: allPages?.map(({ node }) => `/page/${node._meta.uid}`) || [],
    fallback: true,
  }
}