import ErrorPage from 'next/error'
import { useContext } from 'react'
import { RichText } from 'prismic-reactjs'

import { getLocationsNoImages, getSingleLocationsPage } from '../../lib/queries/locations'
import { linkResolver, randomID } from '../../lib/utils'

import DefaultContext from '../../context/default-context'

import Wrapper from '../../components/global/wrapper'
import SiteMeta from '../../components/meta/site-meta'
import HeaderImage from '../../components/global/header-image'
import MainContent from '../../components/global/main-content'
import ContentItem from '../../components/content/content-item'
import RideSpotPromo from '../../components/slices/ridespot-promo'
import ActionItemGroup from '../../components/slices/action-item-group'



/* You must reference the `topic` prop to get data from `getStaticProps` - check bottom of this file */
export default function LocationPage({ page, preview }) {
  const { locations } = page

  // Check for Location, if not there, load error page 
  if (!locations?._meta?.uid) {
    return <ErrorPage statusCode={404} />
  }

  const { meta, actionItems, rideSpotRides } = useContext(DefaultContext)

  return (
    <>
      <SiteMeta
        desc={ locations.intro ? ( `${page?.locations.intro[0].text.substring(0,180) }... ` ) : ( meta.desc ) }
        title={ locations.location ? ( `${ page?.locations.location[0].text } | People for Bikes` ) : ( meta.title ) }
        imgHeight={ locations.header_image ? ( page?.locations.header_image.mobile2x.dimensions.height ) : ( meta.imgHeight )  }
        imgSrc={ locations.header_image ? ( page?.locations.header_image.mobile2x.url ) : ( meta.imgSrc ) }
        imgWidth={ locations.header_image ? ( page?.locations.header_image.mobile2x.dimensions.width ) : ( meta.imgWidth ) }
        path={ locations ? ( `https://www.peopleforbikes.org/location/${page?.locations._meta.uid}` ) : ( meta.path ) }
      />
      <Wrapper 
        postTitle="People for Bikes Homepage"
        isWide={ true }
      >
        <HeaderImage 
          headingRGBA="255,255,255,1"
          source={ locations.header_image.url }
        >
          <h1>{ locations.location[0].text }</h1>
        </HeaderImage>
        
        {/* Check for slices on `body`, if body is present map over results */}
        {/* If `action_item` or `ridespot_promo` send data down to appropriate component */}
        {/* If neither conditions catch, send back placeholder data */}
        { locations.body 
          ? ( locations.body.map( (slice) => {
            switch(slice.type) {
              case 'action_item' :
                return (
                  <ActionItemGroup
                    key={ randomID(10000000) }
                    payload={ slice.fields }
                  />
                )
              case 'ridespot_promo' :
                return (
                  <RideSpotPromo 
                    key={ randomID(10000000) }
                    payload={ slice.primary } 
                  />
                )
            }
          }))
          : (
            <>
              <ActionItemGroup
                key={ randomID(10000000) }
                payload={ actionItems }
              />
              <RideSpotPromo 
                key={ randomID(10000000) }
                payload={ rideSpotRides } 
              />
            </>  
          )
        }

        <MainContent>
          <h2>PeopleForBikes Work in { page?.locations.location[0].text }</h2>
          <h3>News</h3>
          <ContentItem 
            date="September 5th, 2020"
            title="Opening of New Cycletrack in Sedona"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
          />
          <ContentItem 
            date="July 12th, 2020"
            title="DRAFT Digital Happy Hour Success"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
          />
          <ContentItem 
            date="October 23rd, 2019"
            title="Tucson makes huge leap in City Ratings"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
          />
          <h3>Grants and Policy</h3>
          <ContentItem 
            date="September 7th, 2020"
            title="2020 ebike laws for Arizona released"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
          />
          <ContentItem 
            date="April 12th, 2020"
            title="Opening of New Cycletrack in Sedona"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
          />   
        </MainContent>        
      </Wrapper>
    </>
  )
}

/* The return here sends the `page` prop back to the TopicPage component above for rendering */
export async function getStaticProps({ params, preview = false, previewData }) {
  const pageData = await getSingleLocationsPage(params.uid, previewData)

  return {
    props: {
      preview,
      page: pageData ?? null,
    },
    revalidate: 1,
  }
}

// getStaticPaths requires the whole paths argument to be objects of URL it needs to statically render server-side
export async function getStaticPaths() {
  const allLocations = await getLocationsNoImages()
  return {
    paths: allLocations?.map(({ node }) => `/locations/${node._meta.uid}`) || [],
    fallback: true,
  }
}