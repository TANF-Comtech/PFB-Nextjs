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
      }
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