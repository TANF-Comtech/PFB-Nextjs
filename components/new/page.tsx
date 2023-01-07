import * as React from 'react';
import { useEffect } from 'react';
import cx from 'classnames';
import Head from 'next/head';
import Script from 'next/script';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useInView } from 'react-intersection-observer';
import useScrollPosition from '@react-hook/window-scroll';

const searchOpenAtom = atom<boolean>(false);
const searchQueryAtom = atom<string>('');
const siteMapInViewAtom = atom<boolean>(false);

type PageProps = MetaProps & {
  showBanner?: boolean;
  showHeader?: boolean;
  showFooter?: boolean;
  children: React.ReactNode;
};

// @TODO the wrappers marked 'temporary' can be removed once the entire site has been upgraded

export const Page = ({
  showBanner = true,
  showHeader = true,
  showFooter = true,
  children,
  ...rest
}: PageProps) => {
  const showFixed: boolean = showBanner || showHeader;

  return (
    <>
      <Meta {...rest} />
      <div className="reset temporary">
        {showFixed && (
          <Fixed>
            {showBanner && <Banner />}
            {showHeader && <Header />}
          </Fixed>
        )}
        <div className="temporary absolute left-0 top-0 z-[1000] min-h-screen w-full bg-white">
          {children}
          {showFooter && <Footer />}
        </div>
      </div>
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
      {ldJSON && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: formatLinkedData(ldJSON) }}
        />
      )}
    </Head>
  );
};

type FixedProps = {
  children: React.ReactNode;
};

const Fixed = ({ children }: FixedProps) => {
  return <div className="fixed left-0 top-0 right-0 z-[1010] flex w-full flex-col">{children}</div>;
};

