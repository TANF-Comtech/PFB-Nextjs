import Link from 'next/link'
import styled from "styled-components"
import Image from "next/image"
import Flickity from "react-flickity-component"
import { Date as ParseDate } from 'prismic-reactjs'

import { getHomepage } from '../lib/queries/homepage'
import { linkResolver, setDateSuffix } from '../lib/utils'

import Wrapper from '../components/global/wrapper'
import HeaderImage from '../components/global/header-image'
import Grid from '../components/global/grid'
import MainContent from '../components/global/main-content'
import RideSpotPromo from '../components/slices/ridespot-promo'
import ContentItem from '../components/content/content-item'
import Promo from '../components/slices/promo'
import Donate from '../components/global/donate'
import Button from '../components/primitives/button'
import EventItem from '../components/content/event-item'

import WhiteArrow from '../public/white-arrow.svg'
import RedArrowWhiteBlock from '../public/red-arrow-white-block.svg'
import HPHero from '../public/sample-images/08_PFB_1600x800_Overlay_HomeHero.jpg'
import PromoPicture from '../public/promo/promo-momentum.jpg'

const SectionTitle = styled.h3`
  color: ${props => props.theme.midnightBlue};
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 4vh;
`

const BigSectionTitle = styled.h2`
  color: ${props => props.theme.darkestGray};
  font-weight: 300;
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

// Slides
const Slide = styled.section`
  align-items: center;
  background-image: url(${ props => props.source });
  background-position: center center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  height: 40vh;
  max-height: 600px;
  justify-content: center;
  max-width: 1100px;
  margin: 0 12.5px;
  padding: 25px;
  width: 90vw;
  @media screen and (min-width: 480px) {
    height: 80vw;
    width: 80vw;
  }
  @media screen and (min-width: 768px) {
    height: 60vw;
  }
  @media screen and (min-width: 1000px) {
    height: 40vw;
  }
  h2 {
    color: rgba(${props => props.headingRGBA ? props.headingRGBA : "255,255,255,1" });
    font-size: 60px;
    font-weight: 600;
    line-height: 50px;
    padding-bottom: 10px;
    text-align: center;
    text-transform: uppercase;
  }
  @media screen and (min-width: 320px) {
    h2 {
      font-size: calc(60px + 60 * ((100vw - 320px) / 880));
      line-height: calc(50px + 60 * ((100vw - 320px) / 880));
    }
  }
  @media screen and (min-width: 1200px) {
    h2 {
      font-size: 120px;
      line-height: 110px;
    }
  }   
  span {
    color: rgba(${props => props.headingRGBA ? props.headingRGBA : "255,255,255,1" });
    font-family: "Tungsten A", "Tungsten B", Arial, Helvetica, sans-serif;
    font-size: 30px;
    font-weight: 600;
    line-height: 25px;
    letter-spacing: 1px;
    padding-bottom: 3px;
    margin: 0;
    text-align: center;
    text-transform: uppercase;
  }
  @media screen and (min-width: 320px) {
    span {
      font-size: calc(30px + 30 * ((100vw - 320px) / 880));
      line-height: calc(25px + 25 * ((100vw - 320px) / 880));
    }
  }
  @media screen and (min-width: 1200px) {
    span {
      font-size: 60px;
      line-height: 50px;
    }
  } 
`

const SlideWrapper = styled.a`
  text-align: center;
  text-decoration: none !important;
  &::hover, &::visited, &:focus {
    text-decoration: none !important;
  }
