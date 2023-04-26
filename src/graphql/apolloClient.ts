import { ApolloClient, InMemoryCache } from "@apollo/client";

const NHOST_ADMIN_SECRET = process.env.NHOST_ADMIN_SECRET
const NEXT_PUBLIC_NHOST_GRAPHQL_URL = process.env.NEXT_PUBLIC_NHOST_GRAPHQL_URL
export const apolloClient = new ApolloClient({
  
  uri: NEXT_PUBLIC_NHOST_GRAPHQL_URL,
  cache: new InMemoryCache(),headers:{
    "Content-Type": "application/json",
    "x-hasura-admin-secret": NHOST_ADMIN_SECRET!
  }
});