import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { Hits, InstantSearch, useSearchBox } from 'react-instantsearch-hooks-web';
import { RefinementList } from 'react-instantsearch-hooks-web';
import { PrismicRichText } from '@prismicio/react';

import { AlgoliaIndex, AlgoliaReactClient } from '~/lib/algolia/algoliaClient';
import { getReports, getResearchLandingPage } from '~/lib/queries/reports';
import { contentConcat } from '~/utils/contentConcat';
import { linkResolver } from '~/utils';

import { Page } from '~/components/new/page';
import { Button } from '~/components/new/button';

export default function ResearchPage({ 
  featuredReport,
  researchPageIntro 
}) {

  return (
    <Page title="Research" showDonate={false}>
      <Intro />
      { featuredReport !== null &&
        <Announcement 
          featuredReport={featuredReport} 
          researchPageIntro={researchPageIntro}
        />
      } 
      <Reports />
      <Donate />
    </Page>
  );
}

export async function getStaticProps() {
  
  // Report formatting
  const rawReports = await getReports(); // fetch
  const formattedReports = formatReports(rawReports); // process
  const reportsByYear = formattedReports.sort((a, b) => a.year < b.year); // reorder (descending by year)

  // Push latest reports over to Algolia to be indexed
  if (process.env.ALGOLIA_INDEXING_ENABLED === 'true') {
    await AlgoliaIndex('PFB_RESEARCH').saveObjects(reportsByYear);
  }

  // Research page content
  const researchLandingPageContent = await getResearchLandingPage()
  const featuredReport = researchLandingPageContent.research_landing_page.featured_report
  const researchPageIntro = researchLandingPageContent.research_landing_page.intro

  return {
    props: { 
      featuredReport,
      rawReports,
      researchPageIntro      
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
        type:    
          item.node.report_type !== null && item.node.report_type[0].type !== null
            ? item.node.report_type
                .map((item) => (item.type !== null ? item.type.type : null))
                .filter(Boolean)
            : ['Report'],
        year: item.node.year,
        date: item.node.exact_date,
        topics:
          item.node.report_tags.length > 0 && item.node.report_tags[0].tag.tag_name !== null
            ? item.node.report_tags
                .map((item) => (item.tag !== null ? item.tag.tag_name : null))
                .filter(Boolean)
            : [null],
        path: `https://www.peopleforbikes.org${linkResolver(item.node._meta) ?? ''}`,
        pfbSupported: item.node.pfb_supported,
        externalLink: item.node.link ? linkResolver(item.node.link) : null,
        authors: item.node.authors ? item.node.authors : null
      });
    });
  }

  return formattedPayload;
};

