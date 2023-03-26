import * as React from 'react';
import cx from 'classnames';

import { Button } from '~/components/new/button';
import { Page } from '~/components/new/page';

const campaigns = [
  {
    title: 'RideSpot',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque ratione necessitatibus similique doloremque ex mollitia minus eveniet, non laboriosam nulla. Animi expedita sapiente nulla et.',
    ctaLabel: 'Visit app',
    ctaLink: '',
  },
];

export default function NewHomePage() {
  return (
    <Page title="New homepage">
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
        <div className="absolute left-0 bottom-0 right-0 z-30 flex w-full justify-center p-16">
          <div className="relative mx-auto w-full max-w-screen-xl">
            <div>
              {campaigns.map((campaign) => (
                <div key={campaign.title} className="flex w-full flex-col">
                  <div className="font-dharma text-9xl font-bold leading-none text-white">
                    {campaign.title}
                  </div>
                  <div className="max-w-3xl text-xl text-white">{campaign.description}</div>
                  <div className="mt-4">
                    <Button label={campaign.ctaLabel} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Pillars = () => {
  return (
    <div className="block">
      <div className="flex">
        <div className="relative z-10 block w-1/4 flex-shrink-0 bg-darkest-blue px-16">
          <div className="sticky top-[9rem] block py-16 text-center">
            <h3 className="block font-dharma text-5xl font-bold uppercase leading-none text-white">
              Our 3 pillars
            </h3>
            <div className="mt-4 block text-center text-lightestGray">
              PeopleForBikes works in three key areas to make the U.S. the best place in the world
              to ride a bicycle.
            </div>
            <div className="mt-8 flex flex-col items-center justify-center">
              <div className="flex aspect-square h-24 w-24 rounded-full bg-blue"></div>
              <h4 className="mt-4 block text-xl font-bold uppercase leading-none text-white">
                Infrastructure
              </h4>
              <div className="mt-1 block max-w-xs text-center text-xs text-lightestGray">
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
                image: 'PFB_0006_City_Ratings.png',
              },
              {
                title: 'Community Grants',
                image: 'PFB_0005_Community_Grants.png',
              },
              {
                title: 'City Ratings',
                image: 'PFB_0006_City_Ratings.png',
              },
              {
                title: 'Community Grants',
                image: 'PFB_0005_Community_Grants.png',
              },
            ]}
            items={[
              {
                title: 'Lorem ipsum dolor sit amet',
              },
              {
                title: 'Consectetur adipiscing elit',
              },
              {
                title: 'Sed do eiusmod tempor incididun',
              },
            ]}
          />
          <Pillar
            key="policy"
            title="Policy"
            featuredItems={[
              {
                title: 'Policy',
                image: 'PFB_0004_Policy.png',
              },
              {
                title: 'Research',
                image: 'PFB_0003_Research.png',
              },
              {
                title: 'Policy',
                image: 'PFB_0004_Policy.png',
              },
              {
                title: 'Research',
                image: 'PFB_0003_Research.png',
              },
            ]}
            items={[
              {
                title: 'Lorem ipsum dolor sit amet',
              },
              {
                title: 'Consectetur adipiscing elit',
              },
              {
                title: 'Sed do eiusmod tempor incididun',
              },
            ]}
            alternate={true}
          />
          <Pillar
            key="participation"
            title="Participation"
            featuredItems={[
              {
                title: 'Ride Spot',
                image: 'PFB_0002_Ride_Spot.png',
              },
              {
                title: 'Battery Recycling',
                image: 'PFB_0001_Battery_Recycling.png',
              },
              {
                title: 'Ride Spot',
                image: 'PFB_0002_Ride_Spot.png',
              },
              {
                title: 'Battery Recycling',
                image: 'PFB_0001_Battery_Recycling.png',
              },
            ]}
            items={[
              {
                title: 'Lorem ipsum dolor sit amet',
              },
              {
                title: 'Consectetur adipiscing elit',
              },
              {
                title: 'Sed do eiusmod tempor incididun',
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
    <div className={cx('relative block p-16', alternate && 'bg-cardGray')}>
      <div className="block font-dharma text-5xl font-bold uppercase leading-none text-gray">
        {title}
      </div>
      <PillarGrid>
        {featuredItems.map((item, index) => (
          <PillarCard
            key={item.key}
            number={index + 1}
            total={featuredItems.length}
            title={item.title}
            image={item.image}
          />
        ))}
      </PillarGrid>
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

type PillarGridProps = {
  children: Array<React.ReactNode>;
};

const PillarGrid = ({ children }: PillarGridProps) => {
  return (
    <div className="relative flex w-full items-center">
      <ul className="relative z-0 flex w-full items-center gap-8 py-8">{children}</ul>
    </div>
  );
};

const PillarCard = ({ number, total, title, image }) => {
  return (
    <li className="group snap-center">
      <div className="relative flex aspect-[3/4] w-[20rem] items-center justify-center overflow-hidden">
        <img
          src={`/new/${image}`}
          className="absolute inset-0 z-0 block h-full w-full object-cover transition duration-700 group-hover:scale-105"
          alt=""
        />
        <div className="absolute inset-0 z-10 flex h-[200%] w-full translate-y-0 bg-gradient-to-b from-transparent via-pure-black/50 to-pure-black/100 transition duration-700 group-hover:-translate-y-1/2" />
        <div className="relative z-20 flex h-full flex-col gap-4 p-8 text-white">
          <div className="font-bold">
            {number}/{total}
          </div>
          <h4 className="font-dharma text-5xl font-bold leading-none">{title}</h4>
          <div className="opacity-0 transition duration-700 group-hover:opacity-100">
            <div className="block text-sm">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea, nesciunt eum quidem
              ullam facilis nobis asperiores laborum, enim accusantium officia similique doloribus.
            </div>
          </div>
        </div>
      </div>
    </li>
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
      <div className="block aspect-video overflow-hidden">
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
