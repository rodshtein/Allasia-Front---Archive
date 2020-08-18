import { ApolloClient, InMemoryCache, HttpLink } from "apollo-boost";
import nodeFetch from "node-fetch";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "https://tildateamtop.ru/admin/api",
  fetch: nodeFetch,
});

export const apollo = new ApolloClient({
  cache,
  link,
});
