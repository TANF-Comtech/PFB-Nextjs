import MainContent from '../global/main-content'
import GridWide from '../global/grid-wide'
import ImageTextOverlay from './image-text-overlay'

/**
 * <LocationsList>
 * 
 * Provides locations landing page list content (all locations)
 *
 * @param { array } payload - list of locations from Prismic API
 */
const LocationsList = ({
  payload
}) => {
  return (
    <MainContent>
      <GridWide>
        { payload.map( (location) => {
          return(
            <ImageTextOverlay
              imageLink={ `/locations/${location.node._meta.uid}` }
              source1X={ location.node.header_image?.main1x.url }
              source2X={ location.node.header_image?.url }
              title={ location.node.location[0].text }
              key={ location.node._meta.id }
            />
          )
        }) }
      </GridWide>
    </MainContent>
  )
}

export default LocationsList