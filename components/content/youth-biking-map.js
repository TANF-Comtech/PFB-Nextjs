import styled from "styled-components"

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

/**
 * <YouthBikingMap>
 * 
 * Static iFrame of a Youth Biking Map
 * This was only designed to use on /pages/local-innovation/[uid].js
 */
export default function YouthBikingMap() {

  return (
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
  )
}
