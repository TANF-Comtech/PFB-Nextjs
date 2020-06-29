The new People for Bike site is a [Next.js](https://nextjs.org/) project using [`styled-components`](https://styled-components.com/docs) for CSS, [`Apollo`]((https://www.apollographql.com/docs/react/)) for data-fetching/state management and [Prismic.io](https://peopleforbikes.prismic.io/) as our headless CMS.

## Getting Started

If you haven't run this project before, use `yarn` and Node `v12.x`. This project will likely move over to Node `v14.x` but as of 2020-06 we're sticking with `v12`. 

To get started, make sure your running right version of Node and then run `yarn` and install dependencies:
```bash
node -v # should show v12.x.x
yarn install # should output a bunch of install scripts, ignore warnings
yarn dev # starts the dev server
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result (`create-next-app` will sometimes put your server at port `3001`, `3002` if you have something else running - check your CLI output).

Make sure you have a high-level understanding of the tooling be used:

- [`styled-components`](https://styled-components.com/docs)
- [`Apollo`]((https://www.apollographql.com/docs/react/))
- [Prismic.io](https://peopleforbikes.prismic.io/)
