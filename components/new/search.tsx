import * as React from 'react';
import { useCallback, useRef } from 'react';
import Link from 'next/link';
import { useAtom, useSetAtom } from 'jotai';
import { Hits, InstantSearch, useInstantSearch, useSearchBox } from 'react-instantsearch-hooks-web';
import { RefinementList } from 'react-instantsearch-hooks-web';

import { searchModalAtom, searchQueryAtom } from '~/atoms';
import { AlgoliaReactClient } from '~/lib/algolia/algoliaClient';
import useOnClickOutside from '~/hooks/useOnClickOutside';

export const Search = () => {
  const ref = useRef(null);
  const setIsSearchOpen = useSetAtom(searchModalAtom);

  useOnClickOutside(ref, () => {
    setIsSearchOpen(false);
  });

  return (
    <InstantSearch searchClient={AlgoliaReactClient} indexName="MAINSITE">
      <div ref={ref}>
        <div className="absolute inset-0 z-60 h-full w-full min-w-full flex-shrink-0">
          <CustomSearchBox />
        </div>
        <div className="absolute -bottom-12 left-0 right-0 z-60 h-0 w-full flex-shrink-0">
          <CustomResults />
        </div>
      </div>
      <CustomBackdrop />
    </InstantSearch>
  );
};

const CustomSearchBox = (props: any) => {
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);

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
    <div className="h-full rounded-lg bg-white px-4">
      <input
        type="search"
        value={searchQuery}
        onChange={onChange}
        className="h-full w-full border-none bg-transparent py-2 text-xl font-bold text-black focus:ring-0"
        placeholder="What are you looking for?"
      />
    </div>
  );
};

const CustomResults = () => {
  return (
    <div className="flex aspect-video w-full flex-shrink-0 overflow-y-scroll rounded-lg bg-lightestGray">
      <div className="w-1/4 space-y-4 p-4 pr-2">
        <div>
          <div className="text-sm font-bold uppercase">Topics</div>
          <RefinementList attribute="topics" limit={5} showMore={true} />
        </div>
        <div>
          <div className="text-sm font-bold uppercase">Locations</div>
          <RefinementList attribute="locations" limit={5} showMore={true} />
        </div>
      </div>
      <div className="w-3/4 p-4 pl-2">
        <Hits hitComponent={CustomResult} />
      </div>
    </div>
  );
};

const CustomResult = ({ hit }) => {
  const href = hit.path.split('https://www.peopleforbikes.org/')[1];

  return (
    <Link href={`/${href}`}>
      <a className="-mt-4 mb-4 block rounded-lg p-4 text-black transition duration-300 hover:bg-white">
        <div className="text-sm font-bold uppercase text-redAccent">{hit.type}</div>
        <div className="line-clamp-1 font-dharma text-4xl font-medium">{hit.title}</div>
        <div className="line-clamp-3 text-sm leading-snug text-black/80">{hit.content}</div>
      </a>
    </Link>
  );
};

const CustomBackdrop = () => {
  return <div className="pointer-events-none fixed inset-0 z-50 h-full w-full bg-black/50" />;
};
