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
        <h2>Explore Member Content</h2>
        <RedActionItem 
          path="/members/business-intelligence-hub"
          title="Business Intelligence Hub"
          text="Explore our dashboard for insights into the bicycle industry."
        />
        <RedActionItem 
          path="/members/monthly-sales-reports"
          title="Monthly Sales Reports"
          text="Check weekly and monthly statistics in our reports."
        />
        <RedActionItem 
          path="/members/sustainability-safety-services"
          title="Sustainability & Safety Services"
          text="Find discounts with partner organizations available with your membership."
        />
        <RedActionItem 
          path="/members/ride-spot"
          title="Ride Spot Affiliate Sign-up"
          text="Receive free affiliate marketing access to the best site for finding great rides."
        />
        <RedActionItem 
          path="/events"
          title="Explore Member Events"
          text="See what activities PeopleForBikes has coming up near you."
        />                         
        <RedActionItem 
          path="/industry-webinar-series"
          title="Industry Webinar Series"
          text="Learn more about the bike industry in our webinar series."
        />                   
      </MainContent>
    </>
  )
}

export default PolicyPillars