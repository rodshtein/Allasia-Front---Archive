import { client }  from '../../tinyClient';
import { PROMO_PAGES } from './queries';

export async function get(req, res, next) {

	const DATA = await client(PROMO_PAGES);

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(DATA.allPromotions));

}