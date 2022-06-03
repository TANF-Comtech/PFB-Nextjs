import MainContent from '../global/main-content';
import WayfindingItem from '../slices/wayfinding-item';

/**
 * <ToolkitPillars>
 *
 * This creates the container for ToolkitPillars
 * One day this will come from the backend...
 *
 */
const ToolkitPillars = () => {
  return (
    <>
      <MainContent>
        <h2>Toolkit</h2>
        <WayfindingItem
          path="https://www.youtube.com/watch?v=JlnIC-OFbgs&feature=youtu.be"
          title="Member Orientation (Webinar)"
          text="Get the most out of your volunteer experience"
        />
        <WayfindingItem
          path="https://drive.google.com/file/d/1mkho68GB39T8uN10WM-zNxZ6Bv207Z8z/view?usp=sharing"
          title="Member Orientation (PDF)"
          text="A downloadable version of the orientation webinar"
        />
        <WayfindingItem
          path="https://drive.google.com/file/d/1W-hSIxQjNa0pNddckg6E38ieoRYwTgxL/view?usp=sharing"
          title="Guiding Principles"
          text="Board and committee member guiding principles"
        />
        <WayfindingItem
          path="https://drive.google.com/file/d/1xEWsKGlF-n5rWhXhy1719UxY__xd_R02/view?usp=sharing"
          title="Effective Board Membership"
          text="Six traits of an effective board member"
        />
      </MainContent>
    </>
  );
};

export default ToolkitPillars;
