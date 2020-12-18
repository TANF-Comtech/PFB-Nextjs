import MainContent from '../global/main-content'
import RedActionItem from '../slices/action-item-red'

/**
 * <PolicyPillars>
 * 
 * Very simple static list of Grants Pillars and their paths
 */
const PolicyPillars = () => {
  return (
    <>
      <MainContent
        contentPadding="4vh 4vw"
      >
        <h2>Explore Our Policy Pillars</h2>
        <RedActionItem 
          path="/topics/bike-safety"
          title="Building Safe Mobility Networks"
          text="Better and safer places for bikes give more people the confidence to get out and ride."
        />
        <RedActionItem 
          path="/topics/bike-business"
          title="Growing the Bike Industry"
          text="Creating a favorable bike business environment through legislation and regulation."
        />
        <RedActionItem 
          path="/topics/inclusive-biking"
          title="Fostering Diversity, Equity, and Inclusion"
          text="Positioning bikes as a solution to address social and mobility justice issues."
        />                  
        <RedActionItem 
          path="/topics/recreational-bike-access"
          title="Improving Recreational Access for Bikes"
          text="Ensuring that great places to bike are preserved and continue to grow."
        />             
        <RedActionItem 
          path="/topics/sustainable-transportation"
          title="Promoting Sustainability"
          text="Providing resources for cities and the bike industry to take action toward a cleaner, more sustainable future."
        />            
                   
      </MainContent>
    </>
  )
}

export default PolicyPillars