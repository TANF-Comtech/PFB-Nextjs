import Head from 'next/head'
import Wrapper from '../components/global/wrapper'

function Homepage() {
  return (
    <>
      <Head>
        <title>People for Bikes - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Wrapper>
        People for Bikes Site
      </Wrapper>
    </>
  )
}


export default Homepage
