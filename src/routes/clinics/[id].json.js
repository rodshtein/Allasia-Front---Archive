import { client }  from '../../tinyClient';
import { CLINIC_PAGE } from './queries';

export async function get(req, res, next) {
  let DATA = await client(
    CLINIC_PAGE,
    { id: req.params.id }
  );

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(DATA.Clinic));

}