const Intro = () => {
  return (
    <div className="relative z-0 mt-36 flex w-full items-center justify-center py-24">
      <Image
        src="/new/Research-abstract.jpg"
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

const Announcement = ({ featuredReport, researchPageIntro }) => {
  return (
    <>
    <div className="relative z-60 bg-darkest-blue p-8 text-white sm:p-12 xl:p-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 text-base leading-normal sm:text-xl xl:text-2xl">
        <div className="leading-normal">
          <PrismicRichText field={researchPageIntro} />
        </div>
      </div>
    </div>
    <div className="mx-auto max-w-screen-xl p-8 pb-0 md:p-16">
      <div className="text-sm font-bold uppercase text-redAccent">Featured Research</div>
      <div className="font-dharma text-5xl">
        <span>{featuredReport.title[0].text} ({featuredReport.year})</span>
      </div>
      { Array.isArray(featuredReport.report_tags) === true &&
        <div className="flex flex-wrap gap-2 mt-2 mb-2">
          <span className="font-bold">Topic:&nbsp;</span> 
          { featuredReport.report_tags.map((topic, i) => (
            <span 
              className="rounded bg-lightestGray px-1 py-1 text-xs font-bold uppercase"
              key={ i }
            >
              {topic.tag.tag_name}
            </span>
          ))}
        </div>   
      }
      <div className="flex flex-wrap gap-2 mt-2">
        <span className="font-bold">Type:&nbsp;</span> 
        { featuredReport.report_type.length >= 1 ? 
          featuredReport.report_type.map((type, i) => (
            <span 
            className="rounded bg-lightestGray px-1 py-1 text-xs font-bold uppercase"
            key={ i }
          >
            { type.type.type }
          </span>
        )) : (
          <span 
            className="rounded bg-lightestGray px-1 py-1 text-xs font-bold uppercase"
          >
            Report
          </span>
        )}
      </div>
      
      {featuredReport.authors &&
        <div className="mt-2 line-clamp-3 leading-normal text-black/80">
          <span className="font-bold">Author:&nbsp;</span> 
          {featuredReport.authors}
        </div>
      }
      {featuredReport.year &&
        <div className="mt-2 line-clamp-3 leading-normal text-black/80">
          <span className="font-bold">Year:&nbsp;</span> 
          {featuredReport.year}
        </div>   
      }

      { featuredReport.summary && 
        <div className="mt-2 line-clamp-3 leading-normal text-black/80">
          <PrismicRichText field={featuredReport.summary} />
        </div>      
      }

      <div className="mt-4">
        { featuredReport.externalLink ? (
          <Button to={featuredReport.externalLink} label="View Resource" size="small" />
        ) : (
          <Button to={linkResolver(featuredReport._meta)} label="View Resource" size="small" />
        ) }
      </div>

    </div>
    </>
  );
};


const Reports = () => {
  return (
    <InstantSearch searchClient={AlgoliaReactClient} indexName="PFB_RESEARCH">
      <div className="relative mx-auto max-w-screen-xl space-y-8 p-8 sm:flex sm:space-y-0 md:p-16">
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
        placeholder="Keyword Search"
      />
    </div>
  );
};

const CustomFilters = () => {
  return (
    <div className="dark mt-8 space-y-8">
      <div>
        <div className="text-sm font-bold uppercase text-white">Topic</div>
        <RefinementList attribute="topics" operator="and" limit="100" />
      </div>
      <div>
        <div className="text-sm font-bold uppercase text-white">Type</div>
        <RefinementList attribute="type" operator="and" />
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
      <div className="text-sm font-bold uppercase text-redAccent">
        { hit.pfbSupported === true && 
          <span>★ PeopleForBikes Supported </span>
        }  
      </div>
      <div className="line-clamp-1 font-dharma text-3xl font-medium sm:text-4xl mb-2">
        {hit.title}
      </div>
      { hit.topics &&
        <div className="flex flex-wrap gap-2">
          <span className="font-bold">Topic:&nbsp;</span> 
          {hit.topics.map((topic, i) => (
            <span 
              className="rounded bg-lightestGray px-1 py-1 text-xs font-bold uppercase"
              key={ i }
            >
              {topic}
            </span>
          ))}
        </div>
      }
      {hit.type &&
        <div className="flex flex-wrap gap-2 mt-2">
          <span className="font-bold">Type:&nbsp;</span> 
          {hit.type.map((type, i) => (
            <span 
              className="rounded bg-lightestGray px-1 py-1 text-xs font-bold uppercase"
              key={ i }
            >
              {type}
            </span>
          ))}
        </div>
      }
      {hit.authors &&
        <div className="mt-2 line-clamp-3 leading-normal text-black/80">
          <span className="font-bold">Author:&nbsp;</span> 
          {hit.authors}
        </div>
      }
      {hit.year &&
        <div className="mt-2 line-clamp-3 leading-normal text-black/80">
          <span className="font-bold">Year:&nbsp;</span> 
          {hit.year}
        </div>   
      }
      {hit.summary &&
        <div className="mt-2 line-clamp-3 leading-normal text-black/80">
          <span className="font-bold">Summary:&nbsp;</span> 
          {hit.summary}
        </div>
      }
      <div className="mt-4">
        { hit.externalLink ? (
          <Button to={hit.externalLink} label="View Resource" size="small" />
        ) : (
          <Button to={hit.path} label="View Resource" size="small" />
        ) }
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
