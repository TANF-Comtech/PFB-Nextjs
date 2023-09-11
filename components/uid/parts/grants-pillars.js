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
      </MainContent>
    </>
  );
};

export default GrantsPillars;
