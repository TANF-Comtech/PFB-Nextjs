import * as React from 'react';
import { useEffect, useRef } from 'react';
import cx from 'classnames';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { Popover } from '@headlessui/react';
import { useInView } from 'react-intersection-observer';
import useScrollPosition from '@react-hook/window-scroll';

import { Button } from '~/components/new/button';
import { ExternalLink } from './external-link';

type ActiveTab = 'infrastructure' | 'policy' | 'participation' | 'about' | null;

const activeTabAtom = atom<ActiveTab>(null);
const searchOpenAtom = atom<boolean>(false);
const searchQueryAtom = atom<string>('');
const siteMapInViewAtom = atom<boolean>(false);

type PageProps = MetaProps & {
  showBanner?: boolean;
  showHeader?: boolean;
  showFooter?: boolean;
  hasHero?: boolean;
  legacy?: boolean;
  children: React.ReactNode;
};

export const Page = ({
  showBanner = true,
  showHeader = true,
  showFooter = true,
  hasHero = false,
  legacy = false,
  children,
  ...rest
}: PageProps) => {
  const showFixed: boolean = showBanner || showHeader;

  return (
    <>
      {!legacy && <Meta {...rest} />}
      {showFixed && (
        <Fixed>
          {showBanner && <Banner />}
          {showHeader && <Header hasHero={hasHero} />}
        </Fixed>
      )}
      {children}
      <DonationBanner />
      {showFooter && <Footer />}
      <Script src="https://kit.fontawesome.com/3f0052fea3.js" crossOrigin="anonymous" />
    </>
  );
};

type MetaProps = {
  title?: string;
  desc?: string;
  keywords?: string;
  path?: string;
  imgSrc?: string;
  imgWidth?: string;
  imgHeight?: string;
  ldJSON?: unknown;
};

const Meta = (props: MetaProps) => {
  const { title, desc, keywords, path, imgSrc, imgWidth, imgHeight, ldJSON } = props;

  return (
    <Head>
      <title key="title">{title}</title>
      <meta name="description" content={desc} key="metadesc" />
      <meta name="keywords" content={keywords} key="metakeywords" />
      <meta property="fb:app_id" content="1771036746278242" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content="PeopleForBikes" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={path} />
      <meta property="og:image" content={imgSrc} key="ogimg" />
      <meta property="og:image:width" content={imgWidth} key="ogimgw" />
      <meta property="og:image:height" content={imgHeight} key="ogimgh" />
      <meta property="og:title" content={title} key="ogtitle" />
      <meta property="og:description" content={desc} key="ogdesc" />
      <meta property="og:url" content={path} key="ogurl" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@peopleforbikes" />
      <meta name="twitter:domain" content="peopleforbikes.org" />
      <meta name="twitter:title" content={title} key="twtrtitle" />
      <meta name="twitter:description" content={desc} key="twtrdesc" />
      <meta name="twitter:image" content={imgSrc} key="twitterimg" />
      <link rel="canonical" href={path} key="canonical" />
      {ldJSON ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: formatLinkedData(ldJSON) }}
        />
      ) : null}
    </Head>
  );
};

type FixedProps = {
  children: React.ReactNode;
};

const Fixed = ({ children }: FixedProps) => {
  return <div className="fixed left-0 right-0 top-0 z-[1010] flex w-full flex-col">{children}</div>;
};

const Banner = () => {
  return (
    <div className="relative z-50 h-12 bg-darkest-blue px-4 text-white">
      <div className="mx-auto flex h-full max-w-screen-xl items-center justify-between text-sm font-bold uppercase leading-none">
        <div className="inline-flex items-center gap-2">
          <Popover className="relative uppercase">
            <Popover.Button className="uppercase">Explore our network of sites</Popover.Button>
            <Popover.Panel className="min-full absolute -left-4 z-50 mt-4 w-[320px] bg-darkest-blue p-4">
              <div className="flex flex-col gap-4">
                <ExternalLink href="https://www.peopleforbikes.org/" className="hover:underline">
                  PeopleForBikes Main site
                </ExternalLink>
                <ExternalLink
                  href="https://cityratings.peopleforbikes.org/"
                  className="hover:underline"
                >
                  City Ratings
                </ExternalLink>
                <ExternalLink href="https://shift.peopleforbikes.org/" className="hover:underline">
                  Shift'22 Conference
                </ExternalLink>
                <ExternalLink href="https://www.ridespot.org/" className="hover:underline">
                  Ride Spot
                </ExternalLink>
                <Link href="https://www.peopleforbikes.org/campaigns" className="hover:underline">
                  View more sites
                </Link>
              </div>
            </Popover.Panel>
          </Popover>
        </div>
        <div className="inline-flex items-center gap-3">
          <div>Corporate member center</div>
          <span className="rounded-lg bg-gold p-2 text-black">enter</span>
        </div>
      </div>
    </div>
  );
};

