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
          headingRGBA="255,255,255,1"
          source={ HPHero }
        >
          <h1>Biking for Everyone</h1>
          <h3>People for Bikes makes biking better</h3>
        </HeaderImage>
      </WideWrapper>
    </>
  )
}

export default Homepage
