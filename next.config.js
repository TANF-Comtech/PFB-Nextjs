const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require("next/constants");



// This uses phases as outlined here:
// https://github.com/vercel/next.js/tree/canary/examples/with-env-from-next-config-js
module.exports = {
  // redirects
  async redirects() {
    return [
      {
        source: "/blog/:slug*",
        destination: "/news/:slug*",
        permanent: true,
      },
      {
        source: "/our-work/e-bikes/:slug*",
        destination: "/electric-bikes/:slug*",
        permanent: true,
      },
      {
        source: "/emtb",
        destination: "/electric-bikes/emtb-map",
        permanent: true,
      },
      {
        source: "/our-work/e-bikes",
        destination: "/topics/electric-bikes",
        permanent: true,
      },
      {
        source: "/federal-e-bike-rulemaking",
        destination: "/electric-bikes/federal-e-bike-rulemaking",
        permanent: true,
      },
      {
        source: "/pages/e-bikes",
        destination: "/topics/electric-bikes",
        permanent: true,
      },
      {
        source: "/e-bikes",
        destination: "/topics/electric-bikes",
        permanent: true,
      },
      {
        source: "/ebikes",
        destination: "/topics/electric-bikes",
        permanent: true,
      },
      {
        source: "/electric-bikes",
        destination: "/topics/electric-bikes",
        permanent: true,
      },
      {
        source: "/tariffs",
        destination: "/topics/trade-and-tariffs",
        permanent: true,
      },
      {
        source: "/business-intelligence-hub-coalition-members",
        destination: "/members/business-intelligence-hub",
        permanent: true,
      },
      {
        source: "/apply-now",
        destination: "/grant-application",
        permanent: true,
      },
      {
        source: "/forestserviceebikepolicy",
        destination: "/take-action/forestserviceebikepolicy",
        permanent: true,
      },
      {
        source: "/2021-workplan",
        destination: "/take-action/2021-workplan",
        permanent: true,
      },
      {
        source:
          "/ask-congress-to-help-provide-a-six-month-extension-for-section-301-exclusions",
        destination: "/take-action/301-tariff-exclusions",
        permanent: true,
      },
      {
        source: "/add-my-city",
        destination: "/take-action/add-my-city",
        permanent: true,
      },
      {
        source: "/update-my-city",
        destination: "/take-action/update-my-city",
        permanent: true,
      },
      {
        source: "/download-the-report",
        destination: "/take-action/download-the-report",
        permanent: true,
      },
      {
        source: "/urge-congress-support-biking",
        destination: "/take-action/urge-congress-support-biking",
        permanent: true,
      },
      {
        source: "/urge-congress-support-biking",
        destination: "/take-action/urge-congress-support-biking",
        permanent: true,
      },
      {
        source: "/why-do-you-ride",
        destination: "/take-action/why-do-you-ride",
        permanent: true,
      },
      {
        source: "/fundraising-communications",
        destination: "/take-action/remove-me-from-fundraising-communcations",
        permanent: true,
      },
      {
        source: "/apply-draft-speaker",
        destination: "/take-action/apply-draft-speaker",
        permanent: true,
      },
      {
        source: "/benandbikes",
        destination: "/take-action/benandbikes",
        permanent: true,
      },
      {
        source: "/benandbikes",
        destination: "/take-action/benandbikes",
        permanent: true,
      },
      {
        source: "/ben",
        destination: "/take-action/benandbikes",
        permanent: true,
      },
      {
        source: "/ben",
        destination: "/take-action/benandbikes",
        permanent: true,
      },
      {
        source: "/lightboxjoin",
        destination: "/join",
        permanent: true,
      },
      {
        source: "/ebikes-list-join",
        destination: "/take-action/ebikes-list-join",
        permanent: true,
      },
      {
        source: "/nbbjoins",
        destination: "/take-action/nbbjoins",
        permanent: true,
      },
      {
        source: "/get-latest-industry-enews",
        destination: "/take-action/get-latest-industry-enews",
        permanent: true,
      },
      {
        source: "/share-your-event",
        destination: "/take-action/share-your-event",
        permanent: true,
      },
      {
        source: "/register-your-local-group",
        destination: "/take-action/register-your-local-group",
        permanent: true,
      },
      {
        source: "/become-peopleforbikes-retailer",
        destination: "https://ridespot.org/register",
        permanent: true,
      },
      {
        source: "/local-engagement-portal",
        destination: "/take-action/local-engagement-portal",
        permanent: true,
      },
      {
        source: "/membercenter",
        destination: "/log-in",
        permanent: true,
      },
      {
        source: "/login",
        destination: "/log-in",
        permanent: true,
      },
      {
        source: "/placesforbikes",
        destination: "/local-innovation",
        permanent: true,
      },
      {
        source: "/weekly-survey-opt-out",
        destination: "/take-action/weekly-survey-opt-out",
        permanent: true,
      },
      {
        source: "/peopleforbikes-board-and-committee-member-orientation/",
        destination: "/board-orientation",
        permanent: true,
      },
      {
        source: "/coalition-directory",
        destination: "/coalition-directory",
        permanent: true,
      },
      {
        source: "/become-an-ambassador",
        destination: "https://forms.gle/4MwJNQnQV8PEoRp17",
        permanent: true,
      },
      {
        source: "/join-people-bikes-coalition",
        destination: "/join",
        permanent: true,
      },
      {
        source: "/subcommitteememberorientation",
        destination: "/board-orientation",
        permanent: true,
      },
      {
        source: "/become-peopleforbikes-supplier",
        destination: "/take-action/join-the-peopleforbikes-coalition",
        permanent: true,
      },
      {
        source: "/privacy-policy",
        destination: "/privacy",
        permanent: true,
      },
      {
        source: "/sell-in-and-sell-through-reports",
        destination: "/members/monthly-sales-reports",
        permanent: true,
      },
      {
        source: "/business-intelligence-hub",
        destination: "/members/business-intelligence-hub",
        permanent: true,
      },
      {
        source: "/logos",
        destination:
          "https://www.dropbox.com/sh/uimaqsac76wawzl/AAAV0E-FkHEimL54I3X0vi-ka?dl=0",
        permanent: true,
      },
      {
        source: "/e-bike-act",
        destination: "/take-action/e-bike-act",
        permanent: true,
      },
      {
        source: "/industry-webinar-series",
        destination: "/bike-industry-webinars",
        permanent: true,
      },
    ];
  },
  images: {
    [PHASE_DEVELOPMENT_SERVER]: "http://localhost:3001",
    [PHASE_PRODUCTION_BUILD]: "https://www.peopleforbikes.org",
  },
};
