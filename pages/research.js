import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Hits, InstantSearch, useSearchBox } from 'react-instantsearch-hooks-web';
import { RefinementList } from 'react-instantsearch-hooks-web';
import { PrismicRichText } from '@prismicio/react';

import { AlgoliaIndex, AlgoliaReactClient } from '~/lib/algolia/algoliaClient';
import { getReports, getResearchLandingPage } from '~/lib/queries/reports';
import { contentConcat } from '~/utils/contentConcat';
import { linkResolver } from '~/utils';

import { Page } from '~/components/new/page';
import { Button } from '~/components/new/button';

export default function ResearchPage({ featuredReport, latestReport, researchLandingPageContent }) {
  
  return (
    <Page title="Research" showDonate={false}>
      <Intro />
      { featuredReport !== null &&
        <Announcement featuredReport={featuredReport} />
      } 
      <Reports />
      <Donate />
    </Page>
  );
}

export async function getStaticProps() {
  // Report List
  const rawReports = await getReports();
  const formattedReports = formatReports(rawReports);

  // Research page content
  const researchLandingPageContent = await getResearchLandingPage()
  const featuredReport = researchLandingPageContent.research_landing_page.featured_report

  // Push latest reports over to Algolia to be indexed
  if (process.env.ALGOLIA_INDEXING_ENABLED === 'true') {
    await AlgoliaIndex('PFB_RESEARCH').saveObjects(formattedReports);
  }

  // Sort reports by date
  const latestReport = formattedReports.sort((a, b) => a.date < b.date)[0];

  return {
    props: { 
      featuredReport,
      researchLandingPageContent,
      latestReport 
    },
    revalidate: 60,
  };
}

const formatReports = (payload) => {
  const formattedPayload = [];

  if (payload.length > 1) {
    payload.map((item) => {
      formattedPayload.push({
        objectID: item.node._meta.id,
        title: `${item.node.title[0].text}`,
        summary: item.node.summary ? contentConcat(item.node.summary) : null,
        type: 'Report',
        year: item.node.year,
        date: item.node.exact_date,
        topics:
          item.node.topics.length > 0 && item.node.topics[0].title !== null
            ? item.node.topics
                .map((single) => (single.topic !== null ? single.topic.title[0].text : null))
                .filter(Boolean)
            : [],
        path: `https://www.peopleforbikes.org${linkResolver(item.node._meta) ?? ''}`,
      });
    });
  }

  return formattedPayload;
};

const Intro = () => {
  return (
    <div className="relative z-0 mt-36 flex w-full items-center justify-center py-24">
      <Image
        src="/new/Research.png"
        fill={ true }
        alt="Abstract image of Bicyclist with graphs overlaid"
        className="absolute inset-0 z-0 block h-full w-full object-cover object-[center_20%]"
        priority
      />
      <div className="relative z-10 text-center font-dharma text-9xl font-bold text-white">
        Research
      </div>
    </div>
  );
};

const Announcement = ({ featuredReport }) => {
  console.log(Array.isArray(featuredReport.report_tags))
  return (
    <div className="mx-auto max-w-7xl p-8 pb-0 md:p-16">
      <div className="text-sm font-bold uppercase text-redAccent">Featured Research</div>
      <div className="font-dharma text-5xl">
        <span>{featuredReport.title[0].text}</span>
      </div>
      { Array.isArray(featuredReport.report_tags) === true &&
        <div className="flex flex-wrap gap-2 mt-2 mb-2">
          { featuredReport.report_tags.map((topic) => (
            <span className="rounded bg-lightestGray px-1 py-0.5 text-xs font-bold uppercase">
              {topic.tag.tag_name}
            </span>
          ))}
        </div>   
      }
      <div className="mt-2 line-clamp-3 leading-normal text-black/80">
        <PrismicRichText field={featuredReport.summary} />
      </div>
      <div className="mt-4">
        <Button to={linkResolver(featuredReport._meta)} label="View the resource" size="small" />
      </div>
    </div>
  );
};

const Reports = () => {
  return (
    <InstantSearch searchClient={AlgoliaReactClient} indexName="PFB_RESEARCH">
      <div className="relative mx-auto max-w-7xl space-y-8 p-8 sm:flex sm:space-y-0 md:p-16">
        <div className="overflow-y-auto rounded-lg bg-darkest-blue p-8 text-white sm:sticky sm:top-44 sm:h-[calc(100vh-13rem)] sm:w-1/3 md:p-12">
          <CustomSearchBox />
          <CustomFilters />
        </div>
        <div className="sm:w-2/3 sm:p-8 sm:pr-0 md:p-12">
          <CustomResults />
        </div>
      </div>
    </InstantSearch>
  );
};

const CustomSearchBox = (props) => {
  const [searchQuery, setSearchQuery] = useState('');

  const { refine } = useSearchBox(props);

  const onChange = useCallback(
    (event) => {
      const newQuery = event.currentTarget.value;
      setSearchQuery(newQuery);
      refine(newQuery);
    },
    [setSearchQuery, refine],
  );

  return (
    <div className="rounded-lg bg-white px-2 sm:px-4">
      <input
        type="search"
        value={searchQuery}
        onChange={onChange}
        className="h-full w-full border-none bg-transparent py-2 text-base font-bold text-black focus:ring-0 lg:text-xl"
        placeholder="Keyword search..."
      />
    </div>
  );
};

const CustomFilters = () => {
  return (
    <div className="dark mt-8 space-y-8">
      <div>
        <div className="text-sm font-bold uppercase text-white">Type</div>
        <RefinementList attribute="type" />
      </div>
      <div>
        <div className="text-sm font-bold uppercase text-white">Year</div>
        <RefinementList attribute="year" limit={5} showMore={true} />
      </div>
      <div>
        <div className="text-sm font-bold uppercase text-white">Topic</div>
        <RefinementList attribute="topics" limit={5} showMore={true} />
      </div>
    </div>
  );
};

const CustomResults = () => {
  return <Hits hitComponent={CustomResult} />;
};

const CustomResult = ({ hit }) => {
  return (
    <div className="mb-12 block text-black">
      <div className="text-sm font-bold uppercase text-redAccent">{hit.type}</div>
      <div className="line-clamp-1 font-dharma text-3xl font-medium sm:text-4xl">{hit.title}</div>
      <div className="flex flex-wrap gap-2">
        {hit.topics.map((topic, i) => (
          <span 
            className="rounded bg-lightestGray px-1 py-0.5 text-xs font-bold uppercase"
            key={ i }
          >
            {topic}
          </span>
        ))}
      </div>
      <div className="mt-2 line-clamp-3 leading-normal text-black/80">{hit.summary}</div>
      <div className="mt-4">
        <Button to={hit.path} label="View the resource" size="small" />
      </div>
    </div>
  );
};

const Donate = () => {
  return (
    <div className="relative z-60 flex items-center justify-center gap-4 bg-blueAccent p-8 text-white sm:p-12 xl:px-24 xl:py-16">
      <Button
        to="https://www.classy.org/give/117371#!/donation/checkout"
        variant="gold"
        label={DONATE_LABEL}
      />
      <span className="hidden font-dharma sm:inline sm:text-4xl xl:text-5xl">{DONATE_CAPTION}</span>
    </div>
  );
};

const DONATE_LABEL = `Give today`;

const DONATE_CAPTION = `Your support matters`;