const Header = ({ hasHero }) => {
  const scrollY = useScrollPosition();
  const hasScrolled = scrollY >= 32;
  const isSiteMapInView = useAtomValue(siteMapInViewAtom);
  const [activeTab, setActiveTab] = useAtom(activeTabAtom);

  return (
    <div className="group relative" onMouseLeave={() => setActiveTab(null)}>
      <div
        className={cx(
          !hasHero || hasScrolled
            ? 'bg-white text-black shadow-xl'
            : 'bg-transparent text-white group-hover:bg-white group-hover:text-black group-hover:shadow-xl',
          'relative z-40 items-center px-4 transition duration-700',
          activeTab && '!shadow-none',
          isSiteMapInView ? 'opacity-0' : 'opacity-100',
        )}
      >
        <div className="mx-auto flex h-24 max-w-screen-xl items-center justify-between">
          <Logo />
          <Navigation />
          <Search />
        </div>
      </div>
      <MegaMenu />
    </div>
  );
};

type LogoProps = React.ComponentPropsWithoutRef<'div'> & {
  invert?: boolean;
  showWordMark?: boolean;
};

const Logo = ({ className = '', invert, showWordMark = false, ...rest }: LogoProps) => {
  return (
    <h1 className={cx('w-1/4 flex-shrink-0', className)} {...rest}>
      <Link href="/">
        <a className="flex items-center gap-3">
          <div className="rounded bg-white p-px">
            <img src="/new/pfb-logomark.png" className="block h-12 w-auto" alt="People for Bikes" />
          </div>
          <img
            src="/new/pfb-wordmark.png"
            className={cx(
              showWordMark ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
              'block h-12 w-auto transition duration-700',
              invert && 'invert',
            )}
            alt="People for Bikes"
          />
          <span className="sr-only">People for Bikes</span>
        </a>
      </Link>
    </h1>
  );
};

const MAIN_NAVIGATION: Array<any> = [
  {
    key: 'infrastructure',
    title: 'Infrastructure',
  },
  {
    key: 'policy',
    title: 'Policy',
  },
  {
    key: 'participation',
    title: 'Participation',
  },
  {
    key: 'about',
    title: 'About',
  },
  { key: 'donate', title: 'Donate' },
];

const EXTRA_NAVIGATION: Array<any> = [
  {
    key: 'mission',
    title: 'Mission',
  },
  {
    key: 'Team',
    title: 'Team',
  },
  {
    key: 'Board',
    title: 'Board',
  },
  {
    key: 'Careers',
    title: 'Careers',
  },
  {
    key: 'Privacy',
    title: 'Privacy',
  },
  {
    key: 'Join',
    title: 'Join',
  },
  {
    key: 'Members',
    title: 'Members',
  },
];

const Navigation = () => {
  const isSearchOpen = useAtomValue(searchOpenAtom);
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const [activeTab, setActiveTab] = useAtom(activeTabAtom);

  return (
    <nav className="relative flex w-1/2 justify-center">
      <ul className="flex justify-center gap-8 font-dharma text-4xl">
        {MAIN_NAVIGATION.map((item: any) => (
          <li key={item.key}>
            <button
              onClick={() => setActiveTab(item.key)}
              className="group/button relative inline-block cursor-pointer whitespace-pre px-4 pb-1.5 pt-2 leading-none"
            >
              <div
                className={cx(
                  'absolute inset-0 z-0 h-full w-full rounded-lg transition duration-700',
                  activeTab === item.key && '!bg-lightestGray',
                  item.key !== 'donate'
                    ? 'bg-transparent group-hover/button:bg-lightestGray'
                    : 'bg-gold',
                )}
              />
              <span className="relative z-10">{item.title}</span>
            </button>
          </li>
        ))}
      </ul>
      {isSearchOpen && (
        <div className="absolute inset-0 z-10 flex h-full w-full min-w-full flex-shrink-0 items-center justify-center rounded-lg bg-lightestGray px-4">
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.currentTarget.value)}
            className="flex h-full w-full border-none bg-transparent py-2 text-xl font-bold text-black focus:ring-0"
            placeholder="Search here..."
          />
        </div>
      )}
    </nav>
  );
};

