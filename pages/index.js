import Head from 'next/head'

import WideWrapper from '../components/global/wrapper-wide'
import HeaderImage from '../components/global/header-image'

import HPHero from '../public/sample-images/PFB_GrantFinder_2300x800.jpg'

function Homepage() {
  return (
    <>
      <Head>
        <title>People for Bikes</title>
      </Head>
      <WideWrapper postTitle="People for Bikes Homepage">
        <HeaderImage 
          headingText="Biking for Everyone"
          subheadingText="People for Bikes makes biking better"
          headingRGBA="255,255,255,1"
          source={ HPHero }
        />
      </WideWrapper>
    </>
  )
}

export default Homepage
