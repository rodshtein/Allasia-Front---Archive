import ColorThief from 'colorthief/dist/color-thief.mjs'

// sources
// https://bgrins.github.io/TinyColor/
// https://vis4.net/chromajs/

// this implementation
// https://blog.logrocket.com/how-to-manipulate-css-colors-with-javascript-fb547113a1b8/
// https://codepen.io/AdamGiese/pen/YBaOYX?editors=0010

const rgbToLightness = (r,g,b) => {
	const max = Math.max(r,g,b);
	const min = Math.min(r,g,b);
	return 1/2 * (max + min);
}

const rgbToSaturation = (r,g,b) => {
	const max = Math.max(r,g,b);
	const min = Math.min(r,g,b);
	const l = rgbToLightness(r,g,b);

	return (l === 0 || l === 1) ? 0 : (max - min)/(1 - Math.abs(2 * l - 1));
}

const rgbToHue = (r,g,b) => {
  let hue = Math.round(
    Math.atan2(
      Math.sqrt(3) * (g - b),
      2 * r - g - b,
    ) * 180 / Math.PI
  );

  while (hue < 0) {
    hue = hue + 360;
  }

  return hue;
}

const rgbToHsl = (r,g,b) => {
  const hue = rgbToHue(r,g,b);
  const saturation = rgbToSaturation(r,g,b);
  const lightness = rgbToLightness(r,g,b);

  return [hue, saturation, lightness];
}

const hslToRgb = (h,s,l) => {
	const C = (1 - Math.abs(2 * l - 1)) * s;
	const hPrime = h / 60;
	const X = C * (1 - Math.abs(hPrime % 2 - 1));
	const m = l - C/2;
	const withLight = (r,g,b) => [r+m, g+m, b+m];

	if (hPrime <= 1) { return withLight(C,X,0); } else
	if (hPrime <= 2) { return withLight(X,C,0); } else
	if (hPrime <= 3) { return withLight(0,C,X); } else
	if (hPrime <= 4) { return withLight(0,X,C); } else
	if (hPrime <= 5) { return withLight(X,0,C); } else
	if (hPrime <= 6) { return withLight(C,0,X); }
}


export function colorFilter(node, data){
  const publicUrl = data.publicUrl;
  // const microImgUrl = getMicroImgUrl(publicUrl);

  const colorThief = new ColorThief();
  const img = new Image();
  img.crossOrigin = 'Anonymous'

  img.addEventListener('load', () => {
    // color functions
    let [r,g,b] = colorThief.getColor(img);
    let hue = rgbToHue(r / 255, g / 255, b / 255);
    hue = Math.round(hue || 0);

    [r,g,b] = hslToRgb(hue, .5, .3);
    r = Math.round(r * 255);
    g = Math.round(g * 255);
    b = Math.round(b * 255);

    // set styles
    node.style.backgroundImage = `
      linear-gradient(
        105.3deg,
        rgb(${[r,g,b]}) 0%,
        rgba(${[r,g,b]}, 0.5) 60%,
        rgba(${[r,g,b]}, 0) 108.76%
      ),
      url(${publicUrl})`
  })

  img.src = publicUrl
}

function getMicroImgUrl(url){
  let cord = url.indexOf("upload") + 7;
  return url.slice(0, cord) + 'c_limit,e_blur:100,w_70/' + url.slice(cord)
}