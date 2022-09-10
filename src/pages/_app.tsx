import "styles/globals.scss";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

import type { AppProps } from "next/app";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
});

const wsLink =
  typeof window !== "undefined"
    ? new WebSocketLink({
        options: {
          reconnect: true,
        },
        uri: "ws://localhost:4000/graphql",
      })
    : null;

const splitLink =
  typeof window !== "undefined" && wsLink
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === "OperationDefinition" && definition.operation === "subscription"
          );
        },
        wsLink,
        httpLink,
      )
    : httpLink;

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([splitLink]),
});

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ApolloProvider client={client}>
    <Component {...pageProps} />
  </ApolloProvider>
);

export default MyApp;
