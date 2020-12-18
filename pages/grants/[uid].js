import { useContext } from 'react'
import ErrorPage from 'next/error'
import Link from 'next/link'
import { Date as ParseDate } from 'prismic-reactjs'
import styled from 'styled-components'

import { getGrants, getSingleGrantPage } from '../../lib/queries/grants'
import { randomID, setDateSuffix } from '../../lib/utils'

import DefaultContext from '../../context/default-context'

import Wrapper from '../../components/global/wrapper'
import SiteMeta from '../../components/meta/site-meta'
import MainContent from '../../components/global/main-content'
import GrantsItem from '../../components/content/grants-item'

const SpacedHeading = styled.h2`
  margin: 4vh 0;
`

/* You must reference the `policy` prop to get data from `getStaticProps` - check bottom of this file */
export default function policyPage({ page, preview }) {
  if( !page || page === null ) {
    return <ErrorPage statusCode={404} />
  }

  // Destructure page payload and meta from global context
  const { grant } = page
  const { meta } = useContext(DefaultContext)

  return (
    <>
      <SiteMeta
        desc={ grant.main_content ? ( `${ grant.main_content[0].text.substring(0,180) } ... ` ) : ( meta.desc ) }
        title={ grant.title ? ( `${ grant.title[0].text } | People for Bikes` ) : ( meta.title ) }
        imgHeight={ meta.imgHeight }
        imgSrc={ meta.imgSrc }
        imgWidth={ meta.imgWidth }
        path={ grant ? ( `https://www.peopleforbikes.org/grants/${grant._meta.uid}` ) : ( meta.path ) }
      />    
      <Wrapper 
        postPath="/grant"
        postTitle="Grants"
        isWide="false"
      >
        <MainContent>
          <GrantsItem 
            amount={ grant.amount ? grant.amount : null }
            city={ grant.city ? grant.city : null }
            date={ grant.cycle ? grant.cycle : null }
            grantType={ grant.type ? grant.type : null }
            key={ grant._meta.id }
            location={ grant.location1 ? grant.location1.location[0].text : null }
            supportingDoc={ grant.link }
            title={ grant.title[0].text }
            text={ grant.main_content }
          />
        </MainContent>

      </Wrapper>
    </>
  )
}

/* The return here sends the `page` prop back to the policyPage component above for rendering */
export async function getStaticProps({ params, preview = false, previewData }) {
  const pageData = await getSingleGrantPage(params.uid, previewData)

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
  const grants = await getGrants()
  return {
    paths: grants?.map(({ node }) => `/grants/${node._meta.uid}`) || [],
    fallback: true,
  }
}