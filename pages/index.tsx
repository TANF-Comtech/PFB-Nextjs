import * as React from 'react';
import { useEffect } from 'react';
import cx from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { useInView } from 'react-intersection-observer';
import type { IntersectionOptions } from 'react-intersection-observer';

import { getHomepageV3 } from '~/lib/queries/homepage-v3';
import { dateFormatter } from '~/utils/dateFormatter'
import { linkResolver } from '~/utils';

import { Button } from '~/components/new/button';
import { Page } from '~/components/new/page';
import { ExternalLink } from '~/components/new/external-link';
import { ActionCard } from '~/components/new/card';
import { Carousel } from '~/components/new/carousel';
import { Slider } from '~/components/new/slider';

const isProduction = process.env.NODE_ENV === 'production';

export default function NewHomePage({ page, preview }) {
  const hpData = page.homepage_v3;

  // Assign data into large pillars variable
  PILLARS[0].featuredItems = hpData.infrastructure_pillar
  PILLARS[0].newsItems = hpData.infrastructure_news
  PILLARS[1].featuredItems = hpData.policy_pillar
  PILLARS[1].newsItems = hpData.policy_news
  PILLARS[2].featuredItems = hpData.participation_pillar
  PILLARS[2].newsItems = hpData.participation_news

  return (
    <Page title="Home" hasHero>
      <Hero data={hpData.hero} />
      <Vision />
      <Pillars />
      <News data={hpData.news} />
    </Page>
  );
}

