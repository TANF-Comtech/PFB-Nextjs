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
- member_content (all)
- locations (all)
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

Each file you find in this folder takes the primsic types and gets them into this format. Enjoy the journey.