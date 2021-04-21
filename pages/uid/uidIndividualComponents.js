import React from "react";
import TakeActionList from "../../components/content/takeaction-list";
import GrantsIconGrid from "../../components/content/grants-icon-grid";
import MemberPillars from "../../components/content/member-pillars";
import ResearchPillars from "../../components/content/reesearch-pillars";
import ColorBanner from "../../components/global/color-banner";

export default function UidIndividualComponents({ landing_page }) {
  return (
    <>
      {
        // MEMBER CENTER PILLARS
        landing_page._meta.uid === "members" && <MemberPillars />
      }

      {
        // LOCAL INNOVATION RESEARCH PILLARS
        landing_page._meta.uid === "local-innovation" && <ResearchPillars />
      }

      {
        // TAKE ACTION BLOCKS
        landing_page._meta.uid === "take-action" && <TakeActionList />
      }

      {
        // GRANTS LOGO GRID
        landing_page._meta.uid === "grants" && <GrantsIconGrid />
      }

      {
        // COLOR BANNER - not on member page
        landing_page._meta.uid !== "members" && <ColorBanner />
      }
    </>
  );
}
