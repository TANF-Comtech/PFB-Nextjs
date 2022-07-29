import React from 'react';

import { Grants } from '~/components/grants';
import TakeActionList from '~/components/takeaction-list';
import ColorBanner from '~/components/color-banner';

export default function UidIndividualComponents({ landing_page }) {
  return (
    <>
      {
        // GRANTS
        landing_page._meta.uid === 'grants' && <Grants />
      }

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
