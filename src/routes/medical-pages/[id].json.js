import { client }  from '../../tinyClient';
import { MEDICAL_PAGE } from './queries';

export async function get(req, res, next) {
	
	let DATA = await client(
		MEDICAL_PAGE,
		{ id: req.params.id }
	);

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(DATA.MedicalPage));
}