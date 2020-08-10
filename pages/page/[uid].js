import Head from 'next/head'
import ErrorPage from 'next/error'

import { getSingleBasicPage, 
         getAllBasicPagesWithUID } from '../../lib/repeatable-content-type/basic-page'

import Wrapper from '../../components/global/wrapper'

export default function BasicPage({ page, preview }) {
  // Check to make sure there is actually a page at this UID path
  if (!page?.basic_page?._meta?.uid) {
    return <ErrorPage statusCode={404} />
  }

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
    paths: allPages?.map(({ node }) => `/page/${node._meta.uid}`) || [],
    fallback: true,
  }
}