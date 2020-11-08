import ColorThief from 'colorthief/dist/color-thief.mjs'

// sources
// https://bgrins.github.io/TinyColor/
// https://vis4.net/chromajs/


export function colorFilter(node, url){

  const colorThief = new ColorThief();
  const img = new Image();

  img.crossOrigin = 'Anonymous'
  img.src = url

  img.addEventListener('load', function() {
    let color = colorNormalize(colorThief.getColor(img));

    node.style.backgroundImage = `
      linear-gradient(
        105.3deg,
        rgb(${color}) 0%,
        rgba(${color}, 0.5) 60%,
        rgba(${color}, 0) 108.76%
      ),
      url(${url})`
    })
}

function colorNormalize(rgb){
  let color = rgb;
  let range = 10;

  function normalize(){
    if( getLightnessOfRGB(color) > 0.3 && 0 < range ) {
      const rgbToLightness = (r,g,b) =>
          1/2 * (Math.max(r,g,b) + Math.min(r,g,b));
      console.log(rgbToLightness(color[0],color[1], color[2]))
      console.log(getLightnessOfRGB(color))
      color = darkenByTenth(color)
      color = saturateByTenth(color, range--)
      normalize()
    } else {
      return
    }
  }

  normalize()

  return color
}


// source
// https://css-tricks.com/using-javascript-to-adjust-saturation-and-brightness-of-rgb-colors/

function getLightnessOfRGB(rgbString) {
  // Get the highest and lowest out of red green and blue
  const highest = Math.max(...rgbString);
  const lowest = Math.min(...rgbString);

  // Return the average divided by 255
  return (highest + lowest) / 2 / 255;
}

function saturateByTenth(rgb, RANGE = 3) {
  const grayVal = getLightnessOfRGB(rgb)*255;
  const [lowest,middle,highest] = getLowestMiddleHighest(rgb);

  if(lowest.val===highest.val){return rgb;}

  const saturationRange =  Math.round(Math.min(255-grayVal,grayVal));
  const maxChange = Math.min((255-highest.val),lowest.val);
  const changeAmount = Math.min(saturationRange/RANGE, maxChange);
  const middleValueRatio =(grayVal-middle.val)/(grayVal-highest.val);

  const returnArray=[];
  returnArray[highest.index]= Math.round(highest.val+changeAmount);
  returnArray[lowest.index]= Math.round(lowest.val-changeAmount);
  returnArray[middle.index]= Math.round(grayVal+(returnArray[highest.index]-grayVal)*middleValueRatio);
   return returnArray;
}

function getLowestMiddleHighest(rgbIntArray) {
  let highest = {val:-1,index:-1};
  let lowest = {val:Infinity,index:-1};

  rgbIntArray.map((val,index)=>{
    if(val>highest.val){
      highest = {val:val,index:index};
    }
    if(val<lowest.val){
      lowest = {val:val,index:index};
    }
  });

  if(lowest.index===highest.index){
    lowest.index=highest.index+1;
  }

  let middle = {index: (3 - highest.index - lowest.index)};
  middle.val = rgbIntArray[middle.index];
  return [lowest,middle,highest];
}



function darkenByTenth(rgb) {

  //grab the values in order of magnitude
  //this uses the function from the saturate function
  const [lowest,middle,highest]=getLowestMiddleHighest(rgb);

  if(highest.val===0){
    return rgb;
  }

  const returnArray = [];

  returnArray[highest.index] = highest.val-(Math.min(highest.val,25.5));
  const decreaseFraction  =(highest.val-returnArray[highest.index])/ (highest.val);
  returnArray[middle.index]= middle.val -middle.val*decreaseFraction;
  returnArray[lowest.index]= lowest.val -lowest.val*decreaseFraction;

  // Convert the array back into an rgb string
  return returnArray
}