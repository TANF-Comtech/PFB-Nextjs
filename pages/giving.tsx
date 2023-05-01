import * as React from 'react';

import { Page } from '~/components/new/page';
import { Button } from '~/components/new/button';
import { ActionCard } from '~/components/new/card';
import { Disclosure } from '~/components/new/disclosure';
import { Carousel } from '~/components/new/carousel';
import { Slider } from '~/components/new/slider';

export default function NewDonatePage() {
  return (
    <Page title="New donate page" hasHero>
      <Hero />
      <Giving />
      <Impact />
      <Support />
      <Quotes />
      <Methods />
      <Maximize />
    </Page>
  );
}

const HERO_HEADLINE = `Your Support of PeopleForBikes Matters`;

const Hero = () => {
  return (
    <div className="relative z-60 mt-[3rem] flex h-[calc(100vh-3rem)] items-center justify-center overflow-hidden bg-[#000000]">
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
    <>
      <div className="relative z-60 bg-darkest-blue p-24 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 text-3xl leading-normal">
          <div className="font-bold leading-normal">{GIVING_HEADLINE}</div>
          <div className="leading-normal">{GIVING_BODY}</div>
        </div>
      </div>
      <div className="relative z-60 flex justify-center gap-4 bg-blueAccent px-24 py-16 text-white">
        <Button variant="gold" label="Give today" />
        <span className="font-dharma text-5xl">Your support matters</span>
      </div>
    </>
  );
};

const IMPACTS = [
  {
    title: 'Youth',
    image: '1_Youth.png',
    description: `PeopleForBikes’ support of Outride and the Youth Cycling Coalition helps introduce more young riders to the joys of bicycling by expanding opportunity and access, especially in historically underserved communities.`,
  },
  {
    title: 'Policy',
    image: '2_Policy.png',
    description: `Our VoteForBikes initiative supports dozens of pro-bike ballot measures in communities nationwide every year, with hundreds of millions of dollars approved for new or renewed funding for local trails and street safety improvements, connecting communities by opening and improving more great places to ride.`,
  },
  {
    title: 'Participation',
    image: '3_Participation.png',
    description: `39 total states have adopted PeopleForBikes’ model, three-class electric bicycle definitions, which define e-bikes similarly to traditional bikes, and we’ve worked in a dozen cities and states to introduce e-bike purchase incentive programs. This work helps expand access for more Americans to afford and safely ride electric bicycles in their communities.`,
  },
  {
    title: 'Infrastructure',
    image: '4_Infrastructure.png',
    description: `Our Final Mile program, in partnership with the Wend Collective, accelerated the construction of complete mobility networks in five U.S. cities and built 300 miles of new bike infrastructure in record time, connecting communities and their residents like never before.`,
  },
  {
    title: 'RideSpot',
    image: '5_RideSpot.png',
    description: `Our national Ride Spot Challenges inspire folks across the U.S. to explore their communities by bike, with more than 300,000 rides recorded in 2022 alone.`,
  },
];

