import Head from 'next/head'

import WideWrapper from '../../components/global/wrapper-wide'
import MainContent from '../../components/global/main-content'

import HeaderImage from '../../components/global/header-image'
import RideSpotPromo from '../../components/global/ridespot-promo'

import ArizonaHeader from '../../public/sample-images/arizona-bg.jpg'


const Arizona = ({ props }) => {
  return (
    <>
      <Head>
        <title>Arizona - People for Bikes</title>
      </Head>
      <WideWrapper postTitle="Arizona - People for Bikes">
        <HeaderImage
          headingRGBA="255,255,255, 0.8"
          source={ ArizonaHeader }
        >
          <h1>Arizona</h1>
          <h3>29,975 People for Bikes Members</h3>
        </HeaderImage>
          
        <MainContent>
          <p>Something good</p>
        </MainContent>
        <RideSpotPromo />
      </WideWrapper>
    </>
  )
}


export default Arizona
