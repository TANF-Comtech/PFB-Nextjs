import React from 'react';

import ColorBanner from '~/components/color-banner';
import { Grants } from '~/components/uid/parts/grants';
import TakeActionList from '~/components/uid/parts/takeaction-list';

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
