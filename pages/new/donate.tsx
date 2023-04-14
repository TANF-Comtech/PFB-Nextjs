import * as React from 'react';
import cx from 'classnames';

import { Page } from '~/components/new/page';
import { ActionCard } from '~/components/new/card';
import { Disclosure } from '~/components/new/disclosure';

export default function NewDonatePage() {
  return (
    <Page title="New donate page">
      <Hero />
      <Giving />
      <Impact />
      <Support />
      <Quotes />
      <Methods />
    </Page>
  );
}

const HERO_HEADLINE = `Your Support of PeopleForBikes Matters`;

const Hero = () => {
  return (
    <div className="relative mt-[3rem] flex h-[calc(100vh-3rem)] items-center justify-center overflow-hidden bg-[#000000]">
      <img
        src="/new/0_Giving_Hero.jpg"
        className="absolute inset-0 h-full w-full object-cover opacity-50"
        alt=""
        aria-hidden
      />
      <div className="relative z-10 font-dharma text-8xl font-bold text-pure-white">
        {HERO_HEADLINE}
      </div>
    </div>
  );
};

const GIVING_HEADLINE = `At PeopleForBikes, we know that bikes make life great. Our goal is to make the U.S. the best place in the world to ride a bike. With your help, we can make that vision a reality.`;

const GIVING_BODY = `Since 1999, thanks to your support, PeopleForBikes has worked in hundreds of communities nationwide to get more people on bikes more often and make biking better for everyone. Our more than 1.4 million supporters from across the U.S. help us secure billions in federal funding for more and better bike infrastructure and key programs like City Ratings and the Final Mile help build better bike networks right in your backyard. Since 1999, through our industry community grants program, we’ve donated more than $3.6 million and leveraged $775 million in funding for local bike projects, advocacy organizations, and education programs.`;

const Giving = () => {
  return (
    <div className="block bg-darkest-blue p-24 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 text-3xl leading-normal">
        <div className="font-bold leading-normal">{GIVING_HEADLINE}</div>
        <div className="leading-normal">{GIVING_BODY}</div>
      </div>
    </div>
  );
};

const IMPACTS = [
  {
    title: 'Youth',
    image: '1_Youth.png',
  },
  {
    title: 'Policy',
    image: '2_Policy.png',
  },
  {
    title: 'Participation',
    image: '3_Participation.png',
  },
  {
    title: 'Infrastructure',
    image: '4_Infrastructure.png',
  },
  {
    title: 'RideSpot',
    image: '5_RideSpot.png',
  },
];

