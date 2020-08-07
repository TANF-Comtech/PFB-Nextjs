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
