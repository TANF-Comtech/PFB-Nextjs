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

## Component Structure

Some high level rules of the road:

- Use functional components and hooks where you can. Classes are ok but only if you really have to do it that way.
- Make components as small as possible. Don't go crazy with this but use it as a general guiding principle. 
- Don't wrap components in `<div>` pairs, use [React Fragment short syntax](https://reactjs.org/docs/fragments.html#short-syntax) instead: `<></>`


