import splashOne from '../../public/social-splash/PFB_Social-01.jpg';
import splashTwo from '../../public/social-splash/PFB_Social-02.jpg';
import splashThree from '../../public/social-splash/PFB_Social-03.jpg';
import splashFour from '../../public/social-splash/PFB_Social-04.jpg';
import logo from '../../public/PFB_Stacked_LOGO_512x512.jpg';

// social images
const socialSplashArr = [splashOne, splashTwo, splashThree, splashFour];

/**
 * defaultData (variable)
 *
 * This established boilerplate data we need around the app
 * And feeds into a context provider in _app.js
 * Categories
 * - Site Metadata
 * - Action Items
 * - RideSpot Rides
 * - News (to be completed)
 *
 * @param { object } meta - contains all variable metadata
 * @param { object } actionItems - three default Action Items
 * @param { string } rideSpotRides - three default RideSpot Rides
 * @param { string } newsItems - three News Stories we can use anywhere (TBD)
 */
export const defaultData = {
  meta: {
    desc: 'PeopleForBikes is committed to improving biking for everyone. Learn more about our work and join our movement.',
    title: 'PeopleForBikes | Every ride. Every rider. Join us.',
    imgHeight: '900',
    imgSrc: `${socialSplashArr[Math.floor(Math.random() * socialSplashArr.length)]}`,
    imgWidth: '1600',
    keywords:
      'PeopleForBikes, bikes, cycles, cycling, sustainable transportation, bicycling benefits, bike business, bike commuting, bike networks, bike racing, bike rides, bike safety, electric bikes, first time bikers, city riding, e-bikes, inclusive biking, recreational bike access, senior cycling, trade and tariffs for bicycles, youth bicycling',
    path: 'https://www.peopleforbikes.org',
  },
  actionItems: [
    {
      title: [
        {
          type: 'heading2',
          text: 'Become a Member',
          spans: [],
        },
      ],
      extended_text: null,
      text: "PeopleForBikes is making a difference around the country but we need your help. Becoming a member doesn't cost you a thing and helps us to build a stronger voice for the future of biking.",
      icon: 'Join (link icon)',
      link: {
        __typename: 'Landing_page',
        _meta: {
          id: '01',
          uid: 'join',
        },
      },
    },
    {
      title: [
        {
          type: 'heading2',
          text: 'Discover an Electric Bike Ride Near You',
          spans: [],
        },
      ],
      extended_text: null,
      text: 'Find great electric bike rides around the United States with our lists and helpful mapping tools.',
      icon: 'E-bikes (battery icon)',
      link: {
        __typename: 'Electric Bikes',
        _meta: {
          id: '02',
          uid: 'rides-and-routes',
        },
      },
    },
    {
      title: [
        {
          type: 'heading2',
          text: "Learn What's Happening in the World of Biking",
          spans: [],
        },
      ],
      extended_text: null,
      text: "Ready to learn about how your next great ride comes into being? Check out the latest work from the whole PeopleForBikes team. We're advancing polices, helping to build infrastructure and need your help.",
      icon: 'News (newspaper icon)',
      link: {
        __typename: 'Landing_page',
        _meta: {
          id: '03',
          uid: 'news',
        },
      },
    },
  ],
  rideSpotRides: {
    rideone: {
      title: [
        {
          type: 'heading1',
          text: 'NW Grand Rapids Tour',
          spans: [],
        },
      ],
      distance: '6.5 miles',
      organization: {
        name: [
          {
            type: 'heading1',
            text: 'GVSU - Recreation and Wellness',
            spans: [],
          },
        ],
      },
      ridespot_link: {
        url: 'https://ridespot.org/rides/209896',
        target: '_blank',
      },
    },
    ridetwo: {
      title: [
        {
          type: 'heading1',
          text: "Reed's Lake Cyclocross Loop",
          spans: [],
        },
      ],
      distance: '10 Miles',
      organization: {
        name: [
          {
            type: 'heading1',
            text: 'Alger Bikes',
            spans: [],
          },
        ],
      },
      ridespot_link: {
        url: 'https://ridespot.org/rides/10653',
        target: '_blank',
      },
    },
    ridethree: {
      title: [
        {
          type: 'heading1',
          text: 'Waterloo G&G',
          spans: [],
        },
      ],
      distance: '10 Miles',
      organization: {
        name: [
          {
            type: 'heading1',
            text: 'Fraser Bicycle - Ann Arbor',
            spans: [],
          },
        ],
      },
      ridespot_link: {
        url: 'https://ridespot.org/rides/7561',
        target: '_blank',
      },
    },
  },
};

/**
 * ldJSONBasic (variable)
 *
 * This is a LDJSON signature for the organization
 * We add this into _app.js so it's available around the site
 *
 * @param { object } ldJSONBasic - contains all LDJSON for a basic Google Organization
 */
export const ldJSONBasic = {
  '@context': 'http://schema.org',
  '@type': 'Organization',
  '@id': 'https://www.peopleforbikes.org/mission',
  'name': 'PeopleForBikes',
  'url': 'https://www.peopleforbikes.org',
  'privacyPolicy': 'https://www.peopleforbikes.org/privacy',
  'alternateName': ['PFB', 'BikesBelong', 'Bicycle Product Suppliers Association', 'BPSA'],
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': '2580 55th St #200',
    'addressLocality': 'Boulder',
    'addressRegion': 'CO',
    'postalCode': '80301',
    'addressCountry': 'US',
  },
  'telephone': '+13034494893',
  'logo': {
    '@context': 'http://schema.org',
    '@type': 'ImageObject',
    'url': `${logo}`,
    'height': 512,
    'width': 512,
  },
  'sameAs': [
    'https://www.facebook.com/PeopleForBikes',
    'https://twitter.com/peopleforbikes',
    'https://www.linkedin.com/company/peopleforbikes',
    'https://www.instagram.com/peopleforbikes',
    'https://www.youtube.com/user/peopleforbikes/videos',
  ],
};