const Search = () => {
  const [isSearchOpen, setIsSearchOpen] = useAtom(searchOpenAtom);

  return (
    <div className="flex w-1/4 flex-shrink-0 items-center justify-end gap-2">
      <button
        onClick={() => setIsSearchOpen(!isSearchOpen)}
        className="inline-flex w-6 cursor-pointer items-center justify-center gap-3"
      >
        <span className="font-bold uppercase">Search</span>
        <div className="-mb-1 w-5 flex-shrink-0">
          <i
            className={cx('fa-solid   text-xl', isSearchOpen ? 'fa-close' : 'fa-magnifying-glass')}
          />
        </div>
      </button>
    </div>
  );
};

const MegaMenu = () => {
  const activeTab = useAtomValue(activeTabAtom);

  return (
    <div
      className={cx(
        'absolute bottom-0 left-0 right-0 z-40 flex h-48 items-center justify-center bg-white transition duration-700',
        !activeTab ? 'translate-y-0 opacity-0' : 'translate-y-full opacity-100 shadow-xl',
      )}
    >
      {activeTab && <span className="text-4xl font-bold uppercase">{activeTab} menu contents</span>}
    </div>
  );
};

const DonationBanner = () => {
  return (
    <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-50 flex justify-center p-4">
      <div className="pointer-events-auto flex items-center justify-between gap-4 rounded-lg border border-solid border-white/50 bg-darkest-blue p-4 text-white shadow-2xl">
        <Button variant="gold" label="Give today" />
        <span className="font-dharma text-5xl">Your support matters</span>
      </div>
    </div>
  );
};

const inViewOptions = {
  threshold: 0,
};

const Footer = () => {
  const { ref, inView } = useInView(inViewOptions);
  const setSiteMapInView = useSetAtom(siteMapInViewAtom);

  useEffect(() => {
    setSiteMapInView(inView);
  }, [inView, setSiteMapInView]);

  return (
    <div className="relative z-[1020] flex min-h-[calc(100vh-3rem)] snap-start">
      <div className="w-1/4 bg-darkest-blue p-16 text-white">
        <ul ref={ref} className="flex flex-col gap-1.5 font-dharma text-4xl capitalize">
          {MAIN_NAVIGATION.map((item: any) => (
            <li key={item.key}>
              <button
                className={cx('relative whitespace-pre', item.key === 'donate' && 'text-gold')}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
        <ul ref={ref} className="mt-8 flex flex-col gap-1 font-dharma text-2xl capitalize">
          {EXTRA_NAVIGATION.map((item: any) => (
            <li key={item.key}>
              <button className="relative whitespace-pre">{item.title}</button>
            </li>
          ))}
        </ul>
        <hr className="my-8 h-px w-full bg-white/25" />
        <div className="flex flex-wrap gap-3">
          <div className="flex aspect-square h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white">
            <i className="fa-brands fa-facebook-f text-2xl leading-none text-black" />
          </div>
          <div className="flex aspect-square h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white">
            <i className="fa-brands fa-instagram text-2xl leading-none text-black" />
          </div>
          <div className="flex aspect-square h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white">
            <i className="fa-brands fa-linkedin-in text-2xl leading-none text-black" />
          </div>
          <div className="flex aspect-square h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white">
            <i className="fa-brands fa-twitter text-2xl leading-none text-black" />
          </div>
          <div className="flex aspect-square h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white">
            <i className="fa-brands fa-youtube text-2xl leading-none text-black" />
          </div>
        </div>
        <hr className="my-8 h-px w-full bg-white/25" />
        <div className="flex flex-col gap-3">
          <div>
            <a>info@peopleforbikes.org</a>
            <br />
            <a>(303) 449-4893</a>
          </div>
          <div>
            P.O. Box 2349
            <br />
            Boulder, Co 80306
          </div>
        </div>
      </div>
      <div className="w-3/4 bg-darkestGray p-16">
        <Logo showWordMark invert />
        <div className="mt-8 font-dharma text-5xl font-medium text-white">
          Let’s stay in touch. Join our newsletter list:
        </div>
        <div className="mt-8">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};

const SignUpForm = () => {
  const router = useRouter();
  const isFirstRenderOfSparkScript = useRef(true);

  useEffect(() => {
    if (isFirstRenderOfSparkScript.current) {
      isFirstRenderOfSparkScript.current = false;
    }
  }, [router.pathname]);

  return (
    <div className="flex flex-col">
      <div id="pfb-site-footer" className="spkactionform" />
      {isFirstRenderOfSparkScript.current && (
        <Script
          src="https://action.peopleforbikes.org/assets/js/widget.js/?id=111276"
          strategy="afterInteractive"
        />
      )}
    </div>
  );
};

const formatLinkedData = (value: unknown): string => {
  const formattedValue = JSON.stringify(value, null, 2);

  return formattedValue;
};
