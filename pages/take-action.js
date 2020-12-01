import styled from "styled-components"

import Wrapper from '../components/global/wrapper'
import MainContent from '../components/global/main-content'
import ActionItem from '../components/slices/action-item'
import Donate from '../components/global/donate'

import RedArrowWhiteBlock from '../public/red-arrow-white-block.svg'

const BigBlueBanner = styled.header`
  background-color: ${props => props.theme.midnightBlue};

  h1 {
    color: white;
    text-transform: uppercase;
  }
`

const Arrow = styled.img`
  display: block;
  margin: 0 auto;
  width: 46px;
`

export default function TakeActionPage() {
  
  return (
    <>  
      <Wrapper 
        postTitle="Take Action for Bikes | PeopleForBikes"
        isWide={ true }
      >
        <BigBlueBanner>
          <MainContent>
            <h1>Take Action</h1>
          </MainContent>
        </BigBlueBanner>

        <MainContent>
          <ActionItem
            icon="Join (link icon)"
            path="/join"
            title="Join PeopleForBikes"
            text="PeopleForBikes is making a difference around the country but we need your help. Becoming a member doesn't cost you a thing and helps us to build a stronger voice for the future of biking."
          />
          <ActionItem
            icon="News (newspaper icon)"
            path="/news"
            title="Read About the World of Biking"
            text="Ready to learn about how your next great ride comes into being? Check out the latest work from the whole PeopleForBikes team. We're advancing polices, helping to build infrastructure and need your help."
          />
          <ActionItem
            icon="Support (heart icon)"
            path="/grants"
            title="Get Support for Your Project"
            text="Did you know PeopleForBikes can help fund your project? Twice a year, our team awards Community Grants - small deposits on shovel-ready bike projects that build the future of biking. Find out more."
          />        
          <ActionItem
            icon="Register (check icon)"
            path="/grants"
            title="Become a Sustaining Member"
            text="PeopleForBikes is only possible because of the generous support from our community and corporate partners. Learn about all the benefits that come with a PeopleForBikes corporate membership and support the future of biking."
          />
          <ActionItem
            icon="E-bikes (battery icon)"
            path="/topics/e-bikes"
            title="Learn the Latest on E-bikes"
            text="E-bikes are a rapidly evolving part of the biking landscape and PeopleForBikes is working to standardize access for e-bikes around the country. Learn about our latest efforts."
          />
          <ActionItem
            icon="Event (calendar icon)"
            path="/events"
            title="Find a Great Event"
            text="PeopleForBikes hosts and participates and a huge range of biking related initiatives, from DRAFT meetups to our semi-annual Bicycle Leadership Conference. See what's going on near you."
          />    
        </MainContent>
        <Donate>
          <h1>Donate Now</h1>
          <span>Bring Better Biking to Your Community</span>
          <Arrow src={ RedArrowWhiteBlock } width="46px" />
        </Donate>
      </Wrapper>
    </>
  )
}

/* The return here sends the `page` prop back to the component above for rendering */
// export async function getStaticProps({ params, preview = false, previewData }) {
//   const pageData = await newsTopTwenty()

//   return {
//     props: {
//       preview,
//       page: pageData ?? null,
//     },
//     revalidate: 1,
//   }
// }