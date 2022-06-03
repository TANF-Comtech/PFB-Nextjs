import React from 'react';
import TakeActionList from '../content/takeaction-list';
import ColorBanner from '../global/color-banner';

export default function UidIndividualComponents({ landing_page }) {
  return (
    <>
      {
        // TAKE ACTION BLOCKS
        landing_page._meta.uid === 'take-action' && <TakeActionList />
      }

      {
        // COLOR BANNER - not on member page
        landing_page._meta.uid !== 'members' && <ColorBanner />
      }
    </>
  );
}
