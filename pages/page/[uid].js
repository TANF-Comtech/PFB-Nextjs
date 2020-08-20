import Head from 'next/head'
import ErrorPage from 'next/error'
import { RichText } from 'prismic-reactjs'

import { getSingleBasicPage, 
         getAllBasicPagesWithUID } from '../../lib/repeatable-content-type/basic-page'

import { randomID } from '../../lib/utils'
import Wrapper from '../../components/global/wrapper'
import Heading1 from '../../components/primitives/h1'
import Accordion from '../../components/global/accordion'

export default function BasicPage({ page, preview }) {
  // Check to make sure there is actually a page at this UID path
  if (!page?.basic_page?._meta?.uid) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      <Head>
        <title>
          { RichText.asText(page.basic_page.title) } | People for Bikes
        </title>
      </Head>
      <Wrapper postTitle={ RichText.asText(page.basic_page.title) }>
        <RichText
          elements={{ heading1: Heading1 }}
          render={ page.basic_page.title }
        />
        <RichText
          render={ page.basic_page.main_content }
        />
        {page.basic_page.body && (
          <>
            {page.basic_page.body.map( ( slice ) => {
              return slice.fields.map( ( accordion ) => {
                return (
                  <Accordion 
                    key={ randomID() }
                    title={RichText.asText(accordion.accordion_heading)}
                  >
                    {RichText.asText(accordion.accordion_content)}
                  </Accordion>
                )
              })
            })}
          </>
        )}
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