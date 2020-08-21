import Head from 'next/head'

import WideWrapper from '../components/global/wrapper-wide'
import HeaderImage from '../components/global/header-image'

function Homepage() {
  return (
    <>
      <Head>
        <title>People for Bikes</title>
      </Head>
      <WideWrapper postTitle="People for Bikes Homepage">
        <HeaderImage />
      </WideWrapper>
    </>
  )
}


export default Homepage
