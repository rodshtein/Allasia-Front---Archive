import { client }  from '../../tinyClient';
import { WIKI } from './queries';

export async function get(req, res, next) {

	const DATA = await client(WIKI);

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(DATA.allWikiSections));

}