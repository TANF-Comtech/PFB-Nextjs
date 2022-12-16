import MainContent from '~/components/main-content';
import WayfindingItem from '~/components/wayfinding-item';

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
        <WayfindingItem
          path="/grant-guidelines"
          title="Grant Guidelines"
          text="Learn more about our grant guidelines and what kind of projects we fund."
        />
        {/* MISSING IN PRISMIC? */}
        {/* <WayfindingItem
          path="/grant-funding"
          title="Grant Funding"
          text="Learn how you can get your company involved in funding better biking."
        /> */}
        {/* REPLACED WITH NEW GRANT APPLICATION EXPERIENCE */}
        <WayfindingItem
          path="#application"
          title="Grant Application"
          text="Find out when one of our semi-annual grant cycles will be available."
        />
      </MainContent>
    </>
  );
};

export default GrantsPillars;
