import { client }  from '../../tinyClient';
import { DOCTOR } from './queries';

export async function get(req, res, next) {
	
	let DATA = await client(
		DOCTOR,
		{ id: req.params.id }
	);

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(DATA.Doctor));
}