import fs from 'fs-extra';
import * as prismic from '@prismicio/client';

const REPOSITORY = 'PeopleforBikes';
const API_TOKEN = `${process.env.PRISMIC_API_TOKEN}`;
const GRAPHQL_API_URL = `https://${REPOSITORY}.prismic.io/graphql`;

const prismicClient = prismic.createClient(prismic.getEndpoint(REPOSITORY), {
  accessToken: API_TOKEN,
});

const getPrismicData = async (query, options = { variables: {} }) => {
  const { variables } = options;
  const response = await prismicClient.graphQLFetch(
    `${GRAPHQL_API_URL}?query=${query}&variables=${JSON.stringify(variables)}`,
  );
  const json = await response.json();
  return json.data;
};

/**
 * @type {import('next').NextConfig}
 */

const menuQuery = `query GlobalMenu($uid: String!, $lang: String!) {
    menu(uid: $uid, lang: $lang) {
      _linkType
      _meta {
        type
        uid
        id
      }
      menu_items {
        text
        link {
          ... on Landing_page {
            title
            _meta {
              id
              uid
              type
            }
          }
          ... on _ExternalLink {
            url
            target
            _linkType
          }
        }
      }
      topic_items {
        link {
          ... on Topic {
            title
            _meta {
              id
              uid
              type
            }
            square_image
          }
        }
      }
    }
  }`;

