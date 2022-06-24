PeopleForBikes site is a [Next.js](https://nextjs.org/) project using [styled-components](https://styled-components.com/docs) for CSS, [Apollo](https://www.apollographql.com/docs/react/) for component-level data-fetching and [Prismic.io](https://peopleforbikes.prismic.io/) as our headless CMS.

## Getting Started

If you haven't run this project before, we're using `yarn` and Node `v16.x`. To get started, make sure your running right version of Node and then run `yarn` and install dependencies:
```bash
node -v # should show v14.x.x, recommend using nvm 
yarn install # should output a bunch of install scripts, ignore warnings
yarn dev # starts the dev server
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result (Next will sometimes put your server at port `3001`, `3002` if you have something else running - check your CLI output).

### Tooling

Make sure you have a high-level understanding of the tooling being used:

- [styled-components](https://styled-components.com/docs), our styling tool
- [PFB Prismic](https://peopleforbikes.prismic.io/), our Prismic headless CMS instance
- [PFB Prismic GraphiQL](https://peopleforbikes.prismic.io/graphql), where to test your queries
- [prismic-javascript](https://github.com/prismicio/prismic-javascript), data queries / rendering in components
- [Apollo](https://www.apollographql.com/docs/react/), GraphQL query manager
- [Vercel PFB](https://vercel.com/people-for-bikes/pfb-nextjs), hosting / CI pipeline

We're also starting to use Tailwind and Typescript, h/t to [@sandren](https://github.com/sandren) for getting that going!

### Environmental Variables

All environmental variables are supposed to be stored in `.env.local`. By default, they will be made available to the Node.js application powering the static site generation. Read more about [Next.js Environmental Variables](https://nextjs.org/docs/basic-features/environment-variables). Vercel lets you set the production ones in their [hosting UI](https://vercel.com/people-for-bikes/pfb-nextjs/settings/environment-variables).

If you need the variables, contact the project lead.

### HTTPS Locally

Next.js does not support HTTPS locally, which is a problem if you want to authenticate into the gated part of the site (Member Center) and do work there. 

You can get around this issue by using `local-ssl-proxy`. This utility proxies the Next app and applies a TLS cert at another localhost port for your use. Follow these instructions to get your app setup:

#### From your CLI, confirm you are using:

- the correct version of Node for this project (`v16.x` as of 2022-06) and that 
- you have [Homebrew](https://brew.sh/) installed.
- you are in this application's folder on your local machine (should be `pfb-nextjs`)

#### Installation procedure:

- `npm install -g local-ssl-proxy` (installs the local-ssl-proxy into your node env)
- `brew install mkcert certutil` (installs certificate generation utilities locally)
- `mkcert -install` (sets up registries with browsers and the certificate store)
- `mkcert localhost` (creates `.pem` files for localhost, in the root pfb-nextjs folder)

#### Running HTTPS version of the app

- start `yarn dev` in a CLI instance (starts app at `localhost:3001`)
- in another CLI instance, run `yarn dev-https`, which will trigger `local-ssl-proxy` to proxy at `localhost:4001`)
- open the site in Chrome, Firefox or Safari and it should show up without any warnings ;)

### Site Structure

Next.js has some key files and folders that contain set up that is important for the functionality of this site:

- [`/pages/`](https://nextjs.org/docs/basic-features/pages) will render any function from a `.js` as a page. The folder structure used in the folder will be emulated in the client's browser. So, if you put a page at `/pages/about/`, you'll see a page at `http://localhost:3000/about`. There are two special files in the `/pages/` directory...

- [`/pages/_document.js`](https://nextjs.org/docs/advanced-features/custom-document) is a place where we can modify the default behaviors of `<html>` and `<body>` tags on the site. But it also controls how we set up `styled-components` for this project. This code is heavily commented, please read through it if you want to understand how it works.

- [`/pages/_app.js`](https://nextjs.org/docs/advanced-features/custom-app) is a container that controls page rendering across the site. Global CSS goes into the `theme` object and uses styled-components `ThemeProvider` for availability across all components. [`nextjs/head`](https://nextjs.org/docs/api-reference/next/head) plugin is used to define what we need in the head of document, which contains our custom fonts, metadata, etc.

- [`/public/`](https://nextjs.org/docs/basic-features/static-file-serving). All static file serving (fonts, images, etc) have to go in the `public` folder. You can then import then like everything else in a React project.

- [`/lib`](https://github.com/PeopleForBikes/pfb-nextjs/tree/master/lib). Integrations and utilities can be found in the `lib` folder. Please reference this folder before building additional functionality (it may already be in here)!

## Data

Almost all the data for this site comes from the [Prismic PFB Repo](https://peopleforbikes.prismic.io/) and we are using the well-documented [prismic-javascript](https://github.com/prismicio/prismic-javascript) utility to make data requests. All queries are using GraphQL and can be found in the `/lib/queries` folder of the app.

### Querying Prismic

Prismic is a headless CMS product the structures all PFB data into [Prismic types](https://peopleforbikes.prismic.io/masks/) we've predefined in the CMS (follow that link to see them all). When you're querying Prismic, you need to know which type you data from to use their [GraphQL endpoint](https://peopleforbikes.prismic.io/graphql). 

Most page-based queries for Prismic should have the following:

- wrap in an exported, named `async` function, that Next.js will later ingest in `getStaticProps`
- pass two variables passed into function: 1) `uid` (page ID); 2) `lang` (usually `en-us`)
- inside of the function, you want to `await` the custom `fetchAPI()` function, which is where you will call your named query (and that query will typically accept the params from the function)


Example page-based query (from `/lib/queries/careers.js`):
```js
import { fetchAPI, API_LOCALE } from '../api'

/**
  * getSingleCareer()
  * 
  * Gives us a single career entry back, depends on what you pass in as variables
  */
 export async function getSingleCareer(uid, previewData) {
  const data = await fetchAPI(`
    query CareerByUID($uid: String!, $lang: String!) {
      job(uid: $uid, lang: $lang) {
        title
        posting
        _meta {
          id
          uid
          type
        }
      }
    }
  `,
    {
      previewData,
      variables: {
        uid,
        lang: API_LOCALE,
      },
    }
  )

  return data
}
```

Notes on queries:

- All queries to Prismic should be in GraphQL but their GQL endpoint is in beta. Some queries need REST but it's rare.

- This site has a lot of relational data, which Prismic makes accessible through GraphQL unions mostly. Often when you query a type, you'll need to add GraphQL unions to reach across the different types. They'll look like `...on type_name {}` in the queries (you can see a number of unions in the example above)

- **Querying for links is hard in a headless environment**, mostly because of all the GraphQL unions. Please use `allLinkFields` in [`/lib/queries/fragments.js`](https://github.com/PeopleForBikes/pfb-nextjs/blob/master/lib/queries/fragments.js) if you need to query a link. This fragment checks all possible types for you (this will save you later inside of components).

- Prismic uses a concept called ['slices'](https://prismic.io/docs/core-concepts/slices), which are repeatable content blocks shared between types (they're also queried with GraphQL unions). They'll always show up in the `body` area of the query. This site makes heavy use of them. This is the 'Prismic way' and takes a minute to wrap your head around.


### Server-Side Data Fetching

Most of the time in a CMS-driven Next app, you want to use server-side data calls and pre-render pages for production. You'll want to use [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation) with [`getStaticPaths`](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation) in our page template files to get data. Below is a walk-through of that process.

#### `getStaticProps`

The idea of `getStaticProps` is to alert Next.js and let it know to prerender this page at site build time rather than wait for the user to access it to be created. This speeds things up for users tremendously. `getStaticProps` function gets called at site build time to pull the data into this component and then sends it to be rendered. A heavily documented example:

#### `getStaticPaths`

Anytime you are using `getStaticProps` to render static pages, you have to tell Next what paths are going to be rendered before it can actually render them. That's what [`getStaticPaths`](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation) does - it gives Next those paths as an array of params objects that define the paths. 

An example that builds on the example above (`/pages/careers/[uid].js`):

```js
import { getAllCareers, getSingleCareer } from "../../lib/queries/careers";

/**
 * Basic getStaticProps definition
 * @param {object} context - contains keys that aid Next in prerendering
 * 
 * The getStaticProps context object contains these keys (if you need them):
 * @param {object} params - route params (if you're rendering a bunch of pages for example)
 * @param {boolean} preview - true if page is in preview, false is not preview
 * 
 * getStaticProps will return an object with:
 * @param {object} props - typical React props to send down into the page component
 * @param {string} revalidate - time (in seconds) after which page regen occurs
 * 
 */


// CareerPage gets `pages` from getStaticProps below
function CareerPage( {page} ) {
  return(
    <>
      // Map over n pages coming in from getStaticProps
      { page.map( (p) => {
        <h1>{p.title}</h1>
      })}
    </>
  )
}

export async function getStaticProps({ params, preview = false, previewData }) {
  const pageData = await getSingleCareer(params.uid, previewData);

  return {
    props: {
      preview,
      page: pageData ?? null,
    },
    revalidate: 60,
  }
}

export async function getStaticPaths() {
  const allCareers = await getAllCareers();
  return {
    paths: allCareers?.map(({ node }) => `/careers/${node._meta.uid}`) || [],
    fallback: false,
  }
}
```

### Component Level Data

If you need to get data at the component level, it's best to use Apollo's [`useQuery`](https://www.apollographql.com/docs/react/api/react/hooks/#usequery) for that purpose. This actually fetches data client-side, and slips past Next's SSR mechanisms. A good use case for this is a global menu element or a search tool - something that appears on every page but has live data in it. 

How this works in practice is:

- Set up your GraphQL query like you would elsewhere in the app
- Import into a component, preferably in the `/components/global/` folder
- Use Apollo's `useQuery` to fetch/process the query and store the data
- Ingest data into components like any client-side React normally does

Truncated example from `components/global/navbar.js` where the main menu dropdowns get created using this method:
```js
import { useQuery } from '@apollo/client'
import { MENU_DATA } from '../../lib/apollo/menu-queries'

function NavBar() {
  const { data: advocacyData } = useQuery(MENU_DATA, {
    variables: {
      "uid": "advocacy-menu",
      "lang": "en-us"
    }
  })

  return (
    <>
      <Dropdown 
        data={ advocacyData }
      />
    </>
  )
}
```

### Routing

You can also do [dynamic routing](https://nextjs.org/docs/routing/dynamic-routes) by wrapping the file name inside the `/pages/` folder in brackets (ie, `/pages/page/[uid].js`) and accessing Next's router. Next will automatically apply the template to all page params it finds in `getStaticPaths` and statically build those out. Next's routing is so good you mostly just don't have to think about it ;)

## Styling

This site makes heavy use of [`styled-components`](https://styled-components.com/docs/basics) for styling. This is component-scoped, CSS-in-JS solution that creates a template literal component for each HTML element. The components usually sit atop a larger component with a render method:

```js
import React from "react"
import styled from "styled-components"

// This is the styled-component, notice how it extends the styled obj from `styled-components`
// The styled object contains ALL HTML elements and you immediately attach a template literal to that object, which will get processed during build time
const Heading = styled.h1`
  margin: 4vh 0;
  padding: 0;
  text-transform: uppercase;

  @media (min-width: ${props => props.theme.lg}) {
    padding: 0;
  }
`
// Simply call the component inside your return to use the styled-components
// It will get the style bundle attached it to automatically by styled-components during build time
const Heading1 = ({ children }) => {
  return (
    <>
      <Heading>
        { children }
      </Heading>
    </>
  )
}

export default Heading1
```

### Global Styling

Even though we are using `styled-components` heavily, you might still need to style some elements directly in CSS. The site is already setup to allow for this using styled-components [`createGlobalStyle`].

You only have to invoke `createGlobalStyle` once and it's already setup in our project at: `components/styles/global-css.js`. So if you want to do regular old CSS, this is where you put it. Please do not use `@include` for fonts with `createGlobalStyle` - load them into the head

## Components

**This section is a work in progress, as we refactor and clean up our component library.**

### Normal Component Structure

Some high level rules of the road:

- Use functional components and hooks where you can. Classes are ok but only if you really have to do it that way.
- Make components as small as possible. Don't go crazy with this but use it as a general guiding principle. 
- Use `styled-components` as much as possible to scope styling to components. 
- Don't wrap components in `<div>` pairs, use [React Fragment short syntax](https://reactjs.org/docs/fragments.html#short-syntax) instead: `<></>`

### Page Wrapper 

The site is setup to contain all the basic UI chrome in `components/global/wrapper.js`. This is where the header, footer, main content and all the rest come from. If you want global functionality, this is typically where you will include it.

### Imagery

This site now makes use of [`next/images`](https://nextjs.org/docs/api-reference/next/image), but not exclusively. next/image optimizes large imagery through Vercel's infrastructure. Here are some rules of thumb for image usage:

- If you want to use **statically** served **JPEG/PNG foreground** image from `public` folder, use next/image's `<Image>` component
- If you want to use **dynamically** served **JPEG/PNG background** image from `public` folder, use `<BgImage>` custom component (which uses <Image> under the hood)
- If you want to use **statically** served **SVG foreground** image from `public` folder, just import it and use with html `<img>`. SVG graphics don't gain from the next/image approach.
- 

Foreground Image using `<Image>`:
```js
import Image from "next/image"
import Banner from "../../public/promo/take-action-banner.jpg";

const ExampleComponent = () => {
  return(
    <>
      <Image
        alt="Take Action Banner"
        src={ Banner }
        quality={ 80 }
        width={ 1600 }
        height={ 800 }
      />
    </>
  )
}
```

Background Image using `<BgImage>` (notice how you can pass items through, an control sizing with the BgImage component):
```js
import BgImage from "../components/primitives/bg-image.js"
import Banner from "../../public/promo/take-action-banner.jpg";

const ImageSquare = ({
  source
}) => {
  return (
    <BgImage
      alignItems="center"
      height='450px'
      heightTablet='450px'
      heightDesktop='450px'
      imgsrc={ source }
      justifyContent="center"
      quality={ 80 }
      width={ '100%' }
    >
      <h2>Hey there!</h2>
    </BgImage>
  )
}
```

## Integrations

This site integrates with a number of third-party tools. All of the integrations can be found in the `/lib` folder. Any future integration tool should get it's own subfolder inside of `/lib`.

### Algolia

Algolia is a cloud-based search indexing tool. It's fantastic and it mostly just works for our purposes. The biggest caveat is that you have to get the data in the shape that Algolia wants. Generally, we have set this up already and you don't have to think about it.

But if you structurally change the data in the application, add slices in Prismic, or add new types, you'll need to reconfigure how the search indexer works. We have a [separate doc about Algolia data shapes](/lib/algolia/readme.md) that you should read before doing this work. 

Most of the Algolia data formatters in the application rearrange data to match a singular shape, referenced in that doc above. Here's an example of how we do a transform (notice how we first take complex nested data and flatten it out - that's the general idea of each formatter): 

```js
import { linkResolver } from '../utils'
import { dateFormatter } from '../utils/dateFormatter'

/**
 * topicConcat()
 * 
 * Desc: takes full `node` data from topics, build single text blob for algolia
 * We're looking for the `intro` and `body` keys specifically
 * This is used to upload to Algolia so search has a singular content block to index
 * 
 * @param { array } content - expects rich text field from Prismic
 */
const topicConcat = (content) => {
  const contentBlob = []

  content.intro && contentBlob.push(content.intro)
  content.body && ( 
    content.body.map( (slice) => {
      return(
        <>
         { slice.primary && contentBlob.push(slice.primary.long_name) }
         { slice.fields && slice.fields.map( (item) => {
            return(
              contentBlob.push(item.sub_pillar, item.sub_pillar_summary)
            )
          })}
        </>
      )
    })
  ) 

  // returns nested text joined together into a string
  // this is how algolia wants content, so that's how we're doing it
  return contentBlob.join(' ')
}

/**
 * topicFormatter()
 * 
 * Desc: takes full `node` data from topics, makes nodes consistent with algolia shape
 * See readme.md in this folder for generalized information about what's going on below.
 * 
 * @param { array } payload - expects prismic data dump
 */
export function topicFormatter(payload) {
  const formattedPayload = []

  if ( payload.length > 1 ) {
    payload.map( item => {

      // Build object
      formattedPayload.push({
        title: `${item.node.title[0].text} - Landing Page`,
        objectID: item.node._meta.id,
        path: `https://www.peopleforbikes.org${linkResolver(item.node._meta)}`,
        type: "Topics & Policy",
        content: topicConcat(item.node),
        date: dateFormatter(item.node._meta.lastPublicationDate).unixTime,
        topics: [ item.node.title[0].text ],
        locations: null
      })

    })
  }

  return formattedPayload

}

```


### Stripe

TBD

### Salesforce

TBD