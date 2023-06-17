import * as React from 'react';
import { useEffect } from 'react';
import cx from 'classnames';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { useInView } from 'react-intersection-observer';
import type { IntersectionOptions } from 'react-intersection-observer';

import { getHomepageV3 } from '~/lib/queries/homepage-v3';

import { Button } from '~/components/new/button';
import { Page } from '~/components/new/page';
import { ActionCard } from '~/components/new/card';
import { Carousel } from '~/components/new/carousel';
import { Slider } from '~/components/new/slider';

export default function NewHomePage({ page, preview }) {
  const hpData = page.homepage_v3;

  return (
    <Page title="Home" hasHero>
      <Hero data={hpData.hero} />
      <Vision />
      <Pillars />
      <News />
    </Page>
  );
}

const Hero = ({ data }) => {
  console.log(data);
  return (
    <div className="relative z-60 mt-[3rem] flex h-[calc(100vh-3rem)] items-center justify-center overflow-hidden bg-[#000000]">
      <video
        src="/new/PFB_HP_Hero.mp4"
        className="absolute inset-0 z-0 h-full w-full object-cover opacity-75"
        playsInline
        autoPlay
        muted
        loop
      />
      <div className="vignette absolute inset-0 z-10 h-full w-full" />

      {data.length > 0 && (
        <div className="absolute bottom-0 left-0 right-0 z-30 flex w-full justify-center p-16">
          <div className="relative mx-auto w-full max-w-screen-xl">
            <Carousel>
              {data.map((campaign) => (
                <div key={campaign.hero_title} className="flex w-full flex-col px-24">
                  <div className="font-dharma text-9xl font-bold leading-none text-white">
                    {campaign.hero_title}
                  </div>
                  <div className="text-shadow max-w-3xl text-xl text-white">
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
    <div className="relative flex h-panel items-center justify-center overflow-hidden bg-gray">
      <div className="absolute inset-0 h-full w-full bg-pure-black">
        <img
          src="/new/Stocksy_comp_watermarked_1310758.jpg"
          className="h-full w-full object-cover opacity-50"
          alt=""
          aria-hidden
        />
        <div className="vignette absolute inset-0 z-10 h-full w-full" />
      </div>
      <div className="relative z-20 -mt-8 flex flex-col items-center justify-center gap-4">
        <div className="max-w-5xl text-center font-dharma text-9xl font-bold text-white">
          {VISION_HEADLINE}
        </div>
        <div className="text-shadow mt-8 max-w-5xl text-center text-xl text-white">
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
      <div className="flex">
        <div className="relative z-10 w-1/4 flex-shrink-0 bg-darkest-blue px-16">
          <div className="sticky top-[9rem]  py-16 text-center">
            <h3 className="font-dharma text-5xl font-bold uppercase leading-none text-white">
              {PILLARS_HEADLINE}
            </h3>
            <div className="mt-4 text-center text-lightestGray">{PILLARS_BODY}</div>
            <div className="mt-8 flex flex-col items-center justify-center">
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
            <div className="mt-8 flex w-full items-center justify-center gap-1">
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
        <div className="relative z-0 flex w-3/4 flex-col">
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
    <div ref={ref} className={cx('relative min-h-panel p-16', alternate && 'bg-cardGray')}>
      <div className="font-dharma text-5xl font-bold uppercase leading-none text-gray">
        {pillar.title}
      </div>
      <div className="pb-16">
        <Slider className="py-8">
          {pillar.featuredItems.map((item: FeaturedItem, index: number) => (
            <div key={index} className="px-4">
              <ActionCard
                number={index + 1}
                total={pillar.featuredItems.length}
                title={item.title}
                description={item.description ?? ''}
                image={item.image}
              />
            </div>
          ))}
        </Slider>
      </div>
      <div className="relative flex flex-col gap-3 overflow-hidden">
        <div className="text-xl font-bold uppercase leading-none">Latest {pillar.title} news</div>
        <ul className="flex flex-col gap-1.5">
          {pillar.newsItems.map((item: NewsItem) => (
            <li key={item.title}>
              <span className="underline">{item.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const News = () => {
  return (
    <div className="flex h-panel snap-start items-center justify-center bg-lightestGray/50">
      <div className="mx-auto flex max-w-screen-lg flex-col gap-16">
        <div className="text-center text-4xl font-bold uppercase leading-none">News</div>
        <div className="grid grid-cols-4 gap-8">
          <NewsCard />
          <NewsCard />
          <NewsCard />
          <NewsCard />
        </div>
      </div>
    </div>
  );
};

const NewsCard = () => {
  return (
    <div className="group flex w-full flex-col bg-lightestGray shadow-md">
      <div className="aspect-video overflow-hidden">
        <img
          src="/new/Stocksy_comp_watermarked_2285491.jpg"
          className="block aspect-video w-full object-cover transition duration-700 group-hover:scale-105"
          alt=""
        />
      </div>
      <div className="flex flex-col p-8">
        <div className="text-sm font-bold text-darkest-blue">January 1, 1970</div>
        <div className="mt-2 text-lg">Transforming Old Tires Into Bike Lane Barriers</div>
        <div className="mt-8">
          <Button variant="white" label="Read" />
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

const VISION_BODY: string = `PeopleForBikes is making biking bettery for everyone by uniting millions of Americans, thousands of businesses, and hundreds of communities to make every bike ride safer, more accessible, and more fun. The PeopleForBikes Coalition has more than 325 supplier members and 1.4 million supporters in its grassroots network. When people ride bikes, great things happen.`;

const PILLARS_HEADLINE: string = `Our 3 pillars`;

const PILLARS_BODY: string = `PeopleForBikes works in three key areas to make the U.S. the best place to ride a bicycle in the world: Infrastructure, Policy, and Participation.`;

type Pillar = {
  key: PillarKey;
  image: string;
  title: string;
  description: string;
  featuredItems: Array<FeaturedItem>;
  newsItems: Array<NewsItem>;
};

type PillarKey = 'infrastructure' | 'policy' | 'participation';

type FeaturedItem = {
  image: string;
  title: string;
  description: string;
};

type NewsItem = {
  title: string;
  link: string;
};

const PILLARS: Array<Pillar> = [
  {
    key: 'infrastructure',
    image: '/new/crane.png',
    title: 'Infrastructure',
    description: 'Accelerate the construction of safe, fun, and connected places to ride.',
    featuredItems: [
      {
        image: '1_CityRatings.png',
        title: 'City Ratings',
        description: `Every year, PeopleForBikes rates more than 1,200 cities across the U.S. and internationally on the quality of their bike networks. On a scale of 0-100, we track cities’ scores and how their progress over time. Find out how your city scores today.`,
      },
      {
        image: '1_BNA.png',
        title: 'Bicycle Network Analysis',
        description: `The Bicycle Network Analysis (BNA) measures how easy it is to get around by bicycle in cities nationwide. It also includes a comprehensive inventory of U.S. bike infrastructure.`,
      },
      {
        image: '1_FinalMile.png',
        title: 'The Future of Mobility — Five Cities Paving the Way',
        description: `Three years ago, PeopleForBikes set out to accelerate the construction of safe and complete bicycle networks in five U.S. cities. The Final Mile, a partnership between Wend Collective and PeopleForBikes, achieved that goal.`,
      },
      {
        image: '1_TransformingAmerica.png',
        title: 'Transforming America',
        description: `PeopleForBikes is investing in communities across the country to create places for people of all ages and abilities to ride bikes. Join us in building 1,000 bike projects nationwide.`,
      },
    ],
    newsItems: [
      {
        title:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus dignissim faucibus.',
        link: '/news',
      },
      {
        title:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus dignissim faucibus.',
        link: '/news',
      },
      {
        title:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus dignissim faucibus.',
        link: '/news',
      },
    ],
  },
  {
    key: 'policy',
    image: '/new/court.png',
    title: 'Policy',
    description: 'Advance pro-bike and pro-bike-business legislation. ',
    featuredItems: [
      {
        image: '2_ElectricBicycles.png',
        title: 'Electric Bikes',
        description: `More than 12 million electric bicycles (e-bikes) are expected to be sold between 2020 and 2030. To address the changing landscape of e-bikes across the country, PeopleForBikes helps cities, states, and federal legislators plan for, incentivize, and regulate the three classes of electric bicycles.`,
      },
      {
        image: '2_FederalFunding.png',
        title: 'Federal Funding',
        description: `Billions of dollars of federal funding is set aside every year for state departments of transportation and city planners to fund local bicycle and pedestrian projects. Our team in Washington, D.C., lobbies for even more dollars for bicycling to build safe, fun, and connected bike networks across the U.S.`,
      },
      {
        image: '2_VoteForBikes.png',
        title: 'VoteForBikes',
        description: `PeopleForBikes tracks and advocates for local ballot measures across the country that benefit bicycling. From securing local funding to overturning bad bike bills to promoting park space and conservation efforts, VoteForBikes has secured billions of dollars for bikes over the last 10 years.`,
      },
      {
        image: '2_Sustainabililty.png',
        title: 'Sustainability',
        description: `Bicycles are being recognized as viable tools for policymakers to address sustainability goals. PeopleForBikes provides the necessary resources, incentives, and tools for leaders to position bikes as part of the solution to climate change.`,
      },
    ],
    newsItems: [
      {
        title:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus dignissim faucibus.',
        link: '/news',
      },
      {
        title:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus dignissim faucibus.',
        link: '/news',
      },
      {
        title:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus dignissim faucibus.',
        link: '/news',
      },
    ],
  },
  {
    key: 'participation',
    image: '/new/cyclist.png',
    title: 'Participation',
    description: 'Reduce barriers to access and welcome more people to the joys of bicycling.',
    featuredItems: [
      {
        image: '3_RideSpot.png',
        title: 'RideSpot',
        description: `Earn rewards just for riding your bike. Ride Spot is PeopleForBikes’ ride tracking and sharing platform to get more people biking more often. Join Challenges and discover joy on your bike today with Ride Spot.`,
      },
      {
        image: '3_Call2Recycle.png',
        title: 'Hungry For Batteries',
        description: `The bike industry came together as the first transportation industry to establish a united battery recycling solution to remove e-bike batteries from our waste streams. The new program, powered by Call2Recycle and endorsed by PeopleForBikes, has already recycled more than 36,000 pounds of batteries.`,
      },
      {
        image: '3_OneRide.png',
        title: 'One Ride At a Time',
        description: `If just 10% of the U.S. population replaced one car trip per day with a bike ride, carbon emissions from transportation would drop 10%. With nearly half of all car trips being less than three miles, that 10% goal is closer than we think. We’re challenging riders to get on their bikes for car replacement trips — one ride at a time. Join a Challenge today.`,
      },
      {
        image: '3_KeepRiding.png',
        title: 'Keep Riding',
        description: `Need even more reasons to stay pedaling? Find maintenance tips and tricks, inspiring Ride Spot rides, monthly Challenges, and more through our Keep Riding campaign. `,
      },
    ],
    newsItems: [
      {
        title:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus dignissim faucibus.',
        link: '/news',
      },
      {
        title:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus dignissim faucibus.',
        link: '/news',
      },
      {
        title:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus dignissim faucibus.',
        link: '/news',
      },
    ],
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
