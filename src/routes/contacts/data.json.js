import { client }  from '../../tinyClient';
import { CONTACTS } from './queries';

export async function get(req, res, next) {

	const DATA = await client(CONTACTS);

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(DATA.allContactCountries));

}