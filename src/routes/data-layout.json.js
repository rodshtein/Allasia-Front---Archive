import { client }  from '../tinyClient';
import { BRANCHES } from './queries';
import { CONTACTS } from './contacts/queries';

export async function get(req, res, next) {
  const resContacts = await client(CONTACTS);
  const resBranches = await client(BRANCHES);

  const DATA = {
    contacts: resContacts.allContactCountries,
    branches: resBranches.allMedicalBranches
  }
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(DATA));
}

