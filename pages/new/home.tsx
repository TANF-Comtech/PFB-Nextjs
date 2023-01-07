import * as React from 'react';
import { useCallback } from 'react';
import cx from 'classnames';

import { Button } from '~/components/new/button';
import { Page } from '~/components/new/page';

export default function NewHomePage() {
  return (
    <Page title="New homepage">
      <Hero headline="Every rider. Every ride." cta="Learn about our mission" />
      <Pillars />
      <Work />
      <News />
    </Page>
  );
}

type HeroProps = {
  headline: string;
  cta: string;
};

const Hero = ({ headline, cta }: HeroProps) => {
  return (
    <div className="relative mt-[3rem] flex h-[calc(100vh-3rem)] items-center justify-center bg-[#000000]">
      <video
        src="/new/PFB_Hero_v1.mp4"
        className="absolute inset-0 z-0 h-full w-full object-cover opacity-75"
        playsInline
        autoPlay
        muted
        loop
      />
      <div className="vignette absolute inset-0 z-10 h-full w-full" />
      <div className="relative z-20 flex flex-col">
        <h2 className="font-dharma text-[14rem] font-bold uppercase leading-none text-white/50">
          {headline}
        </h2>
        <div className="flex justify-center">
          <Button label={cta} />
        </div>
      </div>
    </div>
  );
};

