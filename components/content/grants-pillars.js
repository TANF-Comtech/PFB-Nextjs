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
          path="/grant-guidelines"
          title="Grant Guidelines"
          text="Learn more about our grant guidelines and what kind of projects we fund."
        /> 
        <RedActionItem 
          path="/grant-funding"
          title="Grant Funding"
          text="Learn how you can get your company involved in funding better biking."
        />
        <RedActionItem 
          path="/grant-application"
          title="Grant Application"
          text="Find out when one of our semi-annual grant cycles will be available."
        />            
      </MainContent>
    </>
  )
}

export default GrantsPillars