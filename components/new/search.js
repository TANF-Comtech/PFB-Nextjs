import React, { useCallback, useRef } from 'react';
import Link from 'next/link';
import { useAtom, useSetAtom } from 'jotai';
import { Hits, InstantSearch, useSearchBox, RefinementList } from 'react-instantsearch';

import { searchAtom, queryAtom, mobileSearchAtom } from '~/atoms';
import { Button } from '~/components/new/button';
import { AlgoliaReactClient } from '~/lib/algolia/algoliaClient';
import useOnClickOutside from '~/hooks/useOnClickOutside';

export const Search = () => {
  const ref = useRef(null);
  const setIsSearchOpen = useSetAtom(searchAtom);

  useOnClickOutside(ref, () => {
    setIsSearchOpen(false);
  });

  return (
    <InstantSearch searchClient={AlgoliaReactClient} indexName="MAINSITE">
      <div ref={ref} className="hidden lg:block">
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

export const MobileSearch = () => {
  const [isSearchOpen, setIsSearchOpen] = useAtom(mobileSearchAtom);

  if (!isSearchOpen) return null;

  return (
    <InstantSearch searchClient={AlgoliaReactClient} indexName="MAINSITE">
      <div className="fixed inset-0 z-[2001] flex flex-col gap-4 p-4 sm:gap-8 sm:p-8 lg:hidden">
        <div className="flex justify-center">
          <Button label="Close" onClick={() => setIsSearchOpen(false)} variant="red" size="small" />
        </div>
        <div>
          <CustomSearchBox />
        </div>
        <div>
          <CustomResults />
        </div>
      </div>
      <CustomBackdrop />
    </InstantSearch>
  );
};

const CustomSearchBox = (props) => {
  const [searchQuery, setSearchQuery] = useAtom(queryAtom);

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
    <div className="h-full rounded-lg bg-white px-2 sm:px-4">
      <input
        type="search"
        value={searchQuery}
        onChange={onChange}
        className="h-full w-full border-none bg-transparent py-2 text-base font-bold text-black focus:ring-0 lg:text-xl"
        placeholder="What are you looking for?"
      />
    </div>
  );
};

const CustomResults = () => {
  return (
    <div className="flex aspect-square w-full flex-shrink-0 overflow-y-scroll rounded-lg bg-lightestGray lg:aspect-video">
      <div className="hidden w-1/4 space-y-4 p-4 pr-2 lg:block">
        <div>
          <div className="text-sm font-bold uppercase text-black">Topics</div>
          <RefinementList attribute="topics" limit={5} showMore={true} />
        </div>
        <div>
          <div className="text-sm font-bold uppercase text-black">Locations</div>
          <RefinementList attribute="locations" limit={5} showMore={true} />
        </div>
      </div>
      <div className="py-4 sm:p-4 lg:w-3/4 lg:pl-2">
        <Hits hitComponent={CustomResult} />
      </div>
    </div>
  );
};

const CustomResult = ({ hit }) => {
  const setIsSearchOpen = useSetAtom(searchAtom);
  const setIsMobileSearchOpen = useSetAtom(mobileSearchAtom);

  const handleCloseSearch = useCallback(() => {
    setIsSearchOpen(false);
    setIsMobileSearchOpen(false);
  }, [setIsSearchOpen, setIsMobileSearchOpen]);

  const href = hit.path.split('https://www.peopleforbikes.org/')[1];

  return (
    <Link
      href={`/${href}`}
      onClick={handleCloseSearch}
      className="-mt-4 mb-4 block rounded-lg p-4 text-black transition duration-300 hover:bg-white"
    >
      <div className="text-sm font-bold uppercase text-redAccent">{hit.type}</div>
      <div className="line-clamp-1 font-dharma text-3xl font-medium sm:text-4xl">{hit.title}</div>
      <div className="line-clamp-3 text-sm leading-snug text-black/80">{hit.content}</div>
    </Link>
  );
};

const CustomBackdrop = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-[2000] h-full w-full bg-black/90 lg:z-50 lg:bg-black/50" />
  );
};