const nextConfig = async (phase, { defaultConfig }) => {
  // Environments - should be handled with environmental variables in webpack 5
  // Talk with your project lead

  const globalSitesData = await getPrismicData(menuQuery, {
    variables: {
      uid: 'global-network-menu',
      lang: 'en-us',
    },
  });

  const advocacyData = await getPrismicData(menuQuery, {
    variables: {
      uid: 'advocacy-menu',
      lang: 'en-us',
    },
  });

  const ourWorkData = await getPrismicData(menuQuery, {
    variables: {
      uid: 'our-work-menu',
      lang: 'en-us',
    },
  });

  const ridesData = await getPrismicData(menuQuery, {
    variables: {
      uid: 'rides-menu',
      lang: 'en-us',
    },
  });

  const globalData = {
    globalSitesData,
    advocacyData,
    ourWorkData,
    ridesData,
  };

  fs.writeJson('./data/global.json', globalData);

  return {
    // Asset handling
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      // SVG handler, inlines everything under 200KB
      config.module.rules.push({
        test: /\.svg$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 200 * 1024,
          },
        },
        use: 'svgo-loader',
      });

      return config;
    },

    // Use SWC for minification instead of Terser
    swcMinify: true,

    // Enable styled components
    compiler: {
      styledComponents: true, // ssr and displayName are configured by default
    },

    // To use next/images...
    images: {
      deviceSizes: [320, 380, 480, 768, 980, 1200, 1600],
      domains: ['*.peopleforbikes.org', 'localhost', 'images.prismic.io'],
    },

    // Experimental features
    experimental: {
      swcPlugins: [['@swc-jotai/react-refresh', {}]],
    },

    // Disable source maps for production builds
    productionBrowserSourceMaps: false,

    // Redirects
    async redirects() {
      return [
        {
          source: '/blog/:slug*',
          destination: '/news/:slug*',
          permanent: true,
        },
        {
          source: '/our-work/e-bikes/:slug*',
          destination: '/electric-bikes/:slug*',
          permanent: true,
        },
        {
          source: '/emtb',
          destination: '/electric-bikes/emtb-map',
          permanent: true,
        },
        {
          source: '/our-work/e-bikes',
          destination: '/topics/electric-bikes',
          permanent: true,
        },
        {
          source: '/federal-e-bike-rulemaking',
          destination: '/electric-bikes/federal-e-bike-rulemaking',
          permanent: true,
        },
        {
          source: '/pages/e-bikes',
          destination: '/topics/electric-bikes',
          permanent: true,
        },
        {
          source: '/e-bikes',
          destination: '/topics/electric-bikes',
          permanent: true,
        },
        {
          source: '/ebikes',
          destination: '/topics/electric-bikes',
          permanent: true,
        },
        {
          source: '/electric-bikes',
          destination: '/topics/electric-bikes',
          permanent: true,
        },
        {
          source: '/tariffs',
          destination: '/topics/trade-and-tariffs',
          permanent: true,
        },
        {
          source: '/business-intelligence-hub-coalition-members',
          destination: '/members/business-intelligence-hub',
          permanent: true,
        },
        {
          source: '/apply-now',
          destination: '/grant-application',
          permanent: true,
        },
        {
          source: '/forestserviceebikepolicy',
          destination: '/take-action/forestserviceebikepolicy',
          permanent: true,
        },
        {
          source: '/2021-workplan',
          destination: '/take-action/2021-workplan',
          permanent: true,
        },
        {
          source: '/ask-congress-to-help-provide-a-six-month-extension-for-section-301-exclusions',
          destination: '/take-action/301-tariff-exclusions',
          permanent: true,
        },
        {
          source: '/add-my-city',
          destination: '/take-action/add-my-city',
          permanent: true,
        },
        {
          source: '/update-my-city',
          destination: '/take-action/update-my-city',
          permanent: true,
        },
        {
          source: '/download-the-report',
          destination: '/take-action/download-the-report',
          permanent: true,
        },
        {
          source: '/urge-congress-support-biking',
          destination: '/take-action/urge-congress-support-biking',
          permanent: true,
        },
        {
          source: '/urge-congress-support-biking',
          destination: '/take-action/urge-congress-support-biking',
          permanent: true,
        },
        {
          source: '/why-do-you-ride',
          destination: '/take-action/why-do-you-ride',
          permanent: true,
        },
        {
          source: '/fundraising-communications',
          destination: '/take-action/remove-me-from-fundraising-communcations',
          permanent: true,
        },
        {
          source: '/apply-draft-speaker',
          destination: '/take-action/apply-draft-speaker',
          permanent: true,
        },
        {
          source: '/benandbikes',
          destination: '/take-action/benandbikes',
          permanent: true,
        },
        {
          source: '/benandbikes',
          destination: '/take-action/benandbikes',
          permanent: true,
        },
        {
          source: '/ben',
          destination: '/take-action/benandbikes',
          permanent: true,
        },
        {
          source: '/ben',
          destination: '/take-action/benandbikes',
          permanent: true,
        },
        {
          source: '/lightboxjoin',
          destination: '/join',
          permanent: true,
        },
        {
          source: '/ebikes-list-join',
          destination: '/take-action/ebikes-list-join',
          permanent: true,
        },
        {
          source: '/nbbjoins',
          destination: '/take-action/nbbjoins',
          permanent: true,
        },
        {
          source: '/get-latest-industry-enews',
          destination: '/take-action/get-latest-industry-enews',
          permanent: true,
        },
        {
          source: '/share-your-event',
          destination: '/take-action/share-your-event',
          permanent: true,
        },
        {
          source: '/register-your-local-group',
          destination: '/take-action/register-your-local-group',
          permanent: true,
        },
        {
          source: '/become-peopleforbikes-retailer',
          destination: 'https://ridespot.org/register',
          permanent: true,
        },
        {
          source: '/local-engagement-portal',
          destination: '/take-action/local-engagement-portal',
          permanent: true,
        },
        {
          source: '/membercenter',
          destination: '/log-in',
          permanent: true,
        },
        {
          source: '/login',
          destination: '/log-in',
          permanent: true,
        },
        {
          source: '/placesforbikes',
          destination: '/local-innovation',
          permanent: true,
        },
        {
          source: '/weekly-survey-opt-out',
          destination: '/take-action/weekly-survey-opt-out',
          permanent: true,
        },
        {
          source: '/peopleforbikes-board-and-committee-member-orientation/',
          destination: '/board-orientation',
          permanent: true,
        },
        {
          source: '/coalition-directory',
          destination: '/coalition-directory',
          permanent: true,
        },
        {
          source: '/become-an-ambassador',
          destination: 'https://forms.gle/4MwJNQnQV8PEoRp17',
          permanent: true,
        },
        {
          source: '/join-people-bikes-coalition',
          destination: '/join',
          permanent: true,
        },
        {
          source: '/subcommitteememberorientation',
          destination: '/board-orientation',
          permanent: true,
        },
        {
          source: '/become-peopleforbikes-supplier',
          destination: '/take-action/join-the-peopleforbikes-coalition',
          permanent: true,
        },
        {
          source: '/privacy-policy',
          destination: '/privacy',
          permanent: true,
        },
        {
          source: '/sell-in-and-sell-through-reports',
          destination: '/members/monthly-sales-reports',
          permanent: true,
        },
        {
          source: '/business-intelligence-hub',
          destination: '/members/business-intelligence-hub',
          permanent: true,
        },
        {
          source: '/logos',
          destination: 'https://www.dropbox.com/sh/uimaqsac76wawzl/AAAV0E-FkHEimL54I3X0vi-ka?dl=0',
          permanent: true,
        },
        {
          source: '/e-bike-act',
          destination: '/take-action/e-bike-act',
          permanent: true,
        },
        {
          source: '/industry-webinar-series',
          destination: '/bike-industry-webinars',
          permanent: true,
        },
        {
          source: '/placesforbikes/pages/bicycle-network-analysis',
          destination: '/take-action/add-my-city',
          permanent: true,
        },
        {
          source: '/donate',
          destination: 'https://www.classy.org/give/117371/',
          permanent: false,
        },
        {
          source: '/hungryforbatteries',
          destination: 'https://www.dropbox.com/sh/d3s936xi5ebfxf5/AAB5g5bnuZ5pwiXJie8Tje_7a?dl=0',
          permanent: true,
        },

        
      ];
    },
  };
};

export default nextConfig;
