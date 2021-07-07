## Looking for the Menu queries?

I debated where to put them for a long time. Technically they are queries of Prismic data but most of our Prismic queries are handled through `getStaticProps` in Next. The menus use Apollo, so I put those queries in `lib/apollo` and added this note. Felt like the best of both worlds.