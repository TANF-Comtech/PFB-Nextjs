import React from 'react';
import { useRouter } from 'next/router';
import * as prismicH from '@prismicio/helpers';

import CustomErrorPage from '~/pages/404';

import { getSingleLandingPage, getLandingPages } from '~/lib/queries/landing-page';
import { getAllNewsForLandingPage } from '~/lib/queries/news';
import { getLocations } from '~/lib/queries/locations';
import { getTopics } from '~/lib/queries/topics';
import { getRides } from '~/lib/queries/rides';
import { getTeamMembers, getCEO } from '~/lib/queries/team';
import { getAllCareers } from '~/lib/queries/careers';
import { getEventsByCategory } from '~/lib/queries/events';
import { getStats } from '~/lib/queries/statistics';
import { AlgoliaIndex } from '~/lib/algolia/algoliaClient';
import { newsFormatter } from '~/lib/algolia/newsFormatter';
import { topicFormatter } from '~/lib/algolia/topicFormatter';
import { statsFormatter } from '~/lib/algolia/statsFormatter';
import { locationFormatter } from '~/lib/algolia/locationFormatter';

import { LegacyPage } from '~/components/legacy-page';
import Wrapper from '~/components/wrapper';
import Spinner from '~/components/spinner';
import UidHeader from '~/components/uid/uidHeaders';
import UidMemberSlices from '~/components/uid/uidMemberSlices';
import UidSlices from '~/components/uid/uidSlices';
import UidIndividualComponents from '~/components/uid/uidIndividualComponents';
import ConditionalSections from '~/components/uid/uidConditionalSections';
import FallbackImage from '~/components/fallback-image';

/**
 * TheMonster()
 * Wrangled in a bit, but still has big teeth to chew on you
 */
export default function TheMonster({ page, preview }) {
  const router = useRouter();

  // If page hasn't arrived yet, show loader
  if (router.isFallback) {
    return <Spinner />;
  }

  // If page never shows, throw 404
  if (!page) {
    return (
      <>
        <CustomErrorPage />
      </>
    );
  }

  // Then we destructure the main payload once page has arrived
  const { landing_page } = page;

  return (
    <LegacyPage>
      <Wrapper postTitle={prismicH.asText(landing_page.title)} isWide={true}>
        <UidHeader landing_page={landing_page} />
        <ConditionalSections landing_page={landing_page} />

        {landing_page._meta.uid === 'members' ? (
          <UidMemberSlices landing_page={landing_page} />
        ) : (
          <UidSlices landing_page={landing_page} />
        )}

        <UidIndividualComponents landing_page={landing_page} />
      </Wrapper>
    </LegacyPage>
  );
}

/**
 * The Monster - server side processing
 *
 * Next wants to render from the server side via getServerSideProps or getStaticProps
 * This function serves that purpose for the entire Monster page
 * Because this page is crazy, there is a lot of logic to send in as props
 * Read about this here: https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 *
 * We're essentially making our queries to Prismic here (see /lib/queries)
 * Then we send the data into the page via the `pageData` variable to the `page` prop
 * Every landing page gets at least that much data
 *
 * Some pages have an additional payload that gets a second query
 * We figure this out by looking at the `uid` key of the `pageData.landing_page` payload
 * If there is a second payload, we add it to the `data` key of `pageData.landing_page`
 * We then return those two payloads together, and send it back to the `TheMonster` page above
 *
 * For certain routes, we're also formatting and sending the query payload to Algolia for indexing
 * More here: https://www.algolia.com/doc/api-client/methods/indexing/
 *
 * @param { obj } params - Nextjs route params for dynamic routes
 * @param { boolean } preview - boolean that tells us if we're looking at a preview page or the real thing
 * @param { obj } previewData - data payload for the preview page (not used, yet)
 *
 * @returns { obj } props - data for page to render
 */

/* The return here sends the `page` prop back to the BasicPage component above for rendering */
export async function getStaticProps({ params, preview = false, previewData }) {
  // ALL LANDING PAGES
  let pageData = await getSingleLandingPage(params.uid, previewData);
  let algoliaFormattedData;

  // 404 Handling
  if (!pageData) {
    return {
      notFound: true,
    };
  }

  // PAGE-SPECIFIC PAYLOADS
  switch (params.uid) {
    case 'news':
      pageData.landing_page.data = await getAllNewsForLandingPage(params.uid, previewData);
      if (process.env.ALGOLIA_INDEXING_ENABLED === 'true') {
        algoliaFormattedData = newsFormatter(pageData.landing_page.data);
        await AlgoliaIndex().saveObjects(algoliaFormattedData);
      }
      break;

    case 'locations':
      pageData.landing_page.data = await getLocations(params.uid, previewData);
      if (process.env.ALGOLIA_INDEXING_ENABLED === 'true') {
        algoliaFormattedData = locationFormatter(pageData.landing_page.data);
        await AlgoliaIndex().saveObjects(algoliaFormattedData);
      }
      break;

    case 'topics':
      pageData.landing_page.data = await getTopics(params.uid, previewData);
      if (process.env.ALGOLIA_INDEXING_ENABLED === 'true') {
        algoliaFormattedData = topicFormatter(pageData.landing_page.data);
        await AlgoliaIndex().saveObjects(algoliaFormattedData);
      }
      break;

    case 'rides':
      pageData.landing_page.data = await getRides(params.uid, previewData);
      break;

    case 'team':
      pageData.landing_page.dataTeam = await getTeamMembers(params.uid, previewData);
      pageData.landing_page.dataCEO = await getCEO(params.uid, previewData);
      break;

    case 'careers':
      pageData.landing_page.data = await getAllCareers(params.uid, previewData);
      break;

    case 'events':
      pageData.landing_page.data = await getEventsByCategory(params.uid, previewData);
      break;

    case 'research':
      pageData.landing_page.data = await getStats();
      if (process.env.ALGOLIA_INDEXING_ENABLED === 'true') {
        algoliaFormattedData = statsFormatter(pageData.landing_page.data);
        await AlgoliaIndex().saveObjects(algoliaFormattedData);
      }
      break;
  }

  return {
    props: {
      preview,
      page: pageData ?? null,
      fallback: FallbackImage(),
    },
    revalidate: 60,
  };
}

// getStaticPaths requires a the whole paths argument to be objects of URL it needs to statically render server-side
export async function getStaticPaths() {
  const allPages = await getLandingPages();

  return {
    paths:
      allPages
        .filter(({ node }) => node._meta.uid !== 'research')
        ?.map(({ node }) => `/${node._meta.uid}`) || [],
    fallback: false,
  };
}
