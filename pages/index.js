import Head from 'next/head'

import Wrapper from '../components/global/wrapper'
import Heading1 from '../components/global/h1'

function Homepage() {
  return (
    <>
      <Head>
        <title>People for Bikes</title>
      </Head>
      <Wrapper>
        <Heading1>Sample Pages</Heading1>
      </Wrapper>
    </>
  )
}


export default Homepage
