import ErrorPage from 'next/error'
import { useContext } from 'react'
import { Date as ParseDate } from 'prismic-reactjs'

import { getLocationsNoImages, getSingleLocationsPage } from '../../lib/queries/locations'
import { randomID, setDateSuffix } from '../../lib/utils'

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
  if( !page || page === null ) {
    return <ErrorPage statusCode={404} />
  }

  // Incoming data obj (page) is an array of objects
  // 0 - location data
  // 1 - news for this location
  // more to come...
  const { locations } = page[0]
  const { meta, actionItems, rideSpotRides } = useContext(DefaultContext)

  return (
    <>
      <SiteMeta
        desc={ locations.intro ? ( `${ locations.intro[0].text.substring(0,180) }... ` ) : ( meta.desc ) }
        title={ locations.location ? ( `${ locations.location[0].text } | People for Bikes` ) : ( meta.title ) }
        imgHeight={ locations.header_image ? ( locations.header_image.mobile2x.dimensions.height ) : ( meta.imgHeight )  }
        imgSrc={ locations.header_image ? ( locations.header_image.mobile2x.url ) : ( meta.imgSrc ) }
        imgWidth={ locations.header_image ? ( locations.header_image.mobile2x.dimensions.width ) : ( meta.imgWidth ) }
        path={ locations ? ( `https://www.peopleforbikes.org/locations/${locations._meta.uid}` ) : ( meta.path ) }
      />
      <Wrapper 
        postPath="/locations/"
        postTitle="Locations"
        isWide={ locations.header_image ? true : false }
      >
        { locations.header_image ? 
          ( <HeaderImage 
              headingRGBA="255,255,255,1"
              source={ locations.header_image.url }
            >
              <h1>{ locations.location[0].text }</h1>
            </HeaderImage>  
          ) :
          ( <h1>{ locations.location[0].text }</h1> )
        }
        
        
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
                    isLocal="true"
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
                isLocal="false"
                key={ randomID(10000000) }
                payload={ rideSpotRides } 
              />
            </>  
          )
        }

        <MainContent>
          <h2>PeopleForBikes Work in { locations.location[0].text }</h2>
          <h3>News</h3>
          
          { page[1] && page[1].map( (newsItem) => {
            
            // Check for publication_date from individual news post
            // If not present, use publication date from Prismic CMS
            const newDate = newsItem.data.publication_date ? 
              ( new Date(ParseDate( newsItem.data.publication_date ))) : 
              ( new Date(ParseDate( newsItem.last_publication_date )))
            return (
              <ContentItem 
                date={ `${newDate.toLocaleString('en-us', { month: 'long' } )} 
                        ${setDateSuffix(newDate.getDate())}, 
                        ${newDate.getFullYear()}` }
                key={ newsItem.id }
                image={ newsItem.data.header_image && newsItem.data.header_image }
                path={ `/news/${newsItem.uid}` }
                text={ newsItem.data.main_content[0].type === "paragraph" ? newsItem.data.main_content[0].text : "" }
                title={ newsItem.data.title[0].text }
              />
            )
          } ) }
           
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