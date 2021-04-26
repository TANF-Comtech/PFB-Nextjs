# The Algolia Data Formatter
[https://www.algolia.com/doc/guides/sending-and-managing-data/prepare-your-data/](https://www.algolia.com/doc/guides/sending-and-managing-data/prepare-your-data/)

Algolia wants its data index structured in just such a way. This part of the site takes data from Prismic, transforms it for Algolia to match a particular shape. 

At a high level, we want to index all of these nodes from Prismic because they contain the bulk of the content found around the site.

Types:

- topic (all)
- statistic_page (all)
- report (all)
- grants (all)
- news (all)
- locations (all)
- member_content (all)
- landing_page (all)
- electric_bikes (all)
- action_forms (all)
- jobs (all)

The shape of the data we want to send to Algolia should consistently look like this:
```js
[
  {
    title: "",
    content: "",
    path: "",
    uid: "",
    date: "",
    topics: [
      "", "",
    ],
    locations: [
      "", "",
    ],
    image: ""
  }
]
```

Each file you find in this folder takes the primsic types and gets them into this format. 

## Where to call Algolia indexer / formatters?

This is an unresolved question, in a sense. The system currently works as constructed but there isn't clear guidance from Next or Algolia on exactly where to call the indexing agent.

It made sense to call Algolia at build time when the queries get made, so you'll find the calls for each kind of content paired with where those queries get made. They are a little scattershot, and probably should be reconciled into a single at-build-time facility responsible for this. For now, here is a guide:

- topic (`/pages/[uid].js`)
- statistic_page (`/pages/[uid].js`)
- report (`/pages/reports/index.js`)
- grants (`/pages/grants/index.js`)
- news (`/pages/[uid].js`)
- locations (`/pages/[uid].js`)
- electric_bikes (`/pages/grants/index.js`)
- team (TK)
- member_content (TK)
- landing_page (TK)
- action_forms (?)
- jobs (?)


