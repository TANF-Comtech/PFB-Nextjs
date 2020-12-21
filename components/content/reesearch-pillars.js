import styled from 'styled-components'

import MainContent from '../global/main-content'
import RedActionItem from '../slices/action-item-red'

const PageHeading = styled.h2`
  color: ${ props => props.theme.red };
  font-weight: 700;
  margin-top: 5vh;
  text-transform: uppercase;
`

/**
 * <ResearchPillars>
 * 
 * This creates the container for ResearchPillars
 * One day this will come from the backend...
 * 
 */
const ResearchPillars = () => {
  return (
    <>
      <MainContent>
        <PageHeading>Programs</PageHeading>
        <hr />
        <RedActionItem 
          bgColor="#002C40"
          path="https://betterbikeshare.org/"
          title="Better Bike Share Partnership"
          text="The Better Bike Share Partnership focuses on increasing access to and use of shared micromobility systems in low-income and BIPOC communities."
          textColor="#00A2DF"
        /> 
        <RedActionItem 
          bgColor="#002C40"
          path="/"
          title="Final Mile"
          text="The Final Mile works to accelerate the installation of complete mobility networks in select U.S. cities. More information coming soon"
          textColor="#00A2DF"
        />        
        <RedActionItem 
          bgColor="#002C40"
          path="/"
          title="PlacesForBikes"
          text="PlacesForBikes establishes a new standard in defining and measuring great places for biking, and provides the tools and resources that accelerate local change. More information coming soon."
          textColor="#00A2DF"
        />
        <RedActionItem 
          bgColor="#002C40"
          path="/topics/youth-bicycling"
          title="Youth Bicycling"
          text="Our goal is to make bike riding better for everyone—including riders of all ages. Increasing bicycling participation among America’s youth is a key focus at PeopleForBikes."
          textColor="#00A2DF"
        />     
        <RedActionItem 
          bgColor="#002C40"
          path="/grants"
          title="Community Grants"
          text="Our Community Grants programs funds bicycle infrastructure projects and advocacy campaigns across the country."
          textColor="#00A2DF"
        />
        <RedActionItem 
          bgColor="#002C40"
          path="/"
          title="NWA Bike Business Innovation Program"
          text="The NWA Bike Business Innovation Program implements workplace-based incentive programs that rapidly increase the number of employees who bike for transportation and recreation throughout Benton County, AR. More information coming soon."
          textColor="#00A2DF"
        />
        <RedActionItem 
          bgColor="#002C40"
          path="/"
          title="Youth Cycling Coalition"
          text="The Youth Cycling Coalition (YCC) is a collaborative effort to get more children and youth on bikes and keep them bicycling throughout their lives. More information coming soon."
          textColor="#00A2DF"
        />                               
      </MainContent>
    </>
  )
}

export default ResearchPillars