const Pillars = () => {
  return (
    <div className="block">
      <div className="flex">
        <div className="relative z-10 block w-1/3 flex-shrink-0 bg-darkest-blue px-24">
          <div className="sticky top-[9rem] block py-32 text-center ">
            <h3 className="mt-4 block font-dharma text-8xl font-bold uppercase leading-none text-white">
              Our 3 pillars
            </h3>
            <div className="mt-4 block text-center text-white/80">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic delectus velit, quisquam
              provident quae minima maxime debitis molestias impedit magnam.
            </div>
            <div className="mt-8 flex w-full items-center justify-center gap-4">
              <div className="flex aspect-square h-16 w-16 items-center justify-center rounded-full bg-blue">
                <i className="fa-solid fa-map text-2xl leading-none text-white" />
              </div>
              <div className="flex aspect-square h-16 w-16 items-center justify-center rounded-full bg-blue">
                <i className="fa-solid fa-clipboard text-2xl leading-none text-white" />
              </div>
              <div className="flex aspect-square h-16 w-16 items-center justify-center rounded-full bg-blue">
                <i className="fa-solid fa-people-group text-2xl leading-none text-white" />
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-0 flex w-2/3 flex-col gap-64 px-32 py-64">
          <Pillar
            key="infrastructure"
            icon="fa-solid fa-map"
            title="Infrastructure"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic delectus velit, quisquam provident quae minima maxime debitis molestias impedit magnam accusamus! Quam, illum illo. Nemo aut officiis eligendi aspernatur omnis."
            featuredItems={[
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
              {
                title: 'Ut labore et dolore magna aliqua',
              },
            ]}
          />
          <Pillar
            key="policy"
            icon="fa-solid fa-clipboard"
            title="Policy"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic delectus velit, quisquam provident quae minima maxime debitis molestias impedit magnam accusamus! Quam, illum illo. Nemo aut officiis eligendi aspernatur omnis."
            featuredItems={[
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
              {
                title: 'Ut labore et dolore magna aliqua',
              },
            ]}
          />
          <Pillar
            key="participation"
            icon="fa-solid fa-people-group"
            title="Participation"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic delectus velit, quisquam provident quae minima maxime debitis molestias impedit magnam accusamus! Quam, illum illo. Nemo aut officiis eligendi aspernatur omnis."
            featuredItems={[
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
              {
                title: 'Ut labore et dolore magna aliqua',
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

const Pillar = ({ icon, title, description, featuredItems = [], items = [] }) => {
  return (
    <div className="relative block">
      <div className="absolute top-0 left-0 right-0 flex w-full -translate-y-24 justify-center">
        <i className={cx(icon, 'text-[14rem] text-blue/10')} />
      </div>
      <div className="block text-center text-7xl font-bold leading-none tracking-tight text-black">
        {title}
      </div>
      <div className="mx-auto mt-4 block max-w-prose text-center text-lg leading-normal text-black/80">
        {description}
      </div>
      <PillarGrid>
        {featuredItems.map((item) => (
          <PillarCard key={item.key} title={item.title} image={item.image} />
        ))}
      </PillarGrid>
      <div className="relative mx-auto flex h-[24rem] w-[52rem] flex-col items-center justify-center gap-6 overflow-hidden rounded-3xl bg-gray/25">
        <div className="font-dharma text-6xl font-bold uppercase leading-none">More</div>
        <ul className="flex flex-col gap-3">
          {items.map((item) => (
            <li key={item.title} className="group inline-flex items-center gap-3">
              <i className="fa-solid fa-angle-right text-sm" />
              <span className="group-hover:underline">{item.title}</span>
            </li>
          ))}
        </ul>
        <Button label="View all" />
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
      <ul className="relative z-0 flex w-full flex-wrap items-center justify-center gap-16 py-16">
        {children}
      </ul>
    </div>
  );
};

const PillarCard = ({ title, image }) => {
  return (
    <li className="group snap-center">
      <div className="relative flex aspect-square w-[24rem] items-center justify-center overflow-hidden rounded-3xl">
        <img
          src={`/new/${image}`}
          className="absolute inset-0 z-0 block h-full w-full object-cover transition duration-700 group-hover:scale-105"
          alt=""
        />
        <div className="absolute inset-0 z-10 flex h-[200%] w-full translate-y-0 bg-gradient-to-b from-transparent via-pure-black/50 to-pure-black/100 transition duration-700 group-hover:-translate-y-1/2" />
        <div className="relative z-10 flex flex-col justify-center transition duration-700 group-hover:opacity-0">
          <h4 className="font-dharma text-6xl font-bold uppercase leading-none text-white">
            {title}
          </h4>
        </div>
        <div className="absolute inset-0 z-20 flex h-full flex-col items-center justify-center gap-4 p-8 text-white opacity-0 transition duration-700 group-hover:opacity-100">
          <h4 className="font-dharma text-6xl font-bold uppercase leading-none" aria-hidden>
            {title}
          </h4>
          <div className="block text-center text-sm">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea, nesciunt eum quidem ullam
            facilis nobis asperiores laborum, enim accusantium officia similique doloribus.
          </div>
          <div className="mt-4 block">
            <div className="flex aspect-square w-16 items-center justify-center rounded-full bg-white text-2xl font-bold uppercase text-black">
              Go
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

const Work = () => {
  return (
    <div className="relative flex h-[calc(100vh-9rem)] items-center justify-center bg-pure-black">
      <img
        src="/new/Stocksy_comp_watermarked_1310758.jpg"
        className="absolute inset-0 h-full w-full object-cover opacity-50"
        alt=""
        aria-hidden
      />
      <div className="vignette absolute inset-0 z-10 h-full w-full" />
      <div className="relative z-20 -mt-8 flex max-w-screen-lg flex-col items-center justify-center gap-4">
        <div className="text-center font-dharma text-9xl font-bold text-white">
          We’re making the U.S. the best place to ride a bike in the world.
        </div>
        {/* <div className="text-center text-white/80">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea, nesciunt eum quidem ullam
          facilis nobis asperiores laborum, enim accusantium officia similique doloribus.
        </div> */}
        <div>
          <Button label="View our campaigns" />
        </div>
      </div>
    </div>
  );
};

const News = () => {
  return (
    <div className="topography flex h-[calc(100vh-9rem)] snap-start items-center justify-center bg-pure-white">
      <div className="mx-auto flex max-w-screen-lg flex-col gap-8">
        <div className="block text-center font-dharma text-[7rem] font-bold uppercase leading-none">
          News
        </div>
        <div className="grid grid-cols-3 gap-8">
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
    <div className="group flex w-full flex-col bg-pure-white shadow-md">
      <div className="block aspect-video overflow-hidden">
        <img
          src="/new/Stocksy_comp_watermarked_2285491.jpg"
          className="block aspect-video w-full object-cover transition duration-700 group-hover:scale-105"
          alt=""
        />
      </div>
      <div className="flex flex-col gap-4 p-8">
        <div className="block text-center text-sm font-bold uppercase text-darkest-blue">
          January 1, 1970
        </div>
        <div className="-mt-2 text-center text-2xl">
          Transforming Old Tires Into Bike Lane Barriers
        </div>
        <div className="flex justify-center">
          <Button label="Read" />
        </div>
      </div>
    </div>
  );
};
