import React from 'react';
import Head from 'next/head';
import ErrorPage from 'next/error';
import { PrismicRichText } from '@prismicio/react';

import { getSingleBasicPage, getAllBasicPagesWithUID } from '~/lib/queries/basic-page';
import { randomID } from '~/utils';

import Wrapper from '~/components/wrapper';
import Heading1 from '~/components/h1';
import Accordion from '~/components/accordion';

export default function BasicPage({ page, preview }) {
  // Check to make sure there is actually a page at this UID path
  if (!page?.basic_page?._meta?.uid) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      {/* <Head>
        <title>
          { PrismicRichText.asText(page.basic_page.title) } | PeopleForBikes
        </title>
      </Head>
      <Wrapper postTitle={ PrismicRichText.asText(page.basic_page.title) }>
        <PrismicRichText
          elements={{ heading1: Heading1 }}
          field={ page.basic_page.title }
        />
        <PrismicRichText
          field={ page.basic_page.main_content }
        />
        {page.basic_page.body && (
          <>
            {page.basic_page.body.map( ( slice ) => {
              return slice.fields.map( ( accordion ) => {
                return (
                  <Accordion
                    key={ randomID(10000000) }
                    title={PrismicRichText.asText(accordion.accordion_heading)}
                  >
                    {PrismicRichText.asText(accordion.accordion_content)}
                  </Accordion>
                )
              })
            })}
          </>
        )}
      </Wrapper> */}
    </>
  );
}

/* The return here sends the `page` prop back to the BasicPage component above for rendering */
// export async function getStaticProps({ params, preview = false, previewData }) {
//   const pageData = await getSingleBasicPage(params.uid, previewData)

//   return {
//     props: {
//       preview,
//       page: pageData ?? null,
//     },
//     revalidate: 60,
//   }
// }

// getStaticPaths requires a the whole paths argument to be objects of URL it needs to statically render server-side
// export async function getStaticPaths() {
//   const allPages = await getAllBasicPagesWithUID()
//   return {
//     paths: allPages?.map(({ node }) => `/pages/${node._meta.uid}`) || [],
//     fallback: false,
//   }
// }
