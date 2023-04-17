import * as React from 'react';
import cx from 'classnames';

import { Button } from '~/components/new/button';
import { Page } from '~/components/new/page';
import { ActionCard } from '~/components/new/card';
import { Carousel } from '~/components/new/carousel';
import { Slider } from '~/components/new/slider';

const campaigns = [
  {
    title: 'RideSpot',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque ratione necessitatibus similique doloremque ex mollitia minus eveniet, non laboriosam nulla. Animi expedita sapiente nulla et.',
    ctaLabel: 'Download app',
    ctaLink: '',
  },
  {
    title: 'Call2Recycle',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque ratione necessitatibus similique doloremque ex mollitia minus eveniet, non laboriosam nulla. Animi expedita sapiente nulla et.',
    ctaLabel: 'Visit site',
    ctaLink: '',
  },
  {
    title: 'VoteForBikes',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque ratione necessitatibus similique doloremque ex mollitia minus eveniet, non laboriosam nulla. Animi expedita sapiente nulla et.',
    ctaLabel: 'Visit site',
    ctaLink: '',
  },
];

export default function NewHomePage() {
  return (
    <Page title="New homepage" hasHero>
      <Hero headline="Every rider. Every ride." campaigns={campaigns} />
      <Pillars />
      <Work />
      <News />
    </Page>
  );
}

type HeroProps = {
  headline: string;
  campaigns: Array<any>;
};

