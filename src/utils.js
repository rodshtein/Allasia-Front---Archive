import { ApolloClient, InMemoryCache, HttpLink } from "apollo-boost";
import nodeFetch from "node-fetch";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "https://tildateamtop.ru/admin/api",
  // uri: "http://localhost:3001/admin/api",
  fetch: nodeFetch,
});

export const client = new ApolloClient({
  cache,
  link,
});