const Impact = () => {
  return (
    <div className="block p-24">
      <div className="mx-auto flex flex-col items-center justify-center gap-24">
        <div className="text-center font-dharma text-6xl">
          <span className="font-bold">Your Impact</span> at People for Bikes
        </div>
        <div className="flex gap-8">
          {IMPACTS.map((item, index) => (
            <ActionCard
              key={item.title}
              number={index + 1}
              total={IMPACTS.length}
              title={item.title}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const SUPPORT = [
  {
    label: 'Employee Purchase Program',
    contents: (
      <div className="flex flex-col gap-6">
        <div>
          Are you a PeopleForBikes Coalition Member who offers industry pro deals to employees? List
          PeopleForBikes as a mandatory or optional donation recipient in employee purchase portals
          in order to receive pro-level pricing.
        </div>
        <div>Current Participating Companies</div>
        <ul className="list-disc pl-4">
          <li className="list-item">Trek Bikes</li>
          <li className="list-item">Quality Bicycle Products</li>
          <li className="list-item">Cannondale (CSG)</li>
        </ul>
      </div>
    ),
  },
  {
    label: 'We’reForBikes Program',
    contents: (
      <div className="flex flex-col gap-6">
        <div>
          Offer consumers who purchase directly from your company the opportunity to make a direct
          contribution to PeopleForBikes during the checkout process on your web store. Other ways
          to support are identifying products to contribute a dollar amount per item sold (eg. $1
          per helmet, $20 per bike) that supports PeopleForBikes.
        </div>
        <div>Current Participating Companies</div>
        <ul className="list-disc pl-4">
          <li className="list-item">Trek Bikes</li>
          <li className="list-item">Cannondale (CSG)</li>
          <li className="list-item">American Classic</li>
          <li className="list-item">Best Payment Solutions</li>
          <li className="list-item">BikeInsure</li>
          <li className="list-item">Epic Rides</li>
          <li className="list-item">NUUN Hydration</li>
        </ul>
      </div>
    ),
  },
  {
    label: 'General Funds',
    contents: (
      <div className="flex flex-col gap-6">
        <div>
          PeopleForBikes Coalition members can donate above and beyond their membership dues to
          support specific programs such as youth ridership, infrastructure campaigns, data
          resources, and more.
        </div>
        <div>
          Non-endemic corporate partners interested in micromobility, climate action, employee
          wellness, and other programs that bikes can benefit should reach out to our membership
          development team to learn more about funding opportunities. Please contact Rod Judd
          (rod@peopleforbikes.org) or Kerri Salazar (kerri@peopleforbikes.org).
        </div>
        <div>Current Participating Companies</div>
        <ul className="list-disc pl-4">
          <li className="list-item">Quality Bicycle Products</li>
          <li className="list-item">REI Co-op</li>
          <li className="list-item">Specialized Bicycle Components</li>
          <li className="list-item">Walton Family Foundation</li>
        </ul>
      </div>
    ),
  },
];

const Support = () => {
  return (
    <div className="block bg-darkest-blue p-24 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <div className="font-dharma text-6xl font-bold">Above + Beyond Corporate Support</div>
        <div className="text-3xl leading-normal">
          PeopleForBikes works with more than 325 bike industry companies to help advance our work
          across our three key pillars:{' '}
          <span className="font-bold">infrastructure, policy, and participation</span>. Endemic and
          non-endemic corporate partners can support our work in the following ways.
        </div>
        <div className="mt-4 flex flex-col gap-8 divide-lightGray">
          {SUPPORT.map(({ label, contents }, index) => (
            <Disclosure key={index} label={label} contents={contents} />
          ))}
        </div>
        <div className="text-xl font-bold leading-normal">
          Learn more about these programs and get involved by contacting Rod Judd
          (rod@peopleforbikes.org) or Kerri Salazar (kerri@peopleforbikes.org).
        </div>
      </div>
    </div>
  );
};

const QUOTES = [
  {
    body: '“We instituted a simple program to help fund safe bike infrastructure by donating $1 for each helmet sold and matching that with a dollar-per-unit donation from each Trek retailer. It is a powerful multiplier.”',
    author: 'John Burke, President, Trek Bicycle',
    donorType: 'Corporate Donor',
  },
];

const Quotes = () => {
  return (
    <div className="flex flex-col p-24">
      <div className="mx-auto max-w-4xl">
        {QUOTES.map((quote) => (
          <Quote key={quote.body} quote={quote} />
        ))}
      </div>
    </div>
  );
};

const Quote = ({ quote }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="relative top-[5rem] font-dharma text-[20rem] leading-[0] text-blue">
        &ldquo;
      </div>
      <div className="font-dharma text-6xl">{quote.body}</div>
      <div className="flex items-center gap-4 rounded-lg bg-blue px-4 py-2 text-white">
        <div className="text-lg font-bold">{quote.author}</div>
        <div className="text-lg font-bold uppercase text-yellow">{quote.donorType}</div>
      </div>
      <div className="relative -bottom-[8rem] font-dharma text-[20rem] leading-[0] text-blue">
        &rdquo;
      </div>
    </div>
  );
};

const METHODS = [
  {
    label: 'Online (credit card, ACH, Venmo, PayPal)',
    contents: <div>EXAMPLE</div>,
  },
  {
    label: 'By Mail',
    contents: <div>EXAMPLE</div>,
  },
  {
    label: 'Stock Transfer ',
    contents: <div>EXAMPLE</div>,
  },
  {
    label: 'Employer Matching Gifts ',
    contents: <div>EXAMPLE</div>,
  },
  {
    label: 'Donor-Advised Fund',
    contents: <div>EXAMPLE</div>,
  },
  {
    label: 'PeopleForBikes Financials',
    contents: <div>EXAMPLE</div>,
  },
];

const Methods = () => {
  return (
    <div className="block bg-darkest-blue p-24 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <div className="font-dharma text-6xl font-bold">Ways to Give</div>
        <div className="text-3xl leading-normal">PeopleForBikes makes it easy to give.</div>
        <div className="mt-4 flex flex-col gap-8 divide-lightGray">
          {METHODS.map(({ label, contents }, index) => (
            <Disclosure key={index} label={label} contents={contents} />
          ))}
        </div>
      </div>
    </div>
  );
};
