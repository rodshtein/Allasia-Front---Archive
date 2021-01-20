import createClient from '@fabienjuif/graph-client'
import nodeFetch from "node-fetch";

const cache = new Map();
const client = createClient({
  url: 'https://tildateamtop.ru/admin/api',
  // url: "http://localhost:3001/admin/api",
  fetch: nodeFetch,
  cache: cache,
})

export {
  client,
  cache,
}