const Banner = () => {
  return (
    <div className="h-12 bg-darkest-blue px-4 text-white">
      <div className="mx-auto flex h-full max-w-screen-xl items-center justify-between text-sm font-bold uppercase leading-none">
        <div className="inline-flex items-center gap-2">
          <div>Explore our network </div>
          <i className="fa-solid fa-angle-down text-base text-yellow" />
        </div>
        <div className="inline-flex items-center gap-3">
          <div>Corporate member center</div>
          <span className="rounded-full bg-yellow px-2 py-0.5 text-black">enter</span>
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  const scrollY = useScrollPosition();
  const hasScrolled = scrollY >= 32;
  const isSiteMapInView = useAtomValue(siteMapInViewAtom);

  return (
    <div
      className={cx(
        hasScrolled
          ? 'bg-white text-black shadow-xl'
          : 'bg-transparent text-white hover:bg-white hover:text-black hover:shadow-xl',
        'group relative items-center px-4 transition duration-700',
        isSiteMapInView ? 'opacity-0' : 'opacity-100',
      )}
    >
      <div className="mx-auto flex h-24 max-w-screen-xl items-center justify-between">
        <Logo showWordMark={hasScrolled} />
        <Navigation />
        <Search />
      </div>
    </div>
  );
};

type LogoProps = React.ComponentPropsWithoutRef<'div'> & {
  invert?: boolean;
  showWordMark: boolean;
};

const Logo = ({ className = '', invert, showWordMark, ...rest }: LogoProps) => {
  return (
    <h1 className={cx('flex w-1/4 items-center gap-3', className)} {...rest}>
      <img src="/new/pfb-logomark.png" className="block h-12 w-auto" alt="People for Bikes" />
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
    </h1>
  );
};

const NAVIGATION: Array<any> = [
  {
    key: 'activism',
    title: 'Activism',
    links: [1, 2],
  },
  {
    key: 'work',
    title: 'Work',
    links: [1, 2],
  },
  {
    key: 'rides',
    title: 'Rides',
    links: [1, 2],
  },
  {
    key: 'about',
    title: 'About',
    links: [1, 2],
  },
  { key: 'donate', title: 'Donate', links: [1] },
];

const Navigation = () => {
  const isSearchOpen = useAtomValue(searchOpenAtom);
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);

  return (
    <nav className="relative flex w-1/2 justify-center">
      <ul className="flex justify-center gap-8 text-xl font-bold">
        {NAVIGATION.map((item: any) => (
          <li key={item.key}>
            <button className="relative inline-block whitespace-pre rounded-full px-3 py-2">
              <div className="absolute inset-0.5 rounded-full transition duration-300 hover:bg-gray/25" />
              {item.title}{' '}
              {item.links.length > 1 && <i className="fa-solid fa-angle-down text-lg" />}
              {item.key === 'donate' && (
                <span className="absolute top-0 right-0 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red">
                  <i className="fa-solid fa-heart text-[0.625rem] text-white" />
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
      {isSearchOpen && (
        <div className="absolute inset-0 z-10 flex h-8 w-full min-w-full flex-shrink-0 items-center justify-center rounded-full bg-lightestGray px-3">
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.currentTarget.value)}
            className="flex h-full w-full py-2 text-xl font-bold text-black focus:ring-0"
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
    <div className="flex w-1/4 items-center justify-end gap-2 text-3xl">
      <button
        onClick={() => setIsSearchOpen(!isSearchOpen)}
        className="inline-flex w-6 cursor-pointer justify-center"
      >
        <i className={cx('fa-solid', isSearchOpen ? 'fa-close' : 'fa-magnifying-glass')} />
      </button>
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
    <div className="flex min-h-[calc(100vh-3rem)] snap-start">
      <div className="w-1/3 bg-blue p-32 text-white">
        <div
          ref={ref}
          className="block text-center font-dharma text-8xl font-bold uppercase text-darkest-blue"
        >
          Site map
        </div>
        <ul className="mt-8 flex flex-col items-center justify-center gap-6 text-2xl font-bold capitalize">
          {NAVIGATION.map((item: any) => (
            <li key={item.key}>
              <button className="relative whitespace-pre">
                {item.title}{' '}
                {item.links.length > 1 && <i className="fa-solid fa-angle-down text-lg" />}
                {item.key === 'donate' && (
                  <span className="absolute top-0 right-0 inline-flex h-4 w-4 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-red">
                    <i className="fa-solid fa-heart text-[0.625rem] text-white" />
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
        <hr className="my-8 block h-px w-full bg-white/25" />
        <div className="flex flex-col items-center gap-3">
          <a className="hover:text-white">info@peopleforbikes.org</a>
          <a className="hover:text-white">(303) 449-4893</a>
        </div>
        <hr className="my-8 block h-px w-full bg-white/25" />
        <div className="flex flex-wrap justify-center gap-3">
          <div className="flex aspect-square h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-black">
            <i className="fa-brands fa-facebook-f text-2xl leading-none text-white" />
          </div>
          <div className="flex aspect-square h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-black">
            <i className="fa-brands fa-instagram text-2xl leading-none text-white" />
          </div>
          <div className="flex aspect-square h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-black">
            <i className="fa-brands fa-linkedin-in text-2xl leading-none text-white" />
          </div>
          <div className="flex aspect-square h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-black">
            <i className="fa-brands fa-twitter text-2xl leading-none text-white" />
          </div>
          <div className="flex aspect-square h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-black">
            <i className="fa-brands fa-youtube text-2xl leading-none text-white" />
          </div>
        </div>
      </div>
      <div className="w-2/3 bg-darkestGray p-32">
        <Logo showWordMark invert />
        <div className="mt-4 block font-dharma text-6xl font-medium text-white">
          Let’s stay in touch. Sign up for our newsletter!
        </div>
        <div className="mt-8 block">
          <div className="flex aspect-video max-w-3xl items-center justify-center bg-gray/25">
            <div className="text-xl font-bold text-white/25">ADD NEWSLETTER SIGNUP HERE</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const formatLinkedData = (value: unknown): string => {
  const formattedValue = JSON.stringify(value, null, 2);

  return formattedValue;
};
