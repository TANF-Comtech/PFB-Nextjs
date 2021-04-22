import ErrorPage from 'next/error'
import { useContext } from 'react'
import { RichText } from 'prismic-reactjs'

import { getAllCareers, getSingleCareer } from '../../lib/queries/careers'

import DefaultContext from '../../context/default/default-context'

import Wrapper from '../../components/global/wrapper'
import SiteMeta from '../../components/meta/site-meta'
import MainContent from '../../components/global/main-content'
import Heading1 from '../../components/primitives/h1'
import Rule from '../../components/primitives/rule'
import Button from '../../components/primitives/button'

export default function CareerPages({ page, preview }) {
  if( !page || page === null ) {
    return <ErrorPage statusCode={404} />
  }

  const { job } = page
  const { meta } = useContext(DefaultContext)

  return (
    <>
      <SiteMeta
        desc={ meta.desc }
        title={ job.title ? ( `${ job.title[0].text } | People for Bikes` ) : ( meta.title ) }
        imgHeight={ meta.imgHeight }
        imgSrc={ meta.imgSrc }
        imgWidth={ meta.imgWidth }
        path={ job ? ( `https://www.peopleforbikes.org/careers/${job._meta.uid}` ) : ( meta.path ) }
      />
      <Wrapper 
        postPath="/careers/"
        postTitle="Careers"
        isWide={ true }
      >

        <MainContent>
          { job.title && <Heading1>{ job.title[0].text }</Heading1>  }
          
          { job.posting && 
            <RichText 
              render={ job.posting }
            /> 
          }
        </MainContent>
        
        <MainContent>
          <Button 
            buttonAlign="center"
            buttonBg="#D23823"
            buttonBgHover="#D0021B"
            buttonBorder="none"
            buttonColor="white"
            buttonColorHover="white"
            buttonFontSize="18px"
            buttonPadding="10px 20px"
            buttonTextTransform="inherit"
            href="/careers"
          >Back to Careers Page</Button>

        </MainContent>
      </Wrapper>
    </>
  )
}

/* The return here sends the `page` prop back to the TopicPage component above for rendering */
export async function getStaticProps({ params, preview = false, previewData }) {
  const pageData = await getSingleCareer(params.uid, previewData)

  return {
    props: {
      preview,
      page: pageData ?? null,
    },
    revalidate: 60,
  }
}

// getStaticPaths requires the whole paths argument to be objects of URL it needs to statically render server-side
export async function getStaticPaths() {
  const allCareers = await getAllCareers()
  return {
    paths: allCareers?.map(({ node }) => `/careers/${node._meta.uid}`) || [],
    fallback: true,
  }
}