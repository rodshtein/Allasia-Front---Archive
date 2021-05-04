import createClient from '@fabienjuif/graph-client'
import fetch from "node-fetch";

let url = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3001/admin/api'
  : 'https://new.allasia.su/admin/api';

const cache = new Map();
const client = createClient({
  url,
  fetch,
  cache,
})

export {
  client,
  cache,
}