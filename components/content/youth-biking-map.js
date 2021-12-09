import styled from "styled-components"

import MainContent from "../global/main-content"

const Container = styled.section`
  .embed-container {
    position: relative; 
    padding-bottom: 80%; 
    height: 0; 
    max-width: 100%;
  } 
  
  .embed-container iframe, 
  .embed-container object, 
  .embed-container iframe{
    position: absolute; 
    top: 0; 
    left: 0; 
    width: 100%; 
    height: 100%;
  } 
  
  small{
    position: absolute; 
    z-index: 40; 
    bottom: 0; 
    margin-bottom: -15px;
  }
`

const RedHeading = styled.h2`
  color: ${ props => props.theme.red };
  font-weight: 700;
  text-transform: uppercase;
`

/**
 * <YouthBikingMap>
 * 
 * Static iFrame of a Youth Biking Map
 * This was only designed to use on /pages/local-innovation/[uid].js
 */
export default function YouthBikingMap() {

  return (
    <>
      <a id="map"></a>
      <MainContent
        contentPadding="8vh 4vw 2vh 4vw"
        maxWidth="1200px"
      >
        <RedHeading>National Youth Bicycle Programs Map</RedHeading>
        <hr />
        <p>PeopleForBikes and <a href="https://outridebike.org/" target="_blank">Outride</a> have published a map of national youth bicycle programs operating throughout the country. All programs share a commitment to breaking down barriers to bicycling, especially for low-income communities, BIPOC, LGBTQ+ and other historically marginalized youth. Is there a youth bicycle program near you?</p>
      </MainContent>
      <MainContent
        contentPadding="0vh 4vw 4vh 4vw"
        maxWidth="800px"
      >
      <Container>
        <div className="embed-container">
          <iframe 
            width="800" 
            height="500" 
            frameBorder="0" 
            scrolling="no" 
            marginHeight="0" 
            marginWidth="0" 
            title="National Youth Programs Map" 
            src="https://pfb.maps.arcgis.com/apps/Embed/index.html?webmap=458326200f3745c5908b4ae3aa10f5dc&extent=-139.5761,16.4746,-60.1229,53.5446&zoom=true&previewImage=false&scale=true&legendlayers=true&disable_scroll=true&theme=light">
          </iframe>
        </div>
      </Container>
      <p><strong>Map Legend is in accessible with the `{'>>'}` icon in the upper left hand corner of the map.</strong></p>
      <p>Questions about the map? Is there a program near you that you would like to see on the map? <a href="https://docs.google.com/forms/d/e/1FAIpQLSfv_WGPAQiZFb-i4lnkhuk2lAc7S9Y_aN-CMfYDfCBP4NPHcA/viewform" target="_blank">Let us know</a>.</p>
      </MainContent>
    </>
  )
}
