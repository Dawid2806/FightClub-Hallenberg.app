import { Layout } from "@/Components/Layout/Layout";
import "../styles/globals.css";
import { NhostClient, NhostProvider } from "@nhost/nextjs";
import { NhostApolloProvider } from "@nhost/react-apollo";

import type { AppProps } from "next/app";
import { NewsProvider } from "@/context/NewsContext";
const nhost = new NhostClient({
  backendUrl: process.env.NEXT_PUBLIC_NHOST_BACKEND_URL || "",
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN || "",
  region: process.env.NEXT_PUBLIC_NHOST_REGION,
  graphqlUrl: process.env.NEXT_PUBLIC_NHOST_GRAPHQL_URL,
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <NhostProvider nhost={nhost} initial={pageProps.nhostSession}>
      <NhostApolloProvider nhost={nhost}>
        <NewsProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </NewsProvider>
      </NhostApolloProvider>
    </NhostProvider>
  );
}
