import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import geoip from 'geoip-lite';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

function getLocation(req){
	let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
	let geo = geoip.lookup(ip);
	// console.log(ip.split(`:`).pop())
	return geo
}

polka()
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware({
			session: (req) => ({
				geo: getLocation(req)
			})
		})
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