const Hero = ({ headline, campaigns = [] }: HeroProps) => {
  return (
    <div className="relative z-60 mt-[3rem] flex h-[calc(100vh-3rem)] items-center justify-center overflow-hidden bg-[#000000]">
      <video
        src="/new/PFB_Hero_v1.mp4"
        className="absolute inset-0 z-0 h-full w-full object-cover opacity-75"
        playsInline
        autoPlay
        muted
        loop
      />
      <div className="vignette absolute inset-0 z-10 h-full w-full" />
      {campaigns.length === 0 && (
        <div className="relative z-20 flex flex-col">
          <h2 className="font-dharma text-9xl font-bold leading-none text-white">{headline}</h2>
        </div>
      )}
      {campaigns.length > 0 && (
        <div className="absolute bottom-0 left-0 right-0 z-30 flex w-full justify-center p-16">
          <div className="relative mx-auto w-full max-w-screen-xl">
            <Carousel>
              {campaigns.map((campaign) => (
                <div key={campaign.title} className="flex w-full flex-col px-24">
                  <div className="font-dharma text-9xl font-bold leading-none text-white">
                    {campaign.title}
                  </div>
                  <div className="max-w-3xl text-xl text-white">{campaign.description}</div>
                  <div className="mt-4">
                    <Button label={campaign.ctaLabel} />
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

const Pillars = () => {
  return (
    <div>
      <div className="flex">
        <div className="relative z-10 w-1/4 flex-shrink-0 bg-darkest-blue px-16">
          <div className="sticky top-[9rem]  py-16 text-center">
            <h3 className="font-dharma text-5xl font-bold uppercase leading-none text-white">
              Our 3 pillars
            </h3>
            <div className="mt-4 text-center text-lightestGray">
              PeopleForBikes works in three key areas to make the U.S. the best place in the world
              to ride a bicycle.
            </div>
            <div className="mt-8 flex flex-col items-center justify-center">
              <div className="relative flex aspect-square h-24 w-24 rounded-full bg-blue">
                <img
                  src="/new/crane.svg"
                  className="absolute inset-0 -ml-6 -mt-16 inline-block h-64 w-64 object-cover"
                  alt=""
                />
              </div>
              <h4 className="mt-4 text-xl font-bold uppercase leading-none text-white">
                Infrastructure
              </h4>
              <div className="mt-1 max-w-xs text-center text-xs text-lightestGray">
                Accelerate the construction of safe, fun, and connected places to ride.
              </div>
            </div>
            <div className="mt-8 flex w-full items-center justify-center gap-1">
              <div className="flex aspect-square h-6 w-6 items-center justify-center rounded-full bg-blue"></div>
              <div className="flex aspect-square h-6 w-6 items-center justify-center rounded-full bg-white"></div>
              <div className="flex aspect-square h-6 w-6 items-center justify-center rounded-full bg-white"></div>
            </div>
          </div>
        </div>
        <div className="relative z-0 flex w-3/4 flex-col">
          <Pillar
            key="infrastructure"
            title="Infrastructure"
            featuredItems={[
              {
                title: 'City Ratings',
                image: '1_CityRatings.png',
              },
              {
                title: 'Bicycle Network Analysis',
                image: '1_BNA.png',
              },
              {
                title: 'Final Mile',
                image: '1_FinalMile.png',
              },
              {
                title: 'Transforming America',
                image: '1_TransformingAmerica.png',
              },
            ]}
            items={[
              {
                title:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus dignissim faucibus.',
              },
              {
                title:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus dignissim faucibus.',
              },
              {
                title:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus dignissim faucibus.',
              },
            ]}
          />
          <Pillar
            key="policy"
            title="Policy"
            featuredItems={[
              {
                title: 'Electric Bikes',
                image: '2_ElectricBicycles.png',
              },
              {
                title: 'Federal Funding',
                image: '2_FederalFunding.png',
              },
              {
                title: 'VoteForBikes',
                image: '2_VoteForBikes.png',
              },
              {
                title: 'Sustainability',
                image: '2_Sustainabililty.png',
              },
            ]}
            items={[
              {
                title:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus dignissim faucibus.',
              },
              {
                title:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus dignissim faucibus.',
              },
              {
                title:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus dignissim faucibus.',
              },
            ]}
            alternate={true}
          />
          <Pillar
            key="participation"
            title="Participation"
            featuredItems={[
              {
                title: 'RideSpot',
                image: '3_RideSpot.png',
              },
              {
                title: 'One Ride At a Time',
                image: '3_OneRide.png',
              },
              {
                title: 'Keep Riding',
                image: '3_KeepRiding.png',
              },
              {
                title: 'Call2Recycle Electric Battery Recycling',
                image: '3_Call2Recycle.png',
              },
            ]}
            items={[
              {
                title:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus dignissim faucibus.',
              },
              {
                title:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus dignissim faucibus.',
              },
              {
                title:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus dignissim faucibus.',
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

const Pillar = ({ title, featuredItems = [], items = [], alternate = false }) => {
  return (
    <div className={cx('relative p-16', alternate && 'bg-cardGray')}>
      <div className="font-dharma text-5xl font-bold uppercase leading-none text-gray">{title}</div>
      <div className="pb-16">
        <Slider className="py-8">
          {featuredItems.map((item, index) => (
            <div key={item.key} className="px-4">
              <ActionCard
                number={index + 1}
                total={featuredItems.length}
                title={item.title}
                image={item.image}
              />
            </div>
          ))}
        </Slider>
      </div>
      <div className="relative flex flex-col gap-3 overflow-hidden">
        <div className="text-xl font-bold uppercase leading-none">Latest {title} news</div>
        <ul className="flex flex-col gap-1.5">
          {items.map((item) => (
            <li key={item.title}>
              <span className="underline">{item.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Work = () => {
  return (
    <div className="relative flex h-[calc(100vh-9rem)] items-center justify-center overflow-hidden bg-pure-black">
      <img
        src="/new/Stocksy_comp_watermarked_1310758.jpg"
        className="absolute inset-0 h-full w-full object-cover opacity-50"
        alt=""
        aria-hidden
      />
      <div className="vignette absolute inset-0 z-10 h-full w-full" />
      <div className="relative z-20 -mt-8 flex max-w-screen-lg flex-col items-center justify-center gap-4">
        <div className="max-w-4xl text-center font-dharma text-8xl font-bold text-white">
          We’re making the U.S. the best place to ride a bike in the world.
        </div>
        <div className="max-w-3xl text-center text-lightestGray">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit tempora unde nulla,
          labore illum corrupti voluptatem! Voluptatum qui nulla, fugiat temporibus odio laboriosam
          vitae reiciendis sint, consequuntur, veniam nesciunt dolores!
        </div>
        <div>
          <Button label="View our work" />
        </div>
      </div>
    </div>
  );
};

const News = () => {
  return (
    <div className="flex h-[calc(100vh-9rem)] snap-start items-center justify-center bg-pure-white">
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
