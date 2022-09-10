import "styles/globals.scss";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import type { AppProps } from "next/app";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000/graphql",
});

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ApolloProvider client={client}>
    <Component {...pageProps} />
  </ApolloProvider>
);

export default MyApp;