const Hero = ({ data }) => {

  return (
    <div className="relative z-60 mt-[3rem] flex h-[calc(100vh-3rem)] items-center justify-center overflow-hidden bg-[#000000]">
      <video
        src="/new/PFB_HP_Hero.mp4"
        className="absolute inset-0 z-0 h-full w-full object-cover opacity-75"
        playsInline
        autoPlay={isProduction}
        muted
        loop
      />
      <div className="vignette absolute inset-0 z-10 h-full w-full" />
      {data.length > 0 && (
        <div className="absolute bottom-0 left-0 right-0 z-30 flex w-full justify-center pb-8 sm:px-4 xl:p-16">
          <div className="relative mx-auto w-full max-w-screen-xl">
            <Carousel>
              {data.map((campaign) => (
                <div key={campaign.hero_title} className="flex w-full flex-col px-16 sm:px-24">
                  <div className="text-shadow font-dharma text-5xl font-bold leading-none text-white sm:text-7xl xl:text-9xl">
                    {campaign.hero_title}
                  </div>
                  <div className="text-shadow hidden max-w-3xl text-base text-white sm:text-lg lg:block xl:text-xl">
                    {campaign.hero_dek}
                  </div>
                  <div className="mt-4">
                    <Button
                      label="Visit Site"
                      to={
                        campaign.hero_link.__typename === '_ExternalLink' && campaign.hero_link.url
                      }
                    />
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      )}
    </div>
  );
};

const Vision = () => {
  return (
    <div className="relative flex h-panel items-center justify-center overflow-hidden bg-gray p-8 sm:p-12 xl:p-16">
      <div className="absolute inset-0 h-full w-full bg-pure-black">
        <Image
          src="/new/671472110_1600px.png"
          layout="fill"
          className="h-full w-full object-cover opacity-50"
          alt=""
          aria-hidden
        />
        <div className="vignette absolute inset-0 z-10 h-full w-full" />
      </div>
      <div className="relative z-20 flex flex-col items-center justify-center gap-4 xl:-mt-8">
        <div className="text-shadow max-w-5xl text-center font-dharma text-5xl font-bold text-white sm:text-7xl xl:text-9xl">
          {VISION_HEADLINE}
        </div>
        <div className="text-shadow mt-8 max-w-5xl text-center text-base text-white sm:text-lg xl:text-xl">
          {VISION_BODY}
        </div>
      </div>
    </div>
  );
};

const activePillarAtom = atom<PillarKey>('infrastructure');

const Pillars = () => {
  const activePillar = useAtomValue(activePillarAtom);

  const ACTIVE_PILLAR = PILLARS.find((pillar: Pillar) => pillar.key === activePillar) as Pillar;

  return (
    <div>
      <div className="xl:flex">
        <div className="relative z-10 flex-shrink-0 bg-darkest-blue px-4 sm:px-8 xl:w-1/4 xl:px-16">
          <div className="sticky top-[9rem] py-16 text-center">
            <h3 className="font-dharma text-5xl font-bold uppercase leading-none text-white">
              {PILLARS_HEADLINE}
            </h3>
            <div className="mt-4 text-center text-lightestGray">{PILLARS_BODY}</div>
            <div className="mt-8 hidden flex-col items-center justify-center xl:flex">
              <div className="relative flex aspect-square h-24 w-24 rounded-full bg-blue">
                <img
                  src={ACTIVE_PILLAR.image}
                  className="absolute inset-0 inline-block h-full w-full"
                  alt=""
                />
              </div>
              <h4 className="mt-4 text-xl font-bold uppercase leading-none text-white">
                {ACTIVE_PILLAR.title}
              </h4>
              <div className="mt-1 h-6 max-w-[16rem] text-center text-xs text-lightestGray">
                {ACTIVE_PILLAR.description}
              </div>
            </div>
            <div className="mt-8 hidden w-full items-center justify-center gap-1 xl:flex">
              <div
                className={cx(
                  'flex aspect-square h-6 w-6 items-center justify-center rounded-full',
                  activePillar === 'infrastructure' ? 'bg-blueAccent' : 'bg-white',
                )}
              />
              <div
                className={cx(
                  'flex aspect-square h-6 w-6 items-center justify-center rounded-full',
                  activePillar === 'policy' ? 'bg-blueAccent' : 'bg-white',
                )}
              />
              <div
                className={cx(
                  'flex aspect-square h-6 w-6 items-center justify-center rounded-full',
                  activePillar === 'participation' ? 'bg-blueAccent' : 'bg-white',
                )}
              />
            </div>
          </div>
        </div>
        <div className="relative z-0 flex flex-col xl:w-3/4">
          {PILLARS.map((pillar: Pillar, index: number) => (
            <Pillar key={pillar.key} pillar={pillar} alternate={index % 2 !== 0} />
          ))}
        </div>
      </div>
    </div>
  );
};

type PillarProps = {
  pillar: Pillar;
  alternate: boolean;
};

const Pillar = ({ pillar, alternate }: PillarProps) => {
  const { ref, inView } = useInView(IN_VIEW_OPTIONS);
  const setActivePillar = useSetAtom(activePillarAtom);

  useEffect(() => {
    if (inView) {
      setActivePillar(pillar.key);
    }
  }, [inView]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={ref}
      className={cx('relative p-8 sm:p-12 xl:min-h-panel xl:p-16', alternate && 'bg-cardGray')}
    >
      <div className="text-center font-dharma text-5xl font-bold uppercase leading-none text-gray xl:text-left">
        {pillar.title}
      </div>
      <div className="pb-16">
        <Slider className="py-8">
          {pillar.featuredItems.map((item, index) => (
            <div key={index} className="px-4">
              <>
                { pillar.key === 'infrastructure' &&
                  <a href={linkResolver(item.infrastructure_link)} target="_blank">
                    <ActionCard
                      number={index + 1}
                      total={pillar.featuredItems.length}
                      title={item.infrastructure_title}
                      description={item.infrastructure_dek ?? item.infrastructure_dek}
                      image={item.infrastructure_image.url}
                    />
                  </a>                           
                }
                { pillar.key === 'policy' &&
                  <a href={linkResolver(item.policy_link)}>
                    <ActionCard
                      number={index + 1}
                      total={pillar.featuredItems.length}
                      title={item.policy_title}
                      description={item.policy_dek ?? item.policy_dek}
                      image={item.policy_image.url}
                    />
                  </a>                           
                }
                { pillar.key === 'participation' &&
                  <a href={linkResolver(item.participation_link)}>
                    <ActionCard
                      number={index + 1}
                      total={pillar.featuredItems.length}
                      title={item.participation_title}
                      description={item.participation_dek ?? item.participation_dek}
                      image={item.participation_image.url}
                    />
                  </a>                           
                }
              </>
            </div>
          ))}
        </Slider>
      </div>
      <div className="relative flex flex-col gap-3 overflow-hidden">
        <div className="text-xl font-bold uppercase leading-none">Latest {pillar.title} news</div>
        <ul className="flex flex-col gap-1.5">
          <>
          { pillar.key === 'infrastructure' &&
            pillar.newsItems.map( function(item: InfrastructureNewsItem) {
              // Format the date
              const cleanDate = dateFormatter(item.infrastructure_news_item.publication_date !== null ? 
                item.infrastructure_news_item.publication_date : item.infrastructure_news_item._meta.lastPublicationDate )

              return(
                <li key={item.infrastructure_news_item._meta.id}>
                  <span className="underline">
                    <Link href={`/news/${item.infrastructure_news_item._meta.uid}`}>
                      <a>
                        {item.infrastructure_news_item.title[0].text}
                      </a>
                    </Link>
                  </span>
                  &nbsp;|&nbsp; 
                  <span>{ `${cleanDate.month} ${cleanDate.day}, ${cleanDate.year}` }</span>
                </li>                   
              )
            } 
          )}
          { pillar.key === 'policy' &&
            pillar.newsItems.map( function(item: PolicyNewsItem) {
              // Format the date
              const cleanDate = dateFormatter(item.policy_news_item.publication_date !== null ? 
                item.policy_news_item.publication_date : item.policy_news_item._meta.lastPublicationDate )

              return(
                <li key={item.policy_news_item._meta.id}>
                  <span className="underline">
                    <Link href={`/news/${item.policy_news_item._meta.uid}`}>
                      <a>
                        {item.policy_news_item.title[0].text}
                      </a>
                    </Link>
                  </span>
                  &nbsp;|&nbsp; 
                  <span>{ `${cleanDate.month} ${cleanDate.day}, ${cleanDate.year}` }</span>
                </li>                   
              )
            } 
          )}
          { pillar.key === 'participation' &&
            pillar.newsItems.map( function(item: ParticipationNewsItem) {
              // Format the date
              const cleanDate = dateFormatter(item.participation_news_item.publication_date !== null ? 
                item.participation_news_item.publication_date : item.participation_news_item._meta.lastPublicationDate )

              return(
                <li key={item.participation_news_item._meta.id}>
                  <span className="underline">
                    <Link href={`/news/${item.participation_news_item._meta.uid}`}>
                      <a>
                        {item.participation_news_item.title[0].text}
                      </a>
                    </Link>
                  </span>
                  &nbsp;|&nbsp; 
                  <span>{ `${cleanDate.month} ${cleanDate.day}, ${cleanDate.year}` }</span>
                </li>                   
              )
            } 
          )}                    
          </>
        </ul>
      </div>
    </div>
  );
};

const News = ({data}) => {
  return (
    <div className="flex items-center justify-center bg-lightestGray/50 p-8 sm:p-12 xl:h-panel xl:p-16">
      <div className="mx-auto flex max-w-screen-lg flex-col gap-16">
        <div className="text-center text-3xl font-bold uppercase leading-none sm:text-4xl">
          News
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {data.map( (item, i) => {
            // Date work
            const dateFormatted = dateFormatter(item.news_item.publication_date !== null ? 
              item.news_item.publication_date : item.news_item._meta.lastPublicationDate )
            return(
              <NewsCard
                imgSrc={ item.news_item.header_image.url }
                imgAlt={ item.news_item.header_image.alt }
                date={ `${dateFormatted.month} ${dateFormatted.day}, ${dateFormatted.year}` }
                title={ item.news_item.title[0].text }
                link={ `/news/${item.news_item._meta.uid}` }
              />
            )
          } )}
        </div>
      </div>
    </div>
  );
};

const NewsCard = ({ imgSrc, imgAlt, date, title, link }) => {
  return (
    <div className="group flex w-full flex-col bg-lightestGray shadow-md">
      <div className="aspect-video overflow-hidden">
        <img
          src={imgSrc}
          className="block aspect-video w-full object-cover transition duration-700 group-hover:scale-105"
          alt={imgAlt !== null ? imgAlt : 'Biking oriented picture'}
        />
      </div>
      <div className="flex flex-col p-8">
        <div className="text-sm font-bold text-darkest-blue">{date}</div>
        <div className="mt-2 text-lg">{title}</div>
        <div className="mt-8">
          <Button to={link} variant="white" label="Read" />
        </div>
      </div>
    </div>
  );
};

type Campaign = {
  title: string;
  description: string;
  ctaLabel: string;
  ctaLink: string;
};

const VISION_HEADLINE: string = `Making the U.S. the Best Place to Ride a Bike`;

const VISION_BODY: string = `PeopleForBikes is making biking better for everyone by uniting millions of Americans, thousands of businesses, and hundreds of communities to make every bike ride safer, more accessible, and more fun. The PeopleForBikes Coalition has more than 325 supplier members and 1.4 million supporters in its grassroots network. When people ride bikes, great things happen.`;

const PILLARS_HEADLINE: string = `Our 3 pillars`;

const PILLARS_BODY: string = `PeopleForBikes works in three key areas to make the U.S. the best place to ride a bicycle in the world: Infrastructure, Policy, and Participation.`;

type Pillar = {
  key: PillarKey;
  image: string;
  title: string;
  description: string;
  featuredItems: Array<FeaturedItemInfrastructure> | Array<FeaturedItemPolicy> | Array<FeaturedItemParticipation>;
  newsItems: [];
};

type PillarKey = 'infrastructure' | 'policy' | 'participation';

type FeaturedItemInfrastructure = {
  infrastructure_image: object;
  infrastructure_title: string;
  infrastructure_dek: string;
  infrastructure_link: object;
};

type FeaturedItemPolicy = {
  policy_image: object;
  policy_title: string;
  policy_dek: string;
  policy_link: object;
};


type FeaturedItemParticipation = {
  participation_image: object;
  participation_title: string;
  participation_dek: string;
  participation_link: object;
};

interface Title {
  text: string;
  type: string;
  spans: []
}

interface MetaObject {
  id: string,
  lastPublicationDate: string;
  type: string;
  uid: string;
}

interface InfrastructureNewsItem {
  infrastructure_news_item: {
    publication_date: string | null;
    __typename: string;
    _meta: MetaObject;
    title: Title[];
  };
}

interface PolicyNewsItem {
  policy_news_item: {
    publication_date: string | null;
    __typename: string;
    _meta: MetaObject;
    title: Title[];
  };
}

interface ParticipationNewsItem {
  participation_news_item: {
    publication_date: string | null;
    __typename: string;
    _meta: MetaObject;
    title: Title[];
  };
}


const PILLARS: Array<Pillar> = [
  {
    key: 'infrastructure',
    image: '/new/crane.png',
    title: 'Infrastructure',
    description: 'Accelerate the construction of safe, fun, and connected places to ride.',
    featuredItems: [],
    newsItems: [],
  },
  {
    key: 'policy',
    image: '/new/court.png',
    title: 'Policy',
    description: 'Advance pro-bike and pro-bike-business legislation. ',
    featuredItems: [],
    newsItems: [],
  },
  {
    key: 'participation',
    image: '/new/cyclist.png',
    title: 'Participation',
    description: 'Reduce barriers to access and welcome more people to the joys of bicycling.',
    featuredItems: [],
    newsItems: [],
  },
];

const IN_VIEW_OPTIONS: IntersectionOptions = {
  threshold: 0.25,
};

export async function getStaticProps({ params, preview = false, previewData }) {
  const pageData = await getHomepageV3();

  if (!pageData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      preview,
      page: pageData ?? null,
    },
    revalidate: 60,
  };
}
