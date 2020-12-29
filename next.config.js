// next.config.js
const withPlugins = require('next-compose-plugins')
const withImages = require('next-images')
const { 
  PHASE_DEVELOPMENT_SERVER, 
  PHASE_PRODUCTION_BUILD 
} = require('next/constants')

const nextConfig = {
  // Set redirects here, objs in arr as needed
  async redirects() {
    return [
      {
        source: '/blog/:slug*',
        destination: '/news/:slug*',
        permanent: true,
      },
      {
        source: '/apply-now',
        destination: '/grant-application',
        permanent: true
      },
      {
        source: '/our-work/e-bikes',
        destination: 'topics/electric-bikes',
        permanent: true
      },
      {
        source: '/2021-workplan',
        destination: '/take-action/2021-workplan',
        permanent: true
      },
      {
        source: '/ask-congress-to-help-provide-a-six-month-extension-for-section-301-exclusions',
        destination: '/take-action/301-tariff-exclusions',
        permanent: true
      },   
      {
        source: '/add-my-city',
        destination: '/take-action/add-my-city',
        permanent: true
      },
      {
        source: '/update-my-city',
        destination: '/take-action/update-my-city',
        permanent: true
      },
      {
        source: '/download-the-report',
        destination: '/take-action/download-the-report',
        permanent: true
      },       
      {
        source: '/urge-congress-support-biking',
        destination: '/take-action/urge-congress-support-biking',
        permanent: true
      },       
      {
        source: '/urge-congress-support-biking',
        destination: '/take-action/urge-congress-support-biking',
        permanent: true
      },
      {
        source: '/why-do-you-ride',
        destination: '/take-action/why-do-you-ride',
        permanent: true
      },   
      {
        source: '/fundraising-communications',
        destination: '/take-action/remove-me-from-fundraising-communcations',
        permanent: true
      },      
      {
        source: '/apply-draft-speaker',
        destination: '/take-action/apply-draft-speaker',
        permanent: true
      },   
      {
        source: '/benandbikes',
        destination: '/take-action/benandbikes',
        permanent: true
      },
      {
        source: '/benandbikes',
        destination: '/take-action/benandbikes',
        permanent: true
      },      
      {
        source: '/ben',
        destination: '/take-action/benandbikes',
        permanent: true
      }, 
      {
        source: '/ben',
        destination: '/take-action/benandbikes',
        permanent: true
      }, 
      {
        source: '/lightboxjoin',
        destination: '/join',
        permanent: true
      }, 
      {
        source: '/ebikes-list-join',
        destination: '/take-action/ebikes-list-join',
        permanent: true
      },
      {
        source: '/nbbjoins',
        destination: '/take-action/nbbjoins',
        permanent: true
      },    
      {
        source: '/get-latest-industry-enews',
        destination: '/take-action/get-latest-industry-enews',
        permanent: true
      },
      {
        source: '/share-your-event',
        destination: '/take-action/share-your-event',
        permanent: true
      },
      {
        source: '/register-your-local-group',
        destination: '/take-action/register-your-local-group',
        permanent: true
      },
      {
        source: '/become-peopleforbikes-retailer',
        destination: 'https://ridespot.org/register',
        permanent: true
      }, 
      {
        source: '/local-engagement-portal',
        destination: '/take-action/local-engagement-portal',
        permanent: true
      }, 
    ]
  }
}

// This uses phases as outlined here: 
// https://github.com/vercel/next.js/tree/canary/examples/with-env-from-next-config-js
module.exports = withPlugins([

  // Processes images during build time
  [withImages, {
    [PHASE_DEVELOPMENT_SERVER]: 'http://localhost:3001',
    [PHASE_PRODUCTION_BUILD]: 'https://www.peopleforbikes.org'
  }]
   
], nextConfig)