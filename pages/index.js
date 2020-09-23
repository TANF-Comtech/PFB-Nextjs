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
          <h1>Biking for Everyone</h1>
          <h3>People for Bikes makes biking better</h3>
        </HeaderImage>
      </Wrapper>
    </>
  )
}

export default Homepage
