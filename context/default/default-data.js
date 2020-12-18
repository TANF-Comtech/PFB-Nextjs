import splashOne from '../../public/social-splash/PFB_Social-01.jpg'
import splashTwo from '../../public/social-splash/PFB_Social-02.jpg'
import splashThree from '../../public/social-splash/PFB_Social-03.jpg'
import splashFour from '../../public/social-splash/PFB_Social-04.jpg'
import logo from '../../public/PFB_Stacked_LOGO_512x512.jpg'

const socialSplashArr = [ splashOne, splashTwo, splashThree, splashFour ] // social images

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
  "meta": {
    "desc" : "PeopleForBikes is committed to improving biking for everyone. Learn more about our work and join our movement.",
    "title" : "PeopleForBikes | Every ride. Every rider. Join us.",
    "imgHeight": "900",
    "imgSrc" : `${ socialSplashArr[Math.floor(Math.random()*socialSplashArr.length)] }`,
    "imgWidth" : "1600",
    "path" : "https://www.peopleforbikes.org",
  },
  "actionItems": [
    {
      "title": [
        {
          "type": "heading2",
          "text": "Become a Member",
          "spans": []
        }
      ],
      "extended_text": null,
      "text": "PeopleForBikes is making a difference around the country but we need your help. Becoming a member doesn't cost you a thing and helps us to build a stronger voice for the future of biking.",
      "icon": "Join (link icon)",
      "link": {
        "__typename": "Landing_page",
        "_meta": {
          "id": "01",
          "uid": "join",
        }
      }
    },
    {
      "title": [
        {
          "type": "heading2",
          "text": "Find an Event in Your Area",
          "spans": []
        }
      ],
      "extended_text": null,
      "text": "Pandemic shutdowns may have us staying in but we continue our social efforts digitally with our many events, which bring bikers together for spirited discussions.",
      "icon": "Event (calendar icon)",
      "link": {
        "__typename": "Landing_page",
        "_meta": {
          "id": "02",
          "uid": "events",
        }
      }
    },
    {
      "title": [
        {
          "type": "heading2",
          "text": "Learn What's Happening in the World of Biking",
          "spans": []
        }
      ],
      "extended_text": null,
      "text": "Ready to learn about how your next great ride comes into being? Check out the latest work from the whole PeopleForBikes team. We're advancing polices, helping to build infrastructure and need your help.",
      "icon": "News (newspaper icon)",
      "link": {
        "__typename": "Landing_page",
        "_meta": {
          "id": "03",
          "uid": "news",
        }
      }
    }
  ],
  'rideSpotRides': {
    "rideone": {
      "title": [
        {
          "type": "heading1",
          "text": "NW Grand Rapids Tour",
          "spans": []
        }
      ],
      "distance": "6.5 miles",
      "organization": {
        "name": [
          {
            "type": "heading1",
            "text": "GVSU - Recreation and Wellness",
            "spans": []
          }
        ]
      },
      "ridespot_link": {
        "url": "https://ridespot.org/rides/209896",
        "target": "_blank"
      }
    },
    "ridetwo": {
      "title": [
        {
          "type": "heading1",
          "text": "Reed's Lake Cyclocross Loop",
          "spans": []
        }
      ],
      "distance": "10 Miles",
      "organization": {
        "name": [
          {
            "type": "heading1",
            "text": "Alger Bikes",
            "spans": []
          }
        ]
      },
      "ridespot_link": {
        "url": "https://ridespot.org/rides/10653",
        "target": "_blank"
      }
    },
    "ridethree": {
      "title": [
        {
          "type": "heading1",
          "text": "Waterloo G&G",
          "spans": []
        }
      ],
      "distance": "10 Miles",
      "organization": {
        "name": [
          {
            "type": "heading1",
            "text": "Fraser Bicycle - Ann Arbor",
            "spans": []
          }
        ]
      },
      "ridespot_link": {
        "url": "https://ridespot.org/rides/7561",
        "target": "_blank"
      }
    },
  }
}

/**
 * ldJSONBasic (variable)
 * 
 * This is a LDJSON signature for the organization
 * We add this into _app.js so it's available around the site
 * 
 * @param { object } ldJSONBasic - contains all LDJSON for a basic Google Organization
 */
export const ldJSONBasic = {
  "@context": "http://schema.org",
  "@type": "Organization",
  "name": "PeopleForBikes",
  "url": "https://www.peopleforbikes.org",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "2580 55th St #200",
    "addressLocality": "Boulder",
    "addressRegion": "CO",
    "postalCode": "80301",
    "addressCountry": "US"
  },
  "telephone": "+13034494893",
  "logo": `${ logo }`,
  "sameAs": [
    "https://www.facebook.com/PeopleForBikes", 
    "https://twitter.com/peopleforbikes",
    "https://www.linkedin.com/company/peopleforbikes",
    "https://www.instagram.com/peopleforbikes",
    "https://www.youtube.com/user/peopleforbikes/videos"]
}