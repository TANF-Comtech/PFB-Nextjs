import styled from "styled-components"

import MainContent from "../global/main-content"

const Container = styled.section`
  .embed-container {
    position: relative; 
    padding-bottom: 100%; 
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
 * <PublicBusinessIntelligenceHub>
 * 
 * Can you make a longer component name? I bet not.
 * It's just an embed form for the public business intelligence hub, hosted on Google Studio
 * 
 * This was only designed to use on /pages/business-intelligence-hub.js
 */
export default function PublicBusinessIntelligenceHub() {

  return (
    <>
      <MainContent
        contentPadding="2vh 4vw 2vh 4vw"
        maxWidth="1200px"
      >
        <RedHeading>Public Business Intelligence Hub</RedHeading>
        <hr />
        <p>PeopleForBikes is providing an overview of the business side of the biking industry with our Business Intelligence Hub. Browse the content below and learn how we are improving biking for everyone.</p>
      </MainContent>
      <MainContent
        contentPadding="0vh 4vw 4vh 4vw"
        maxWidth="1200px"
      >
        <Container>
          <div className="embed-container">
            <iframe 
              width="600" 
              height="1500" 
              scrolling="yes"
              src="https://datastudio.google.com/embed/reporting/a7a0cbdd-e6d6-44a5-ae44-78198c03ff76/page/63ESB" 
              marginHeight="0" 
              marginWidth="0" 
              title="Public Business Intelligence Hub"               
              frameBorder="0" 
              allowfullscreen>  
            </iframe>
          </div>
        </Container>
      </MainContent>
      <MainContent
        contentPadding="4vh 4vw 2vh 4vw"
        maxWidth="1200px"
      >
        <p style={{ textAlign: "center" }}>Questions about this page? Reach out to <a href="mailto:patrick@peopleforbikes.org,melissa@peopleforbikes.org?subject=Questions%20about%20the%20Public%20Business%20Intelligence%20Hub">to our team</a>.</p>
      </MainContent>
    </>
  )
}
