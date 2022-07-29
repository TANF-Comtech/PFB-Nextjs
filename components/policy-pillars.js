import React from 'react';

import MainContent from '~/components/main-content';
import WayfindingItem from '~/components/wayfinding-item';
import Promo from '~/components/promo';

import EBikesPromo from '~/public/promo/electric-bikes-shaded.jpg';

/**
 * <PolicyPillars>
 *
 * Very simple static list of Grants Pillars and their paths
 */
const PolicyPillars = () => {
  return (
    <>
      <MainContent contentPadding="4vh 4vw">
        <h2>Explore Our Policy Pillars</h2>
        <WayfindingItem
          path="/topics/bike-safety"
          title="Building Safe Mobility Networks"
          text="Safer places for bikes give more people the confidence to get out and ride."
        />
        <WayfindingItem
          path="/topics/bike-business"
          title="Growing the Bike Industry"
          text="Creating a favorable bike business environment through legislation and regulation."
        />
        <WayfindingItem
          path="/topics/inclusive-biking"
          title="Fostering Diversity, Equity, and Inclusion"
          text="Positioning bikes as a solution to address social and mobility justice issues."
        />
        <WayfindingItem
          path="/topics/recreational-bike-access"
          title="Improving Recreational Access for Bikes"
          text="Ensuring that great places to bike are preserved and continue to grow."
        />
        <WayfindingItem
          path="/topics/sustainable-transportation"
          title="Promoting Sustainability"
          text="Providing resources for the bike industry to create more sustainable products."
        />
      </MainContent>
      <Promo
        bigWords="Electric Bikes"
        key="90812098312"
        path="/topics/electric-bikes"
        smallWords="Explore Our Work"
        source={EBikesPromo}
      />
    </>
  );
};

export default PolicyPillars;
