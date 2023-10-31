import React from 'react';
import Image from 'next/legacy/image';

import { Page } from '~/components/new/page';
import { Button } from '~/components/new/button';
import { ActionCard } from '~/components/new/card';
import { Carousel } from '~/components/new/carousel';
import { Disclosure } from '~/components/new/disclosure';
import { ExternalLink } from '~/components/new/external-link';
import { Slider } from '~/components/new/slider';
import { ClientOnly } from '~/components/new/client-only';

export default function DonatePage() {
  return (
    <Page title="Donate" hasHero showDonate={false}>
      <Hero />
      <Giving />
      <Banner />
      <Impact />
      <Support />
      <Quotes />
      <Methods />
      <Maximize />
      <Banner />
    </Page>
  );
}

const Hero = () => {
  return (
    <div className="l:p-16 relative z-60 mt-[3rem] flex h-[calc(100vh-3rem)] items-center justify-center overflow-hidden bg-[#000000] p-8 sm:p-12">
      <ClientOnly>
        <RandomImage />
      </ClientOnly>
      <div className="relative z-10 max-w-5xl text-center font-dharma text-5xl font-bold text-pure-white sm:text-7xl xl:text-9xl">
        {HERO_HEADLINE}
      </div>
    </div>
  );
};

const RandomImage = () => {
  return HERO_IMAGES[Math.floor(Math.random() * HERO_IMAGES.length)];
};

const Giving = () => {
  return (
    <div className="relative z-60 bg-darkest-blue p-8 text-white sm:p-12 xl:p-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 text-base leading-normal sm:text-xl xl:text-3xl">
        <div className="font-bold leading-normal">{GIVING_HEADLINE}</div>
        <div className="leading-normal">{GIVING_BODY}</div>
      </div>
    </div>
  );
};

const Banner = () => {
  return (
    <div className="relative z-60 flex items-center justify-center gap-4 bg-blueAccent p-8 text-white sm:p-12 xl:px-24 xl:py-16">
      <Button
        to="https://www.classy.org/give/117371#!/donation/checkout"
        variant="gold"
        label={BANNER_LABEL}
      />
      <span className="hidden font-dharma sm:inline sm:text-4xl xl:text-5xl">{BANNER_CAPTION}</span>
    </div>
  );
};

