import MainContent from '../global/main-content'
import RedActionItem from '../slices/action-item-red'

/**
 * <GrantsPillars>
 * 
 * Very simple static list of Grants Pillars and their paths
 */
const GrantsPillars = () => {
  return (
    <>
      <MainContent>
        <h2>Get Started with Grants</h2>
        <RedActionItem 
          path="/grants/guidelines"
          title="Grant Guidelines"
          text="Learn more about our grant guidelines and what kind of projects we fund."
        /> 
        <RedActionItem 
          path="/grants/funding"
          title="Grant Funding"
          text="Learn how you can get your company involved in funding better biking."
        />
        <RedActionItem 
          path="/grants/applications"
          title="Grant Applications"
          text="Find out when one of our semi-annual grant cycles will be available."
        />            
      </MainContent>
    </>
  )
}

export default GrantsPillars