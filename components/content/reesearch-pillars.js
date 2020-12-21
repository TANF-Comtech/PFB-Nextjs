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
          path="/grants"
          title="Community Grants"
          text="PeopleForBikes has supported bicycle infrastructure projects and advocacy campaigns across the country for more than 20 years through the Community Grants program."
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
          path="/members/business-intelligence-hub"
          title="Business Intelligence Hub"
          text="PeopleForBikes Business Intelligence Hub is a dashboard for daily and weekly insights into the bicycle industry covering ridership, retail sales and consumer attitudes."
          textColor="#00A2DF"
        />               
      </MainContent>
    </>
  )
}

export default ResearchPillars