const Impact = () => {
  return (
    <div className="relative z-60 bg-white p-8 sm:p-12 xl:p-24">
      <div className="mx-auto max-w-6xl space-y-8 sm:space-y-12 xl:space-y-24">
        <div className="text-center text-3xl">
          <span className="font-bold">Your Impact</span> at People for Bikes
        </div>
        <div className="relative mx-auto w-full max-w-6xl">
          <Slider className="py-8">
            {IMPACTS.map((item, index) => (
              <div key={index} className="px-4">
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

const Support = () => {
  return (
    <div className="bg-darkest-blue p-8 text-white sm:p-12 xl:p-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <div className="text-center font-dharma text-3xl font-bold sm:text-4xl xl:text-left xl:text-6xl">
          {SUPPORT_HEADLINE}
        </div>
        <div className="text-base leading-normal sm:text-xl xl:text-3xl">{SUPPORT_BODY}</div>
        <div className="mt-4 flex flex-col gap-8 divide-lightGray">
          {SUPPORT.map(({ label, contents }, index) => (
            <Disclosure key={index} label={label} contents={contents} />
          ))}
        </div>
        <div className="text-base leading-normal sm:text-xl">{SUPPORT_DETAILS}</div>
      </div>
    </div>
  );
};

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

const Quote = ({ quote }) => {
  return (
    <div className="w-full p-8 sm:p-12 xl:aspect-video xl:p-24">
      <div className="flex h-full flex-col items-center justify-center gap-3">
        <div className="relative top-[5rem] font-dharma text-[20rem] leading-[0] text-blue">
          &ldquo;
        </div>
        <div className="text-center font-dharma text-3xl sm:text-4xl xl:text-6xl">{quote.body}</div>
        <div className="flex flex-col items-center gap-2 rounded-lg bg-blue px-4 py-2 text-white sm:flex-row sm:gap-4">
          <div className="text-base font-bold xl:text-lg">{quote.author}</div>
          <div className="text-base font-bold uppercase text-yellow xl:text-lg">
            {quote.donorType}
          </div>
        </div>
        <div className="relative -bottom-[8rem] hidden font-dharma text-[20rem] leading-[0] text-blue xl:block">
          &rdquo;
        </div>
      </div>
    </div>
  );
};

const Methods = () => {
  return (
    <div className="bg-darkest-blue p-8 text-white sm:p-12 xl:p-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <div className="text-center font-dharma text-3xl font-bold sm:text-4xl xl:text-left xl:text-6xl">
          {METHODS_HEADLINE}
        </div>
        <div className="text-base leading-normal sm:text-xl xl:text-3xl">{METHODS_BODY}</div>
        <div className="mt-4 flex flex-col gap-8 divide-lightGray">
          {METHODS.map(({ label, contents }, index) => (
            <Disclosure key={index} label={label} contents={contents} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Maximize = () => {
  return (
    <div className="bg-white p-8 sm:p-12 xl:p-24">
      <div className="mx-auto flex flex-col items-center justify-center gap-8 sm:gap-12 xl:gap-24">
        <div className="text-center font-dharma text-3xl font-bold sm:text-4xl xl:text-8xl">
          {MAXIMIZE_HEADLINE}
        </div>
        <div className="max-w-6xl text-base sm:text-xl xl:text-center xl:text-3xl">
          {MAXIMIZE_BODY}
        </div>
        <div className="relative mx-auto w-full max-w-6xl">
          <Slider className="py-8">
            {MAXIMIZERS.map((item, index) => (
              <div key={index} className="px-4">
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

const HERO_IMAGES = [
  <Image
    src="/new/1372618750_1600px.png"
    layout="fill"
    className="absolute inset-0 h-full w-full object-cover opacity-50"
    alt=""
    aria-hidden
  />,
  <Image
    src="/new/467971722_1600px.png"
    layout="fill"
    className="absolute inset-0 h-full w-full object-cover opacity-50"
    alt=""
    aria-hidden
  />,
  <Image
    src="/new/1287250666_1600px.png"
    layout="fill"
    className="absolute inset-0 h-full w-full object-cover opacity-50"
    alt=""
    aria-hidden
  />,
];

const HERO_HEADLINE = `Your Support of PeopleForBikes Matters`;

const GIVING_HEADLINE = `At PeopleForBikes, we know that bikes make life great. Our goal is to make the U.S. the best place in the world to ride a bike. With your help, we can make that vision a reality.`;

const GIVING_BODY = `Since 1999, thanks to your support, PeopleForBikes has worked in hundreds of communities nationwide to get more people on bikes more often and make biking better for everyone. Our more than 1.4 million supporters from across the U.S. help us secure billions in federal funding for more and better bike infrastructure and key programs like City Ratings and the Final Mile help build better bike networks right in your backyard. Since 1999, through our industry community grants program, we’ve donated more than $3.6 million and leveraged $775 million in funding for local bike projects, advocacy organizations, and education programs.`;

const BANNER_LABEL = `Give today`;

const BANNER_CAPTION = `Your support matters`;

const IMPACTS = [
  {
    title: 'Youth',
    image: '/new/1_Youth.png',
    description: `PeopleForBikes’ support of Outride and the Youth Cycling Coalition helps introduce more young riders to the joys of bicycling by expanding opportunity and access, especially in historically underserved communities. `,
  },
  {
    title: 'Policy',
    image: '/new/2_Policy.png',
    description: `Our VoteForBikes initiative supports dozens of pro-bike ballot measures in communities nationwide every year, with hundreds of millions of dollars approved for new or renewed funding for local trails and street safety improvements, connecting communities by opening and improving more great places to ride.`,
  },
  {
    title: 'Participation',
    image: '/new/3_Participation.png',
    description: `39 total states have adopted PeopleForBikes’ model, three-class electric bicycle definitions, which define e-bikes similarly to traditional bikes, and we’ve worked in a dozen cities and states to introduce e-bike purchase incentive programs. This work helps expand access for more Americans to afford and safely ride electric bicycles in their communities.`,
  },
  {
    title: 'Infrastructure',
    image: '/new/4_Infrastructure.png',
    description: `Our Final Mile program, in partnership with the Wend Collective, accelerated the construction of complete mobility networks in five U.S. cities and built 300 miles of new bike infrastructure in record time, connecting communities and their residents like never before.`,
  },
  {
    title: 'Ride Spot',
    image: '/new/5_RideSpot.png',
    description: `Our national Ride Spot Challenges inspire folks across the U.S. to explore their communities by bike, with more than 300,000 rides recorded in 2022 alone.`,
  },
];

const SUPPORT_HEADLINE = `Above + Beyond Corporate Support`;

const SUPPORT_BODY = `PeopleForBikes works with more than 325 bike industry companies to help advance our work across our three key pillars: infrastructure, policy, and participation. Endemic and non-endemic corporate partners can support our work in the following ways.`;

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

const SUPPORT_DETAILS = `Learn more about these programs and get involved by contacting Rod Judd (rod@peopleforbikes.org) or Kerri Salazar (kerri@peopleforbikes.org).`;

const QUOTES = [
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

const METHODS_HEADLINE = `Ways to Give`;

const METHODS_BODY = `PeopleForBikes makes it easy to give.`;

const METHODS = [
  {
    label: 'Online (credit card, ACH, Venmo, PayPal)',
    contents: (
      <div className="flex flex-col gap-6">
        <div>
          From our online giving page, you can make a one-time gift or set up a recurring, monthly
          gift. Our online giving page accepts gifts made through credit card, bank transfer, Venmo,
          and PayPal.
        </div>
      </div>
    ),
  },
  {
    label: 'By Mail',
    contents: (
      <div className="flex flex-col gap-6">
        <div>
          To make a gift by mail, please send to:
          <br />
          <br />
          PeopleForBikes Foundation
          <br />
          P.O. Box 2359
          <br />
          Boulder, CO 80306
        </div>
      </div>
    ),
  },
  {
    label: 'Stock Transfer ',
    contents: (
      <div className="flex flex-col gap-6">
        <div>
          PeopleForBikes accepts stock transfers. Please contact our billing department at
          billing@peopleforbikes.org for more information.
        </div>
      </div>
    ),
  },
  {
    label: 'Employer Matching Gifts ',
    contents: (
      <div className="flex flex-col gap-6">
        <div>
          Did you know you can double your impact by having your organization/company match your
          donation?
        </div>
        <div>
          Please use the search tool below to see if your company will match your donation and to
          access the forms, guidelines, and instructions to submit a matching gift.
        </div>
        <ExternalLink href="https://doublethedonation.com/members/#/setup/plugin-settings">
          Double the Donation Search
        </ExternalLink>
      </div>
    ),
  },
  {
    label: 'Donor-Advised Fund',
    contents: (
      <div className="flex flex-col gap-6">
        <div>
          Giving a gift to PeopleForBikes through your donor-advised fund is convenient and easy for
          you, and makes a huge impact. A few things to know:{' '}
        </div>
        <ul className="list-disc space-y-3 pl-4">
          <li>You can use your DAF to make a one-time or a recurring gift.</li>
          <li>
            You will receive an acknowledgment for your gift, but not a charitable receipt for tax
            purposes. This is because it is your contribution to your donor-advised fund that is
            tax-deductible, not your distribution to PeopleForBikes.
          </li>
          <li>
            You may not be able to receive benefits in exchange for a gift made through your
            donor-advised fund. Please refer to your donor-advised fund or financial advisor.
          </li>
          <li>
            Please direct your DAF distribution to PeopleForBikes Foundation and mail to the
            attention of Amy Ramirez at:
            <br />
            <br />
            PeopleForBikes Foundation
            <br />
            P.O. Box 2359
            <br />
            Boulder, CO 80306
            <br />
            <br />
            PeopleForBikes' Federal ID #: 20-4306888
          </li>
          <li>
            Please ask your DAF representative to include your name and address on the distribution
            so we know how to direct your acknowledgment. If you have any questions or would like
            additional information, please contact us at pfbfoundation@peopleforbikes.org.
          </li>
        </ul>
      </div>
    ),
  },
  {
    label: 'PeopleForBikes Financials',
    contents: (
      <div className="flex flex-col gap-6">
        <div>
          <br />
          <b>Financial Whistle Blower Policy</b>
          <br />
          <br />
          PeopleForBikes is committed to operating in furtherance of its tax-exempt purposes and in
          compliance with all applicable laws, rules and regulations, including those concerning
          accounting and auditing, and prohibits fraudulent practices by any of its board members,
          officers, employees, or volunteers.  This policy outlines a procedure for employees to
          report actions that an employee reasonably believes violates a law, or regulation or that
          constitutes fraudulent accounting or other practices.  This policy applies to any matter
          which is related to PeopleForBikes business and does not relate to private acts of an
          individual not connected to the business of PeopleForBikes. 
          <br />
          <br />
          If an employee has a reasonable belief that an employee or PeopleForBikes has engaged in
          any action that violates any applicable law, or regulation, including those concerning
          accounting and auditing, or constitutes a fraudulent practice, the employee is expected to
          immediately report such information to{' '}
          <a
            href="mailto:jenn@peopleforbikes.org?subject=Financial%20Whistle%20Blower%20Violation"
            style={{ textDecoration: 'underline' }}
          >
            Jenn Dice, President and CEO
          </a>
          .  If the employee does not feel comfortable reporting the information to the Executive
          Director, the employee is expected to report the information to{' '}
          <a
            href="mailto:matt@peopleforbikes.org?subject=Financial%20Whistle%20Blower%20Violation"
            style={{ textDecoration: 'underline' }}
          >
            Matt Moore, General and Policy Counsel
          </a>
          .
          <br />
          <br />
          All reports will be followed up promptly, and an investigation conducted.  In conducting
          its investigations, PeopleForBikes will strive to keep the identity of the complaining
          individual as confidential as possible, while conducting an adequate review and
          investigation. 
          <br />
          <br />
          PeopleForBikes will not retaliate against an employee in the terms and conditions of
          employment because that employee:  (a) reports to a supervisor, to policy counsel, to the
          executive director, the Board of Directors or to a federal, state or local agency what the
          employee believes in good faith to be a violation of the law; or (b) participates in good
          faith in any resulting investigation or proceeding, or (c) exercises their rights under
          any state or federal law(s) or regulation(s) to pursue a claim or take legal action to
          protect the employee’s rights.
          <br />
          <br />
          PeopleForBikes may take disciplinary action (up to and including termination) against an
          employee who in management’s assessment has engaged in retaliatory conduct in violation of
          this policy. 
          <br />
          <br />
          In addition, PeopleForBikes will not, with the intent to retaliate, take any action
          harmful to any employee who has provided to law enforcement personnel or a court truthful
          information relating to the commission or possible commission by PeopleForBikes or any of
          its employees of a violation of any applicable law or regulation.
          <br />
          <br />
          Supervisors will be trained on this policy and PeopleForBikes prohibition against
          retaliation in accordance with this policy.
        </div>
        <div>
          <b>Reports for PeopleForBikes Foundation - 501(c)(3)</b>
          <br />
          <br />
          <a
            style={{ textDecoration: 'underline' }}
            href="https://prismic-io.s3.amazonaws.com/peopleforbikes/05b71822-1b7c-42fb-a319-14fbac0ee3bf_PFB+Foundation+Audited+Financial+Statements_+2018.pdf"
            target="_blank"
          >
            PeopleForBikes Foundation Audited Financials 2017 and 2018
          </a>
          <br />
          <a
            style={{ textDecoration: 'underline' }}
            href="https://prismic-io.s3.amazonaws.com/peopleforbikes/79d72015-4a17-4518-8401-8b896c233e37_PFB+Foundation+Audited+Financial+Statements_+2019.pdf"
            target="_blank"
          >
            PeopleForBikes Foundation Audited Financials 2018 and 2019
          </a>
          <br />
          <a
            style={{ textDecoration: 'underline' }}
            href="https://prismic-io.s3.amazonaws.com/peopleforbikes/d41c0842-6e06-4cb9-b8f6-b1b4c51be1ad_PFB+Foundation+audited+Financial+Statements_+2020.pdf"
            target="_blank"
          >
            PeopleForBikes Foundation Audited Financials 2019 and 2020
          </a>
          <br />
          <a
            style={{ textDecoration: 'underline' }}
            href="https://prismic-io.s3.amazonaws.com/peopleforbikes/914ceddc-ec09-4158-a2d6-f07f692fb9d7_PFB+Foundation+Audited+Finacial+Statements+2021.pdf"
            target="_blank"
          >
            PeopleForBikes Foundation Audited Financials 2020 and 2021
          </a>
        </div>
        <div>
          <b>Reports for PeopleForBikes Coalition - 501(c)(4)</b>
          <br />
          <br />
          <a
            style={{ textDecoration: 'underline' }}
            href="https://prismic-io.s3.amazonaws.com/peopleforbikes/ad1de379-1589-4517-873e-3ecdd1d3bdb0_PFB+Coalition+Audited+Financial+Statements+2020+and+2021.pdf"
            target="_blank"
          >
            PeopleForBikes Coalition Audited Financials 2020 and 2021
          </a>
        </div>
      </div>
    ),
  },
];

const MAXIMIZE_HEADLINE = `Maximize Your Support`;

const MAXIMIZE_BODY = `Giving to the PeopleForBikes Foundation is flexible — you can donate to one of our many programs, or choose to make a donation that best meets the Foundation’s area of greatest need. Here are some of the different areas you can support by giving to PeopleForBikes:`;

const MAXIMIZERS = [
  {
    title: '1,000 Bike Projects Across America',
    image: '/new/6_1000_Places.png',
    description: `We’re working to make biking safer by accelerating the construction of thousands of bike projects from coast to coast. Your support can help build protected bike lanes, off-street paths and trails, pump tracks, bike parks, and more right in your backyard.`,
  },
  {
    title: 'More Kids on Bikes',
    image: '/new/7_Kids.png',
    description: `We believe biking should be accessible and fun for every kid across the U.S. By supporting our youth programming work, you’re helping grow the next generation of riders by getting more kids on bikes more often.`,
  },
  {
    title: 'Trails + Recreation',
    image: '/new/8_Trails.png',
    description: `PeopleForBikes works to grow recreational riding opportunities nationwide. You can support our work preserving and expanding access for mountain biking, gravel riding, and long-distance trails to help more Americans experience the joys of biking in the great outdoors.`,
  },
  {
    title: 'Benefits for Biking',
    image: '/new/9_Benefits.png',
    description: `We encourage cities, states, and the federal government to provide incentives for biking like tax credits, purchase rebates, and more. Your support helps us get these benefits in place to make biking more accessible in your community.`,
  },
];
