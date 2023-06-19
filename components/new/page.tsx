import * as React from 'react';
import { useEffect, useRef } from 'react';
import cx from 'classnames';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { Popover } from '@headlessui/react';
import { IntersectionOptions, useInView } from 'react-intersection-observer';
import useScrollPosition from '@react-hook/window-scroll';

import { searchAtom, loginModalAtom, mobileMenuAtom, mobileSearchAtom } from '~/atoms';
import { Button } from '~/components/new/button';
import { ExternalLink } from '~/components/new/external-link';
import { Login } from '~/components/login';
import useOnClickOutside from '~/hooks/useOnClickOutside';
import { loggedInAtom, useLogout } from '~/lib/auth';
import { Search, MobileSearch } from '~/components/new/search';

type Section = 'infrastructure' | 'policy' | 'participation' | 'about' | 'donate' | null;

const activeTabAtom = atom<Section>(null);
const activeSectionAtom = atom<Section>(null);
const siteMapInViewAtom = atom<boolean>(false);

type PageProps = MetaProps & {
  showBanner?: boolean;
  showHeader?: boolean;
  showFooter?: boolean;
  showDonate?: boolean;
  hasHero?: boolean;
  legacy?: boolean;
  children: React.ReactNode;
};

export const Page = ({
  showBanner = true,
  showHeader = true,
  showFooter = true,
  showDonate = true,
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
      {showDonate && <DonationBanner />}
      {showFooter && <Footer />}
      <Login />
      <MobileMenu />
      <MobileSearch />
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

  const renderedTitle =
    title === 'Home' ? `PeopleForBikes | Every rider. Every ride.` : `${title} | PeopleForBikes`;

  return (
    <Head>
      <title key="title">{renderedTitle}</title>
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
      <meta property="og:title" content={renderedTitle} key="ogtitle" />
      <meta property="og:description" content={desc} key="ogdesc" />
      <meta property="og:url" content={path} key="ogurl" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@peopleforbikes" />
      <meta name="twitter:domain" content="peopleforbikes.org" />
      <meta name="twitter:title" content={renderedTitle} key="twtrtitle" />
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
  const isLoggedIn = useAtomValue(loggedInAtom);
  const [isSearchOpen, setIsSearchOpen] = useAtom(mobileSearchAtom);
  const setIsLoginModalOpen = useSetAtom(loginModalAtom);
  const logout = useLogout();

  return (
    <div className="relative z-[1030] h-12 bg-darkest-blue px-4 text-white">
      <div className="mx-auto flex h-full max-w-screen-xl items-center justify-between text-sm font-bold uppercase leading-none">
        <div className="inline-flex items-center gap-2">
          <Popover className="relative uppercase">
            <Popover.Button className="uppercase">
              <span className="sm:hidden">Network of sites</span>
              <span className="hidden sm:inline">Explore our network of sites</span>
            </Popover.Button>
            <Popover.Panel className="min-full absolute -left-4 z-50 mt-4 w-[320px] bg-darkest-blue p-4">
              <div className="flex flex-col gap-4">
                {NETWORK.map((item) => (
                  <ExternalLink key={item.title} href={item.link} className="hover:underline">
                    {item.title}
                  </ExternalLink>
                ))}
              </div>
            </Popover.Panel>
          </Popover>
        </div>
        <div className="flex-shrink-0 xl:hidden">
          <button
            onClick={() => {
              setIsSearchOpen(!isSearchOpen);
            }}
            className={cx(
              'inline-flex cursor-pointer items-center justify-center gap-3',
              isSearchOpen && 'pointer-events-none',
            )}
          >
            <span className="font-bold uppercase">Search</span>
            <div className="-mb-1 w-5 flex-shrink-0">
              <i
                className={cx(
                  'fa-solid   text-xl',
                  isSearchOpen ? 'fa-close' : 'fa-magnifying-glass',
                )}
              />
            </div>
          </button>
        </div>
        <div className="hidden items-center gap-3 xl:inline-flex">
          <Link href="/members">
            <a>
              <span className="sm:hidden">Members</span>
              <span className="hidden sm:inline">Corporate member center</span>
            </a>
          </Link>
          <span className="rounded-lg bg-gold p-2 text-black">
            {!isLoggedIn ? (
              <button onClick={() => setIsLoginModalOpen(true)}>
                <span className="uppercase">Login</span>
              </button>
            ) : (
              <span
                onClick={() => {
                  logout();
                }}
                className="uppercase"
              >
                Logout
              </span>
            )}
          </span>
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
  const ref = useRef(null!);

  useOnClickOutside(ref, () => {
    setActiveTab(null);
  });

  return (
    <div ref={ref} className="group relative">
      <MegaMenu />
      <div
        className={cx(
          !hasHero || hasScrolled || activeTab !== null
            ? 'bg-white text-black shadow-xl'
            : 'bg-white text-black shadow-xl group-hover:bg-white group-hover:text-black xl:bg-transparent xl:text-white xl:shadow-none xl:group-hover:shadow-xl',
          'relative z-60 items-center px-4 transition duration-700',
          activeTab && '!shadow-none',
          isSiteMapInView ? 'opacity-0' : 'opacity-100',
        )}
      >
        <div className="mx-auto flex h-24 max-w-screen-xl items-center justify-between">
          <Logo />
          <Navigation />
          <MenuButton />
          <SearchButton />
        </div>
      </div>
    </div>
  );
};

type LogoProps = React.ComponentPropsWithoutRef<'div'> & {
  invert?: boolean;
  showWordMark?: boolean;
};

const Logo = ({ className = '', invert, showWordMark = false, ...rest }: LogoProps) => {
  return (
    <h1 className={cx('flex-shrink-0 sm:w-1/2 xl:w-1/4', className)} {...rest}>
      <Link href="/">
        <a className="flex flex-shrink-0 items-center gap-3">
          <div className="flex-shrink-0 rounded bg-white p-px">
            <img src="/new/pfb-logomark.png" className="block h-12 w-auto" alt="People for Bikes" />
          </div>
          <img
            src="/new/pfb-wordmark.png"
            className={cx(
              showWordMark ? 'opacity-100' : 'opacity-100 xl:opacity-0 xl:group-hover:opacity-100',
              'block h-12 w-auto flex-shrink-0 transition duration-700',
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

const Navigation = () => {
  const isSearchOpen = useAtomValue(searchAtom);
  const [activeTab, setActiveTab] = useAtom(activeTabAtom);

  return (
    <nav className="relative hidden justify-center xl:flex xl:w-1/2">
      <ul className="flex justify-center gap-8 font-dharma text-4xl">
        {NAVIGATION.map((item: any) => (
          <li key={item.key}>
            <button
              onClick={() => {
                const nextActiveTab = activeTab === item.key ? null : item.key;
                setActiveTab(nextActiveTab);
              }}
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
      {isSearchOpen && <Search />}
    </nav>
  );
};

const MenuButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useAtom(mobileMenuAtom);

  return (
    <div className="flex-shrink-0 xl:hidden">
      <button
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
        className={cx(
          'inline-flex cursor-pointer items-center justify-center gap-3',
          isMenuOpen && 'pointer-events-none',
        )}
      >
        <span className="font-bold uppercase">Menu</span>
        <div className="-mb-1 w-5 flex-shrink-0">
          <i className={cx('fa-solid text-xl', isMenuOpen ? 'fa-close' : 'fa-bars')} />
        </div>
      </button>
    </div>
  );
};

const SearchButton = () => {
  const [isSearchOpen, setIsSearchOpen] = useAtom(searchAtom);
  const setActiveTab = useSetAtom(activeTabAtom);

  return (
    <div className="hidden w-1/4 flex-shrink-0 items-center justify-end gap-2 xl:flex">
      <button
        onClick={() => {
          setActiveTab(null);
          setIsSearchOpen(true);
        }}
        className={cx(
          'inline-flex cursor-pointer items-center justify-center gap-3',
          isSearchOpen && 'pointer-events-none',
        )}
      >
        <span className="font-bold uppercase">Search</span>
        <div className="-mb-1 w-5 flex-shrink-0">
          <i
            className={cx('fa-solid text-xl', isSearchOpen ? 'fa-close' : 'fa-magnifying-glass')}
          />
        </div>
      </button>
    </div>
  );
};

const MegaMenu = () => {
  const activeTab = useAtomValue(activeTabAtom);

  const ACTIVE_NAV = NAVIGATION.find((item) => item.key === activeTab) as NavigationEntry;

  return (
    <div
      className={cx(
        'absolute bottom-0 left-0 right-0 z-40 flex h-48 items-center justify-center bg-darkest-blue text-white transition duration-700',
        !activeTab
          ? 'pointer-events-none translate-y-0 opacity-0'
          : 'translate-y-[calc(100%-1px)] opacity-100 shadow-xl',
      )}
    >
      {activeTab && (
        <div className="flex items-center justify-center gap-12">
          {ACTIVE_NAV.featuredItems.length > 0 && (
            <div className="flex items-center justify-center gap-6">
              {ACTIVE_NAV.featuredItems.map((item) => (
                <DynamicLink
                  key={item.title}
                  href={item.link}
                  className="relative flex aspect-video w-64 items-center justify-center bg-black"
                >
                  <img
                    src={`/new/${item.image}`}
                    className="absolute inset-0 h-full w-full object-cover opacity-50"
                    alt=""
                    aria-hidden
                  />
                  <div className="relative z-10 px-2 text-center text-lg font-bold uppercase underline">
                    {item.title}
                  </div>
                </DynamicLink>
              ))}
            </div>
          )}
          {ACTIVE_NAV.items.length > 0 && (
            <div className="grid grid-cols-2 items-center justify-center gap-6">
              {ACTIVE_NAV.items.map((item) => (
                <div key={item.title}>
                  <DynamicLink
                    href={item.link}
                    className="inline-block text-lg font-bold underline"
                  >
                    {item.title}
                  </DynamicLink>
                </div>
              ))}
              {activeTab !== 'donate' && (
                <>
                  <Link href="/giving">
                    <a className="inline-block text-lg underline">Donate</a>
                  </Link>
                  <Link href="/topics">
                    <a className="inline-block text-lg underline">View More Topics</a>
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const MobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useAtom(mobileMenuAtom);
  const [activeSection, setActiveSection] = useAtom(activeSectionAtom);
  const isLoggedIn = useAtomValue(loggedInAtom);
  const setIsLoginModalOpen = useSetAtom(loginModalAtom);
  const logout = useLogout();

  return (
    <div
      className={cx(
        'fixed inset-0 z-[3001] h-full w-full bg-darkest-blue p-8 text-white transition duration-700 sm:!left-auto sm:w-[36rem] sm:p-24 xl:hidden',
        !isMenuOpen ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100',
      )}
    >
      <Link href="/">
        <a onClick={() => setIsMenuOpen(false)} className="flex flex-shrink-0 items-center gap-3">
          <div className="flex-shrink-0 rounded bg-white p-px">
            <img src="/new/pfb-logomark.png" className="block h-12 w-auto" alt="People for Bikes" />
          </div>
          <img
            src="/new/pfb-wordmark.png"
            className="block h-12 w-auto flex-shrink-0 invert"
            alt="People for Bikes"
          />
          <span className="sr-only">People for Bikes</span>
        </a>
      </Link>
      <ul className="mt-6 flex flex-col gap-6 sm:mt-12 sm:gap-12">
        {NAVIGATION.map((item: any) => (
          <li key={item.key}>
            <button
              onClick={() => {
                const nextActiveSection = activeSection === item.key ? null : item.key;
                setActiveSection(nextActiveSection);
              }}
              className={cx(
                'relative inline-flex items-center gap-3 whitespace-pre',
                item.key === 'donate' && 'text-gold',
              )}
            >
              <span className="font-dharma text-5xl">{item.title}</span>
              <span>
                <i
                  className={cx(
                    'fa-solid fa-plus text-base leading-none text-white',
                    item.key === activeSection && 'rotate-45',
                  )}
                />
              </span>
            </button>
            {activeSection === item.key && (
              <ul className="mt-2 space-y-2 pb-4 pl-4">
                {NAVIGATION.find((section) => section.key === item.key)?.featuredItems.map(
                  (item) => (
                    <li key={item.title}>
                      <DynamicLink href={item.link} onClick={() => setIsMenuOpen(false)}>
                        {item.title}
                      </DynamicLink>
                    </li>
                  ),
                )}
                {NAVIGATION.find((section) => section.key === item.key)?.items.map((item) => (
                  <li key={item.title}>
                    <DynamicLink href={item.link} onClick={() => setIsMenuOpen(false)}>
                      {item.title}
                    </DynamicLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
        <div className="inline-flex flex-col gap-3">
          <Link href="/members">
            <a>
              <span className="font-bold uppercase">Corporate member center</span>
            </a>
          </Link>
          <div>
            <span className="rounded-lg bg-gold p-2 font-bold text-black">
              {!isLoggedIn ? (
                <button onClick={() => setIsLoginModalOpen(true)}>
                  <span className="uppercase">Login</span>
                </button>
              ) : (
                <span
                  onClick={() => {
                    logout();
                  }}
                  className="uppercase"
                >
                  Logout
                </span>
              )}
            </span>
          </div>
        </div>
      </ul>
      <button onClick={() => setIsMenuOpen(false)} className="absolute right-0 top-0">
        <i className="fa-solid fa-close p-6 text-xl" />
      </button>
    </div>
  );
};

const DonationBanner = () => {
  return (
    <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-50 flex justify-center p-4">
      <Link href="/giving">
        <a className="pointer-events-auto flex items-center justify-between gap-4 rounded-lg border border-solid border-white/50 bg-darkest-blue p-4 text-white shadow-2xl">
          <Button variant="gold" label="Give today" />
          <span className="hidden font-dharma sm:inline sm:text-3xl xl:text-5xl">
            Your support matters
          </span>
        </a>
      </Link>
    </div>
  );
};

const Footer = () => {
  const { ref, inView } = useInView(IN_VIEW_OPTIONS);
  const [activeSection, setActiveSection] = useAtom(activeSectionAtom);
  const setSiteMapInView = useSetAtom(siteMapInViewAtom);

  useEffect(() => {
    setSiteMapInView(inView);
  }, [inView, setSiteMapInView]);

  return (
    <div className="relative z-[1020] sm:flex xl:min-h-[calc(100vh-3rem)]">
      <div className="bg-darkest-blue p-8 text-white sm:w-1/2 sm:p-12 xl:w-1/4 xl:p-16">
        <ul ref={ref} className="flex flex-col gap-1.5">
          {NAVIGATION.map((item: any) => (
            <li key={item.key}>
              <button
                onClick={() => {
                  const nextActiveSection = activeSection === item.key ? null : item.key;
                  setActiveSection(nextActiveSection);
                }}
                className={cx(
                  'relative inline-flex items-center gap-3 whitespace-pre font-bold uppercase',
                  item.key === 'donate' && 'text-gold',
                )}
              >
                <span>{item.title}</span>
                <span>
                  <i
                    className={cx(
                      'fa-solid fa-caret-right text-base leading-none text-white',
                      item.key === activeSection && 'rotate-90',
                    )}
                  />
                </span>
              </button>
              {activeSection === item.key && (
                <ul className="mt-2 space-y-2 pb-4 pl-4">
                  {NAVIGATION.find((section) => section.key === item.key)?.featuredItems.map(
                    (item) => (
                      <li key={item.title}>
                        <DynamicLink href={item.link}>{item.title}</DynamicLink>
                      </li>
                    ),
                  )}
                  {NAVIGATION.find((section) => section.key === item.key)?.items.map((item) => (
                    <li key={item.title}>
                      <DynamicLink href={item.link}>{item.title}</DynamicLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <hr className="my-8 h-px w-full bg-white/25" />
        <div className="flex flex-wrap justify-center gap-3">
          <ExternalLink
            href="https://www.facebook.com/PeopleForBikes/"
            className="flex aspect-square h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white"
          >
            <i className="fa-brands fa-facebook-f text-2xl leading-none text-black" />
          </ExternalLink>
          <ExternalLink
            href="https://www.instagram.com/peopleforbikes/"
            className="flex aspect-square h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white"
          >
            <i className="fa-brands fa-instagram text-2xl leading-none text-black" />
          </ExternalLink>
          <ExternalLink
            href="https://www.linkedin.com/company/peopleforbikes/"
            className="flex aspect-square h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white"
          >
            <i className="fa-brands fa-linkedin-in text-2xl leading-none text-black" />
          </ExternalLink>
          <ExternalLink
            href="https://twitter.com/peopleforbikes"
            className="flex aspect-square h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white"
          >
            <i className="fa-brands fa-twitter text-2xl leading-none text-black" />
          </ExternalLink>
          <ExternalLink
            href="https://www.youtube.com/user/peopleforbikes/videos"
            className="flex aspect-square h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white"
          >
            <i className="fa-brands fa-youtube text-2xl leading-none text-black" />
          </ExternalLink>
        </div>
        <hr className="my-8 h-px w-full bg-white/25" />
        <div className="flex flex-col gap-3 font-bold">
          <div>
            <a href="mailto:info@peopleforbikes.org">info@peopleforbikes.org</a>
            <br />
            <a href="tel:13034494893">(303) 449-4893</a>
          </div>
          <div>
            P.O. Box 2349
            <br />
            Boulder, CO 80306
          </div>
        </div>
      </div>
      <div className="bg-white p-8 sm:w-1/2 sm:p-12 xl:w-3/4 xl:p-16">
        <Logo showWordMark />
        <div className="mt-8 font-dharma text-3xl font-medium text-black sm:text-4xl xl:text-5xl">
          Let’s stay in touch. Join our newsletter:
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

const DynamicLink = ({ href, children, ...rest }) => {
  if (href.startsWith('http')) {
    return (
      <ExternalLink href={href} {...rest}>
        {children}
      </ExternalLink>
    );
  }

  return (
    <Link href={`/${href}`}>
      <a {...rest}>{children}</a>
    </Link>
  );
};

const formatLinkedData = (value: unknown): string => {
  const formattedValue = JSON.stringify(value, null, 2);

  return formattedValue;
};

type NetworkEntry = {
  title: string;
  link: string;
};

const NETWORK: Array<NetworkEntry> = [
  { title: 'PeopleForBikes Main site', link: 'https://www.peopleforbikes.org/' },
  { title: 'City Ratings', link: 'https://cityratings.peopleforbikes.org/' },
  { title: 'Shift’22 Conference', link: 'https://shift.peopleforbikes.org/' },
  { title: 'Ride Spot', link: 'https://www.ridespot.org/' },
  { title: 'View more sites', link: 'https://www.peopleforbikes.org/campaigns' },
];

type NavigationEntry = {
  key: string;
  title: string;
  featuredItems: Array<FeaturedItem>;
  items: Array<Item>;
};

type FeaturedItem = {
  image: string;
  title: string;
  link: string;
};

type Item = {
  title: string;
  link: string;
};

const NAVIGATION: Array<NavigationEntry> = [
  {
    key: 'infrastructure',
    title: 'Infrastructure',
    featuredItems: [
      {
        image: '1_CityRatings.png',
        title: 'City Ratings',
        link: 'https://cityratings.peopleforbikes.org/',
      },
      {
        image: '1_FinalMile.png',
        title: 'Final Mile',
        link: 'https://finalmile.peopleforbikes.org/',
      },
    ],
    items: [
      { title: 'Local Innovation', link: 'local-innovation' },
      { title: 'Bicycle Network Analysis', link: 'https://bna.peopleforbikes.org/' },
      { title: 'Grants', link: 'grants' },
    ],
  },
  {
    key: 'policy',
    title: 'Policy',
    featuredItems: [
      {
        image: '2_ElectricBicycles.png',
        title: 'Electric Bicycles',
        link: 'topics/electric-bikes',
      },
      {
        image: '2_ElectricBicycles.png',
        title: 'Research + Stats',
        link: 'research',
      },
    ],
    items: [
      { title: 'Policy', link: 'policy' },
      { title: 'VoteForBikes', link: 'voteforbikes' },
      { title: 'Sustainability', link: 'topics/sustainable-transportation' },
      { title: 'Action Alerts', link: 'action-alerts' },
    ],
  },
  {
    key: 'participation',
    title: 'Participation',
    featuredItems: [
      {
        image: '3_RideSpot.png',
        title: 'RideSpot',
        link: 'https://www.ridespot.org/',
      },
      {
        image: '3_Call2Recycle.png',
        title: 'Hungry For Batteries',
        link: 'https://www.hungryforbatteries.org/',
      },
    ],
    items: [
      { title: 'Keep Riding', link: 'https://www.pfbkeepriding.org/' },
      { title: 'One Ride at a Time', link: 'https://oneride.peopleforbikes.org/' },
      { title: 'Action Alerts', link: 'action-alerts' },
    ],
  },
  {
    key: 'about',
    title: 'About',
    featuredItems: [
      {
        image: '1_TransformingAmerica.png',
        title: 'PeopleForBikes Team',
        link: 'team',
      },
      {
        image: '1_TransformingAmerica.png',
        title: 'Board + Subcommittees',
        link: 'board',
      },
    ],
    items: [
      { title: 'Mission, Vision, Values', link: 'mission' },
      { title: 'Join PeopleForBikes', link: 'members' },
      { title: 'Careers', link: 'careers' },
    ],
  },
  {
    key: 'donate',
    title: 'Donate',
    featuredItems: [],
    items: [
      { title: 'Donate Now', link: 'giving' },
      { title: 'Learn More About Supporting Our Work', link: 'take-action' },
    ],
  },
];

const IN_VIEW_OPTIONS: IntersectionOptions = {
  threshold: 0,
};
