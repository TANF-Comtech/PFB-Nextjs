import Head from 'next/head'

import WideWrapper from '../../components/global/wrapper-wide'
import MainContent from '../../components/global/main-content'

import HeaderImage from '../../components/global/header-image'
import RideSpotPromo from '../../components/global/ridespot-promo'
import ActionItem from '../../components/global/action-item'

import ArizonaHeader from '../../public/sample-images/arizona-bg.jpg'
import LinkIcon from '../../public/icons/link.svg'
import HeartIcon from '../../public/icons/heart.svg'
import EventIcon from '../../public/icons/event.svg'


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
          <h2>Arizona Intro</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <hr />
          <ActionItem 
            icon={ LinkIcon }
            iconAlt="Link icon"
            title="Become a Member"
            text="PeopleForBikes is making a difference around all of Arizona but we need your help. Becoming a member doesn't cost you a thing and helps us to build a stronger voice for the future of biking."
          />  
          <hr />
          <ActionItem 
            icon={ HeartIcon }
            iconAlt="Heart icon"
            title="Build Better Biking in Phoenix"
            text="Have a great project that needs a bit of funding to get off the ground? Check out our semi-annual Grants program, where PeopleForBikes funds the next generation of cycling infrastructure."
          />
          <hr />
          <ActionItem 
            icon={ EventIcon }
            iconAlt="Event icon"
            title="Come to the next DRAFT Happy Hour in Tuscon"
            text="Pandemic shutdowns may have us staying in but we continue our social effort digitally with our DRAFT happy hours, which bring bikers and beers together for a spirit-ed discussion."
          />
        </MainContent>

        <RideSpotPromo />
      </WideWrapper>
    </>
  )
}


export default Arizona
