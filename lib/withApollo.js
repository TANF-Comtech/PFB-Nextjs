/****
 * PrismicLink is the only differing dependency from what Next-with-Apollo requested.
 * I've basically put in all the required dependencies here in a sort of hybrid way.
 * I know not the best explanation, but that's because I don't understand it that well myself
 * yet.....
 *
 * I'm not super sure which documentation to follow right now. What I've done so far is this....
 * I've applied Next-with-Apollo, and then applied the PrismicLink to it: https://www.npmjs.com/package/next-with-apollo
 * My problem is that I'm not sure whether or not we need a prismic-configuration.js file in the root like this documentation is specifying: https://prismic.io/docs/reactjs/getting-started/prismic-nextjs
 *
 * I guess really what I need to know is whether I need to also set it up so so that Next and Prismic play nice, or just Apollo and Prismic do.
 *
 *
 *
 * I think I might need to configure Next with Prismic, the same way I configured Next with Apollo.....
 * OMG Idk what to do 🤯🤯🤯🤯🤯🤯🤯🤯🤯🤯🤯🤯🤯🤯🤯🤯🤯🤯🤯🤯🤯
 ****/
import { PrismicLink } from "apollo-link-prismic";
import withApollo from "next-with-apollo";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

export default withApollo(
  ({ initialState }) => {
    return new ApolloClient({
      /****
       * The prismic link here doesn't follow what the Next-with-Apollo docs
       * showed. I hope I'm not breaking it.
       *****/
      link: PrismicLink({
        uri: "https://peopleforbikes.prismic.io/graphql",
      }),
      cache: new InMemoryCache().restore(initialState || {}),
    });
  },
  {
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    },
  }
);
