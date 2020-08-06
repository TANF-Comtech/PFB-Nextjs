The new People for Bike site is a [Next.js](https://nextjs.org/) project using [`styled-components`](https://styled-components.com/docs) for CSS, [`Apollo`]((https://www.apollographql.com/docs/react/)) for data-fetching/state management and [Prismic.io](https://peopleforbikes.prismic.io/) as our headless CMS.

## Getting Started

If you haven't run this project before, use `yarn` and Node `v12.x`. This project will likely move over to Node `v14.x` but as of 2020-06 we're sticking with `v12`. 

To get started, make sure your running right version of Node and then run `yarn` and install dependencies:
```bash
node -v # should show v12.x.x, recommend using nvm 
yarn install # should output a bunch of install scripts, ignore warnings
yarn dev # starts the dev server
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result (`create-next-app` will sometimes put your server at port `3001`, `3002` if you have something else running - check your CLI output).

## Tooling

Make sure you have a high-level understanding of the tooling being used:

- [`styled-components`](https://styled-components.com/docs)
- [`Apollo`]((https://www.apollographql.com/docs/react/))
- [Prismic.io](https://peopleforbikes.prismic.io/)

## Environmental Variables

All environmental variables are supposed to be stored in `.env.local`. By default, they will be made available to the Node.js application powering the static site generation. Read more about [Next.js Environmental Variables](https://nextjs.org/docs/basic-features/environment-variables).

## Site Structure

Next.js has some key files and folders that contain set up that is important for the functionality of this site:

- [`/pages/_document.js`](https://nextjs.org/docs/advanced-features/custom-document) is a place where we can modify the default behaviors of `<html>` and `<body>` tags on the site. But it also controls how we set up `styled-components` for this project. This code is heavily commented, please read through it if you want to understand how it works.

- [`/pages/_app.js`](https://nextjs.org/docs/advanced-features/custom-app) is a container that controls page rendering across the site. Global CSS goes into the `theme` object and uses styled-components `ThemeProvider` for availability across all components. [`nextjs/head`](https://nextjs.org/docs/api-reference/next/head) plugin is used to define what we need in the head of document, which contains our custom fonts, metadata, etc.

- [`/pages/`](https://nextjs.org/docs/basic-features/pages) will render any function from a `.js` as a page. The folder structure used in the folder will be emulated in the client's browser. So, if you put a page at `/pages/about/`, you'll see a page at `http://localhost:3000/about`. You can also do [dynamic routing](https://nextjs.org/docs/routing/dynamic-routes) by wrapping the file name in brackets (ie, `/pages/about/[uid].js`) and accessing Next's router:

```jsx
import { useRouter } from 'next/router'

const Post = () => {
  const router = useRouter()
  const { pid } = router.query

  return <p>Post: {pid}</p>
}

export default Post
```

- [`/public/`](https://nextjs.org/docs/basic-features/static-file-serving). All static file serving (fonts, images, etc) have to go in the `public` folder. You can then import then like everything else in a React project.

## Data Fetching

TBD

## Data Processing / Rendering

Next can do both static and server-side rendering once data has been fetched. They are competing strategies we can use in different parts of the app. If the content is static (and most of a CMS-driven site usually is), we want to use [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation) with [`getStaticPaths`](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation) in our page template files MOST of the time.

### `getStaticProps`

The idea of `getStaticProps` is to alert Next.js and let it know to prerender this page at site build time rather than wait for the user to access it to be created. This speeds things up for users tremendously. `getStaticProps` function gets called at site build time to pull the data into this component and then sends it to be rendered. A heavily documented example:

```js
/**
 * Basic getStaticProps definition
 * @param {object} context - contains keys that aid Next in prerendering
 * 
 * The getStaticProps context object contains these keys:
 * @param {object} params - route params (if you're rendering a bunch of pages for example)
 * @param {boolean} preview - true if page is in preview, false is not preview
 * 
 * getStaticProps will return an object with:
 * @param {object} props - typical React props to send down into the page component
 * @param {string} revalidate - time (in seconds) after which page regen occurs
 * 
 * Example
 */
// Page gets `pages` from getStaticProps below
function Page( {pages} ) {
  return(
    <>
      // Map over n pages coming in from getStaticProps
      { pages.map( (page) => {
        <h1>{page.title}</h1>
      })}
    </>
  )
}

export async function getStaticProps(context) {
  const data = await getBasicPages() // example 

  return {
    props: {}, // IMPORTANT - these will be passed to the page component as props!
    revalidate: 1, // in seconds - Next will regenerate the page when a request comes in, at most once a second
  }
}
```

## Component Styling

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

## Global Styling

Even though we are using `styled-components` heavily, you might still need to style some elements directly in CSS. The site is already setup to allow for this using styled-components [`createGlobalStyle`].

You only have to invoke `createGlobalStyle` once and it's already setup in our project at: `components/styles/global-css.js`. So if you want to do regular old CSS, this is where you put it. Please do not use `@include` for fonts with `createGlobalStyle` - load them into the head

## Page Wrapper 

The site is setup to contain all the basic UI chrome in `components/global/wrapper.js`. This is where the header, footer, main content and all the rest come from. If you want global functionality, this is typically where you will include it.

## Component Structure

Some high level rules of the road:

- Use functional components and hooks where you can. Classes are ok but only if you really have to do it that way.
- Make components as small as possible. Don't go crazy with this but use it as a general guiding principle. 
- Use `styled-components` as much as possible to scope styling to components. 
- Don't wrap components in `<div>` pairs, use [React Fragment short syntax](https://reactjs.org/docs/fragments.html#short-syntax) instead: `<></>`


