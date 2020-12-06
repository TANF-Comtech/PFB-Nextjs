import Link from 'next/link'
import styled from "styled-components"

import { getHomepage } from '../lib/queries/homepage'

import Wrapper from '../components/global/wrapper'
import HeaderImage from '../components/global/header-image'
import Grid from '../components/global/grid'
import MainContent from '../components/global/main-content'
import RideSpotPromo from '../components/slices/ridespot-promo'
import Promo from '../components/slices/promo'
import Donate from '../components/global/donate'
import Button from '../components/primitives/button'
import EventsList from '../components/content/events-list'
import Carousel from '../components/global/carousel'
import NewsList from '../components/content/news-list'

import WhiteArrow from '../public/white-arrow.svg'

import HPHero from '../public/sample-images/08_PFB_1600x800_Overlay_HomeHero.jpg'

const SectionTitle = styled.h3`
  color: ${props => props.theme.midnightBlue};
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 4vh;
`

const BigSectionTitle = styled.h2`
  color: ${props => props.theme.darkestGray};
  font-weight: 300;
  margin-bottom: 25px;
  text-align: center;

  span {
    color: ${props => props.theme.redAccent};
    font-size: 46.66px;
    font-weight: 600;
    text-transform: uppercase;

    @media screen and (min-width: 320px) {
    font-size: calc(46.66px + 23.33 * ((100vw - 320px) / 880));
    }
    @media screen and (min-width: 1200px) {
      font-size: 70px;
    } 
  }
`

// Box Component soon...
const Box = styled.div`
  background-color: ${props => props.bgColor};
  min-height: 190px;
  padding: 25px 50px;
`

const Number = styled.h3`
  align-items: center;
  background-color: white;
  border-radius: 23px;
  color: ${props => props.theme.redAccent};
  display: flex;
  font-size: 28px;
  height: 46px;
  justify-content: center;
  margin: 0 auto;
  width: 46px;
`

const Text = styled.h4`
  color: white;
  font-size: 36px;
  font-weight: 300;
  line-height: 36px;
  margin-top: 1vh;
  text-align: center;

  @media screen and (min-width: 320px) {
    font-size: calc(36px + 8 * ((100vw - 320px) / 880));
    line-height: calc(36px + 8 * ((100vw - 320px) / 880));
  }
  @media screen and (min-width: 1200px) {
    font-size: 44px;
    line-height: 44px;
  }  
`

const Arrow = styled.img`
  display: block;
  margin: 0 auto;
  width: 46px;
`

export default function Homepage({ page }) {
  const { homepage } = page

  return (
    <Wrapper 
      postTitle="People for Bikes Homepage"
      isWide={ true }
    >
      { homepage.banner_image &&
        <HeaderImage 
          source={ homepage.banner_image.url }
        >
          <span>{ homepage.small_text }</span>
          <h1>{ homepage.big_text }</h1>
        </HeaderImage>
      }

      <MainContent>
        <SectionTitle>Our Mission</SectionTitle> 
        <Grid gridGap="1vw">
          <Box bgColor="#D0021B" key="1">
            <Number>1</Number>
            <Text>Improving Recreational Access for Bicycles</Text>
          </Box>
          <Box bgColor="#D0021B" key="2">
            <Number>2</Number>
            <Text>Building Safe Mobility Networks</Text>
          </Box>
          <Box bgColor="#D0021B" key="3">
            <Number>3</Number>
            <Text>Fostering Diversity, Equity, and Inclusion</Text>
          </Box>
          <Box bgColor="#D0021B" key="4">
            <Number>4</Number>
            <Text>Promoting Sustainability</Text>
          </Box>
          <Box bgColor="#D0021B" key="5">
            <Number>5</Number>
            <Text>Growing the Bike Industry</Text>
          </Box>
          <Link href="/mission" passHref key="6">
            <a>
              <Box bgColor="#002C40">
                <Arrow src={ WhiteArrow } width="46px" />
                <Text>Read More About Our Mission</Text>
              </Box>
            </a>
          </Link>
        </Grid>
      </MainContent>        
      
      { homepage.campaigns &&
        <>
          <SectionTitle>Get Involved</SectionTitle> 
          <Carousel payload={homepage.campaigns} />
        </>
      }
      
      { homepage.body &&
        homepage.body.map( (slice) => {
          if( slice.type === "ridespot_promo" ) {
            return ( <RideSpotPromo payload={ slice.primary } /> )
          }
      })}  
      

      { homepage.news &&
        <>
          <BigSectionTitle>PeopleForBikes <span>News</span></BigSectionTitle> 
          <NewsList 
            nodeName='news_item'
            payload={ homepage.news } 
          />
          <Button
            buttonAlign="center"
            buttonBg="#D0021B"
            buttonBorder="none"
            buttonColor="white"
            buttonFontSize="24px"
            buttonMargin="0 0 50px 0"
            buttonPadding="10px 30px"
            buttonTextTransform="uppercase"
            href="/news"
          >
            See All News
          </Button>
        </>
      }

      { homepage.events &&
        <>
          <BigSectionTitle>PeopleForBikes <span>Events</span></BigSectionTitle> 
          <EventsList 
            payload={ homepage.events } 
          />
          <Button
            buttonAlign="center"
            buttonBg="#D0021B"
            buttonBorder="none"
            buttonColor="white"
            buttonFontSize="24px"
            buttonMargin="0 0 50px 0"
            buttonPadding="10px 30px"
            buttonTextTransform="uppercase"
            href="/events"
          >
            See All Events
          </Button>            
        </>
      }

      { homepage.body &&
        homepage.body.map( (slice) => {
          if( slice.type === "promo" ) {
            return ( 
              <Promo 
                bigWords={ slice.primary.bottom_text }
                path={ slice.primary.link }
                smallWords={ slice.primary.top_text }
                source={ slice.primary.main_image.url }
              /> 
            )
          }
      })}  

      <Donate />

    </Wrapper>
  )
}

/* The return here sends the `page` prop back to the component above for rendering */
export async function getStaticProps({ params, preview = false, previewData }) {
  const pageData = await getHomepage()

  return {
    props: {
      preview,
      page: pageData ?? null,
    },
    revalidate: 1,
  }
}