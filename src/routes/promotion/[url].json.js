import { client }  from '../../tinyClient';
import { PROMOMOTION } from './queries';

export async function get(req, res, next) {

	let DATA = await client(
		PROMOMOTION,
		{ url: req.params.url }
	);

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(DATA.allPromotions[0]));
}