const Impact = () => {
  return (
    <div className="relative z-60 bg-white p-24">
      <div className="mx-auto max-w-6xl space-y-24">
        <div className="text-center font-dharma text-6xl">
          <span className="font-bold">Your Impact</span> at People for Bikes
        </div>
        <div className="relative mx-auto w-full max-w-6xl">
          <Slider className="py-8">
            {IMPACTS.map((item, index) => (
              <div key={item.title} className="px-4">
                <ActionCard
                  number={index + 1}
                  total={IMPACTS.length}
                  title={item.title}
                  description={item.description}
                  image={item.image}
                />
              </div>
            ))}
          </Slider>
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
    <div className="bg-darkest-blue p-24 text-white">
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

type Quote = {
  body: string;
  author: string;
  donorType: 'Corporate Donor' | 'Individual Donor';
};

const QUOTES: Array<Quote> = [
  {
    body: '“We instituted a simple program to help fund safe bike infrastructure by donating $1 for each helmet sold and matching that with a dollar-per-unit donation from each Trek retailer. It is a powerful multiplier.”',
    author: 'John Burke, President, Trek Bicycle',
    donorType: 'Corporate Donor',
  },
  {
    body: '“PeopleForBikes continues to demonstrate their important role in getting more people to realize the power of bicycling. The benefits impact health, the environment, and our communities”',
    author: 'Nick Hage, General Manager, Cannondale',
    donorType: 'Corporate Donor',
  },
  {
    body: '“PeopleForBikes is providing an incredible opportunity and incentive for getting out on our bikes. We never biked as much before we started joining the challenges! THANK YOU!!”',
    author: 'Bonnie B.',
    donorType: 'Individual Donor',
  },
  {
    body: '“Thank you for advocating for bike lanes and trails and making it safer to bike.”',
    author: 'Allyn H.',
    donorType: 'Individual Donor',
  },

  {
    body: '“Thanks for all the amazing work you do to MAKE LIFE GREAT!!!  All of our lives are better because of your hard work.”',
    author: 'Sam Reid, Co-Founder + Strategy Practice Leader, Ideas2Impact',
    donorType: 'Individual Donor',
  },
  {
    body: '“Thanks for all the up to date research on bicycling safety and infrastructure!”',
    author: 'Diane C.',
    donorType: 'Individual Donor',
  },
  {
    body: '“Less cars, more bikes!”',
    author: 'BikeFan',
    donorType: 'Individual Donor',
  },
];

const Quotes = () => {
  return (
    <div className="flex flex-col">
      <div className="relative mx-auto w-full max-w-6xl py-24">
        <Carousel className="my-24 w-full">
          {QUOTES.map((quote) => (
            <Quote key={quote.body} quote={quote} />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

type QuoteProps = {
  quote: Quote;
};

const Quote = ({ quote }: QuoteProps) => {
  return (
    <div className="aspect-video w-full p-24">
      <div className="flex h-full flex-col items-center justify-center gap-3">
        <div className="relative top-[5rem] font-dharma text-[20rem] leading-[0] text-blue">
          &ldquo;
        </div>
        <div className="text-center font-dharma text-6xl">{quote.body}</div>
        <div className="flex items-center gap-4 rounded-lg bg-blue px-4 py-2 text-white">
          <div className="text-lg font-bold">{quote.author}</div>
          <div className="text-lg font-bold uppercase text-yellow">{quote.donorType}</div>
        </div>
        <div className="relative -bottom-[8rem] font-dharma text-[20rem] leading-[0] text-blue">
          &rdquo;
        </div>
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
    <div className="bg-darkest-blue p-24 text-white">
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

const MAXIMIZERS = [
  {
    title: '1,000 Bike Projects Across America',
    image: '6_1000_Places.png',
    description: `We’re working to make biking safer by accelerating the construction of thousands of bike projects from coast to coast. Your support can help build protected bike lanes, off-street paths and trails, pump tracks, bike parks, and more right in your backyard. `,
  },
  {
    title: 'More Kids on Bikes',
    image: '7_Kids.png',
    description: `We believe biking should be accessible and fun for every kid across the U.S. By supporting our youth programming work, you’re helping grow the next generation of riders by getting more kids on bikes more often. `,
  },
  {
    title: 'Trails + Recreation',
    image: '8_Trails.png',
    description: `PeopleForBikes works to grow recreational riding opportunities nationwide. You can support our work preserving and expanding access for mountain biking, gravel riding, and long-distance trails to help more Americans experience the joys of biking in the great outdoors. `,
  },
  {
    title: 'Benefits for Biking',
    image: '9_Benefits.png',
    description: `We encourage cities, states, and the federal government to provide incentives for biking like tax credits, purchase rebates, and more. Your support helps us get these benefits in place to make biking more accessible in your community. `,
  },
];

const Maximize = () => {
  return (
    <div className="bg-white p-24">
      <div className="mx-auto flex flex-col items-center justify-center gap-24">
        <div className="text-center font-dharma text-8xl font-bold">Maximize Your Support</div>
        <div className="max-w-6xl text-center text-3xl">
          Giving to the PeopleForBikes Foundation is flexible — you can donate to one of our many
          programs, or choose to make a donation that best meets the Foundation’s area of greatest
          need. Here are some of the different areas you can support by giving to PeopleForBikes:
        </div>
        <div className="relative mx-auto w-full max-w-6xl">
          <Slider className="py-8">
            {MAXIMIZERS.map((item, index) => (
              <div key={item.title} className="px-4">
                <ActionCard
                  number={index + 1}
                  total={MAXIMIZERS.length}
                  title={item.title}
                  description={item.description}
                  image={item.image}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};
