import Head from 'next/head'

import Wrapper from '../components/global/wrapper'
import HeaderImage from '../components/global/header-image'

import HPHero from '../public/sample-images/PFB_GrantFinder_2300x800.jpg'

function Homepage() {
  return (
    <>
      <Head>
        <title>People for Bikes</title>
      </Head>
      <Wrapper 
        postTitle="People for Bikes Homepage"
        isWide={ true }
      >
        <HeaderImage 
          headingRGBA="255,255,255,1"
          source={ HPHero }
        >
          <span>Together We Make</span>
          <h1>Biking Better</h1>
        </HeaderImage>

        {/* Slice pattern - will be useful later */}
        {/* { page.locations.body &&
          page.locations.body.map( (slice) => {
          switch(slice.type) {
            case 'action_item' :
              return (
                <ActionItemGroup
                  payload={ slice.fields }
                />
              )
            case 'ridespot_promo' :
              return (
                <RideSpotPromo 
                  payload={ slice.primary } 
                />
              )
        }})} */}
      </Wrapper>
    </>
  )
}

export default Homepage