`




export default function Homepage({ page }) {
  const { homepage } = page

  // Get number of slides, tell flickity what's up
  const slideIndex = homepage.campaigns ? Math.floor(homepage.campaigns.length / 2) : 1

  const flickityOptions = {
    initialIndex: slideIndex,
    wrapAround: true
  }
  
  
  //console.log(homepage)
  
  return (
    <Wrapper 
      postTitle="People for Bikes Homepage"
      isWide={ true }
    >
      <HeaderImage 
        headingRGBA="255,255,255,1"
        source={ HPHero }
      >
        <span>Together We Make</span>
        <h1>Biking Better</h1>
      </HeaderImage>

      <MainContent>
        <SectionTitle>Our Mission</SectionTitle> 
        <Grid gridGap="1vw">
          <Box bgColor="#D0021B">
            <Number>1</Number>
            <Text>Improving Recreational Access for Bicycles</Text>
          </Box>
          <Box bgColor="#D0021B">
            <Number>2</Number>
            <Text>Building Safe Mobility Networks</Text>
          </Box>
          <Box bgColor="#D0021B">
            <Number>3</Number>
            <Text>Fostering Diversity, Equity, and Inclusion</Text>
          </Box>
          <Box bgColor="#D0021B">
            <Number>4</Number>
            <Text>Promoting Sustainability</Text>
          </Box>
          <Box bgColor="#D0021B">
            <Number>5</Number>
            <Text>Growing the Bike Industry</Text>
          </Box>
          <Link href="/mission" passHref>
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

          <Flickity
            options={flickityOptions}
            static={true}
          >
            { homepage.campaigns.map( (c) => {
              return(
                <Slide 
                  key={ c.campaign._meta.id }
                  source={ c.campaign.banner_image.url }
                >
                  <SlideWrapper 
                    href={ linkResolver(c.campaign.link, true) } 
                    rel="noopener"
                    target="_blank">
                      { c.campaign.small_text && <span>{ c.campaign.small_text }</span> }
                      { c.campaign.big_text && <h2>{ c.campaign.big_text }</h2> }
                      <Arrow src={ WhiteArrow } width="46px" />
                  </SlideWrapper>
                </Slide>
              )
            } ) }
          </Flickity>
        </>
      }
      
      { homepage.body &&
        homepage.body.map( (slice) => {
        switch(slice.type) {
          case 'ridespot_promo' :
            return (
              <RideSpotPromo 
                payload={ slice.primary } 
              />
            )
      }})}

      { homepage.news &&
        <>
          <BigSectionTitle>PeopleForBikes <span>News</span></BigSectionTitle> 
          <MainContent>
            { homepage.news.map( (news) => { 
              
              // Check for publication_date from individual news post
              // If not present, use publication date from Prismic CMS
              const newDate = news.news_item.publication_date ? 
                ( new Date(ParseDate( news.news_item.publication_date ))) : 
                ( new Date(ParseDate( news.news_item._meta.lastPublicationDate )))
              return (
                <ContentItem 
                  date={ `${newDate.toLocaleString('en-us', { month: 'long' } )} 
                          ${setDateSuffix(newDate.getDate())}, 
                          ${newDate.getFullYear()}` }
                  key={ news.news_item._meta.id }
                  image={ news.news_item.header_image && news.news_item.header_image }
                  path={ `/news/${news.news_item._meta.uid}` }
                  text={ news.news_item.main_content[0].type === "paragraph" ? news.news_item.main_content[0].text : "" }
                  title={ news.news_item.title[0].text }
                />
              )
            })}
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
          </MainContent>
        </>
      }

      { homepage.events &&
        <>
          <BigSectionTitle>PeopleForBikes <span>Events</span></BigSectionTitle> 
          <MainContent maxWidth="800px">
            { homepage.events.map( (event) => { 
                          
              // Get date
              const newEventDate = new Date(ParseDate( event.event.date ))
              return( 
                <EventItem
                  day={ newEventDate.toLocaleString('en-us', { day: "2-digit" } ) }
                  month={ newEventDate.toLocaleString('en-us', { month: 'short' } ) }
                  year={ newEventDate.getFullYear() }
                  key={ `/events/${event.event._meta.id}` }
                  path={ `/events/${event.event._meta.uid}` }
                  text={ event.event.main_content ? event.event.main_content : "" }
                  title={ event.event.title[0].text }
                />
              )
            } )}

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
          </MainContent>
        </>
      }

      <Promo
        headingRGBA="255,255,255,1"
        path="/take-action"
        source={ PromoPicture }
      >
        <span>See How Our Work</span>
        <h1>Creates Momentum</h1>
        <Arrow src={ WhiteArrow } width="46px" />
      </Promo>

      <Donate>
        <h1>Donate Now</h1>
        <span>Bring Better Biking to Your Community</span>
        <Arrow src={ RedArrowWhiteBlock } width="46px" />
      </Donate>

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