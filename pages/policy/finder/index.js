import Link from 'next/link'
import styled from "styled-components"

import { getPolicies } from '../../../lib/queries/policies'

import Wrapper from '../../../components/global/wrapper'
import Header1 from '../../../components/primitives/h1'
import PolicyItem from '../../../components/content/policy-item'
import MainContent from '../../../components/global/main-content'
import Button from '../../../components/primitives/button'
import ColorBanner from '../../../components/global/color-banner'

// import HeaderImage from '../components/global/header-image'
// import Grid from '../components/global/grid'
// import MainContent from '../components/global/main-content'
// import RideSpotPromo from '../components/slices/ridespot-promo'
// import Promo from '../components/slices/promo'
// import ColorBanner from '../components/global/color-banner'
// import Button from '../components/primitives/button'

const SectionTitle = styled.h3`
  color: ${props => props.theme.midnightBlue};
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 4vh;
`

const BigSectionTitle = styled.h2`
  color: ${props => props.theme.darkestGray};
  font-weight: 300;
  margin-bottom: 25px;
  text-align: center;

  span {
    color: ${props => props.theme.redAccent};
    font-size: 46.66px;
    font-weight: 600;
    text-transform: uppercase;

    @media screen and (min-width: 320px) {
    font-size: calc(46.66px + 23.33 * ((100vw - 320px) / 880));
    }
    @media screen and (min-width: 1200px) {
      font-size: 70px;
    } 
  }
`


export default function PolicyFinder({ page }) {

  return (
    <Wrapper 
      postPath="/policy/"
      postTitle="Policy"
      isWide={ false }
    >
      <Header1>Policy Finder</Header1>

        { page.map( (policy) => {
          return(
            <PolicyItem 
              city={ policy.node.city ? policy.node.city : null }
              date={ policy.node.year ? policy.node.year : null }
              govLevel={ policy.node.government_level }
              location={ policy.node.location ? policy.node.location.location[0].text : null }
              path={ `/policy/${ policy.node._meta.uid }` }
              title={ policy.node.title[0].text }
              text={ policy.node.main_content[0].text }
            />
          )
        })}
        <Button
          buttonAlign="center"
          buttonBg="#D0021B"
          buttonBorder="none"
          buttonColor="white"
          buttonFontSize="24px"
          buttonMargin="0 0 50px 0"
          buttonPadding="10px 30px"
          buttonTextTransform="uppercase"
          href="/policy"
        >
          Back to Policy Page
        </Button> 
     
      
 

      {/* { homepage.body &&
        homepage.body.map( (slice) => {
          if( slice.type === "promo" ) {
            return ( 
              <Promo 
                bigWords={ slice.primary.bottom_text }
                path={ slice.primary.link }
                smallWords={ slice.primary.top_text }
                source={ slice.primary.main_image.url }
              /> 
            )
          }
      })}   */}

      {/* <ColorBanner /> */}

    </Wrapper>
  )
}

/* The return here sends the `page` prop back to the component above for rendering */
export async function getStaticProps({ params, preview = false, previewData }) {
  const pageData = await getPolicies()

  return {
    props: {
      preview,
      page: pageData ?? null,
    },
    revalidate: 1,
  }
}