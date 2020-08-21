import Head from 'next/head'
import ErrorPage from 'next/error'
import { RichText } from 'prismic-reactjs'

import { getSingleLandingPage, 
         getAllLandingPagesWithUID } from '../lib/repeatable-content-type/landing-page'

import Wrapper from '../components/global/wrapper'
import Heading1 from '../components/primitives/h1'

export default function LandingPage({ page, preview }) {
  // Check to make sure there is actually a page at this UID path
  if (!page?.landing_page?._meta?.uid) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      <Head>
        <title>
          { RichText.asText(page.landing_page.title) } | People for Bikes
        </title>
      </Head>
      <Wrapper postTitle={ RichText.asText(page.landing_page.title) }>
        <RichText
          elements={{ heading1: Heading1 }}
          render={ page.landing_page.title }
        />
      </Wrapper>
    </>
  )
}

/* The return here sends the `page` prop back to the BasicPage component above for rendering */
export async function getStaticProps({ params, preview = false, previewData }) {
  const pageData = await getSingleLandingPage(params.uid, previewData)

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
  const allPages = await getAllLandingPagesWithUID()
  return {
    paths: allPages?.map(({ node }) => `/${node._meta.uid}`) || [],
    fallback: true,
  }
}