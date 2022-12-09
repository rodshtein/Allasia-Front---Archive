import { client }  from '../../tinyClient';
import { CLINICS_COUNTRY_CLINICS } from './queries';

export async function get(req, res, next) {
  const DATA = await client(CLINICS_COUNTRY_CLINICS);

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(DATA.allClinicCountries));

}