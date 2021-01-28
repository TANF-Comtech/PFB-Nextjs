import { useContext } from 'react'
import ErrorPage from 'next/error' 
import styled from 'styled-components'

import { RichText } from 'prismic-reactjs'

import { getActions, 
         getSingleActionPage } from '../../lib/queries/take-action'

import DefaultContext from '../../context/default/default-context'

import Wrapper from '../../components/global/wrapper'
import SiteMeta from '../../components/meta/site-meta'
import MainContent from '../../components/global/main-content'
import Promo from '../../components/slices/promo'

import ResearchPromo from '../../public/ridespot-bg.jpg'

import FormImg01 from '../../public/form-images/PFB_Forms_01.jpg'
import FormImg02 from '../../public/form-images/PFB_Forms_02.jpg'
import FormImg03 from '../../public/form-images/PFB_Forms_03.jpg'
import FormImg04 from '../../public/form-images/PFB_Forms_04.jpg'
import FormImg05 from '../../public/form-images/PFB_Forms_05.jpg'
import FormImg06 from '../../public/form-images/PFB_Forms_06.jpg'
import FormImg07 from '../../public/form-images/PFB_Forms_07.jpg'
import FormImg08 from '../../public/form-images/PFB_Forms_08.jpg'
import FormImg09 from '../../public/form-images/PFB_Forms_09.jpg'
import FormImg10 from '../../public/form-images/PFB_Forms_10.jpg'
import FormImg11 from '../../public/form-images/PFB_Forms_11.jpg'
import FormImg12 from '../../public/form-images/PFB_Forms_12.jpg'
import FormImg13 from '../../public/form-images/PFB_Forms_13.jpg'
import FormImg14 from '../../public/form-images/PFB_Forms_14.jpg'
import FormImg15 from '../../public/form-images/PFB_Forms_15.jpg'
import FormImg16 from '../../public/form-images/PFB_Forms_16.jpg'
import FormImg17 from '../../public/form-images/PFB_Forms_17.jpg'
import FormImg18 from '../../public/form-images/PFB_Forms_18.jpg'
import FormImg19 from '../../public/form-images/PFB_Forms_19.jpg'
import FormImg20 from '../../public/form-images/PFB_Forms_20.jpg'
import FormImg21 from '../../public/form-images/PFB_Forms_21.jpg'
import FormImg22 from '../../public/form-images/PFB_Forms_22.jpg'
import FormImg23 from '../../public/form-images/PFB_Forms_23.jpg'
import FormImg24 from '../../public/form-images/PFB_Forms_24.jpg'
import FormImg25 from '../../public/form-images/PFB_Forms_25.jpg'
import FormImg26 from '../../public/form-images/PFB_Forms_26.jpg'

const CenteredTitle = styled.h2`
  text-align: center;
  margin: 0 auto 3vh auto;
  max-width: 800px;
`

const BigPara = styled.p`
  margin: 3vh auto;
  max-width: 800px;
  text-align: center;
`

const FlexContainer = styled.section`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 5vh;

  @media (min-width: ${ props => props.theme.md }) {
    flex-direction: row;
  }
`

const FormContainer = styled.div`
  flex: 0 1 calc(100% - 450px);
  min-height: 30vh;
`

const ImageContainer = styled.div`
  flex: 0 1 450px;
  padding-right: 25px;
  margin: 0 auto;
  max-width: 450px;
`

export default function MembersPage({ page, preview }) {
  if( !page || page === null ) {
    return <ErrorPage statusCode={404} />
  }

  // Destructure page payload and meta from global context
  const { action } = page
  const { meta } = useContext(DefaultContext)

  let imageSelection
  if(action.image_selection) {
    switch (action.image_selection) {
      case '01' : imageSelection = FormImg01; break;
      case '02' : imageSelection = FormImg02; break;
      case '03' : imageSelection = FormImg03; break;
      case '04' : imageSelection = FormImg04; break;
      case '05' : imageSelection = FormImg05; break;
      case '06' : imageSelection = FormImg06; break;
      case '07' : imageSelection = FormImg07; break;
      case '08' : imageSelection = FormImg08; break;
      case '09' : imageSelection = FormImg09; break;
      case '10' : imageSelection = FormImg10; break;
      case '11' : imageSelection = FormImg11; break;
      case '12' : imageSelection = FormImg12; break;
      case '13' : imageSelection = FormImg13; break;
      case '14' : imageSelection = FormImg14; break;
      case '15' : imageSelection = FormImg15; break;
      case '16' : imageSelection = FormImg16; break;
      case '17' : imageSelection = FormImg17; break;
      case '18' : imageSelection = FormImg18; break;
      case '19' : imageSelection = FormImg19; break;
      case '20' : imageSelection = FormImg20; break;
      case '21' : imageSelection = FormImg21; break;
      case '22' : imageSelection = FormImg22; break;
      case '23' : imageSelection = FormImg23; break;
      case '24' : imageSelection = FormImg24; break;
      case '25' : imageSelection = FormImg25; break;
      case '26' : imageSelection = FormImg26; break;
    }
  }
  
  return (
    <>
      <SiteMeta
        desc={ action.main_content ? ( `${ action.main_content[0].text.substring(0,180) } ... ` ) : ( meta.desc ) }
        title={ action.title ? ( `${ action.title[0].text } | People for Bikes` ) : ( meta.title ) }
        imgHeight={ meta.imgHeight }
        imgSrc={ meta.imgSrc }
        imgWidth={ meta.imgWidth }
        path={ action ? ( `https://www.peopleforbikes.org/take-action/${action._meta.uid}` ) : ( meta.path ) }
      />    
      <Wrapper 
        postPath="/take-action"
        postTitle="Take Action"
        isWide="true"
      >        
        <MainContent>
          { action.title && 
            <CenteredTitle>
              { action.title[0].text }
            </CenteredTitle>
          }
          { action.main_content && 
            <BigPara>
              { action.main_content }
            </BigPara>
          }
          {
            action.long_content &&
            <RichText render={ action.long_content } />  
          }
          <FlexContainer>
            { action.image_selection && 
              <ImageContainer>
                <img src={ imageSelection } alt="Bike centric image with people present" />
              </ImageContainer>
            }
            <FormContainer>
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
            </FormContainer>
          </FlexContainer>
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