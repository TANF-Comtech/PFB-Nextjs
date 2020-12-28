import { useContext } from 'react'
import ErrorPage from 'next/error' 
import styled from 'styled-components'
import { RichText, } from 'prismic-reactjs'

import { getActions, 
         getSingleActionPage } from '../../lib/queries/take-action'
import { linkResolver } from '../../lib/utils'

import DefaultContext from '../../context/default/default-context'

import Wrapper from '../../components/global/wrapper'
import SiteMeta from '../../components/meta/site-meta'
import MainContent from '../../components/global/main-content'
import Header1 from '../../components/primitives/h1'
import Promo from '../../components/slices/promo'

import ResearchPromo from '../../public/promo/promo-research.jpg'

const IntroWrapper = styled.div`
  margin: 3vh 0 1vh 0;
`

export default function MembersPage({ page, preview }) {
  if( !page || page === null ) {
    return <ErrorPage statusCode={404} />
  }

  // Destructure page payload and meta from global context
  const { action } = page
  const { meta } = useContext(DefaultContext)

  return (
    <>
      <SiteMeta
        desc={ action.main_content ? ( `${ action.main_content[0].text.substring(0,180) } ... ` ) : ( meta.desc ) }
        title={ action.title ? ( `${ action.title[0].text } Statistics | People for Bikes` ) : ( meta.title ) }
        imgHeight={ meta.imgHeight }
        imgSrc={ meta.imgSrc }
        imgWidth={ meta.imgWidth }
        path={ action ? ( `https://www.peopleforbikes.org/take-action/${action._meta.uid}` ) : ( meta.path ) }
      />    
      <Wrapper 
        postPath="/research"
        postTitle="Research"
        isWide="true"
      >        
        <MainContent>
          { action.title && 
            <Header1>
              { action.title[0].text }
            </Header1>
          }
          { action.form_id &&
            <>
              <div id="wsd-root" className="spkactionform"></div>
              <div id="pb-root" className="spkactionform"></div>
              <script
                src="https://code.jquery.com/jquery-3.5.1.min.js"
                integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
                crossOrigin="anonymous"></script>
              <script src={`https://action.peopleforbikes.org/assets/js/widget.js/?id=${ action.form_id }`} type="text/javascript" />
            </>
          }
        </MainContent>

        <Promo 
          bigWords="Ride Spot"
          path="/rides"
          smallWords="Find Your Next Ride With"
          source={ ResearchPromo }
        /> 

      </Wrapper>
    </>
  )
}

/* The return here sends the `page` prop back to the Page component above for rendering */
export async function getStaticProps({ params, preview = false, previewData }) {
  const pageData = await getSingleActionPage(params.uid, previewData)

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
  const pages = await getActions()
  return {
    paths: pages?.map(({ node }) => `/take-action/${node._meta.uid}`) || [],
    fallback: true,
  }
}