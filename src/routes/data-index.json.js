import { client }  from '../tinyClient';
import { INDEX_CLINICS, QUOTES } from './queries';

export async function get(req, res, next) {
	const resClinics = await client(INDEX_CLINICS, { first: 10 });
	const resQuotes = await client(QUOTES);

	const DATA = {
		clinics: resClinics.allClinics,
		quotes: resQuotes.allFeedbackQuotes
	}

	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(DATA));
}