// next.config.js
const withImages = require('next-images')

const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants')

// This uses phases as outlined here: 
// https://github.com/vercel/next.js/tree/canary/examples/with-env-from-next-config-js
module.exports = withImages((phase) => {
  // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  // when `next build` or `npm run build` is used
  const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1'
  // when `next build` or `npm run build` is used
  const isStaging =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1'

  const env = {
    SITE_URL: (() => {
      if (isDev) return 'http://localhost:3001'
      if (isProd) {
        return 'https://pfb-nextjs.vercel.app/'
      }
      if (isStaging) return 'https://pfb-nextjs.vercel.app/'
      return 'SITE_URL:not (isDev,isProd && !isStaging,isProd && isStaging)'
    })(),
  }

  // next.config.js object
  return {
    env,
  }
})

