import * as sapper from '@sapper/app';
import { chatIsLoaded } from './components/stores/Store-chat.js';
import { country } from './components/stores/Store-country.js';

sapper.start({
  target: document.querySelector('#sapper')
}).then(() => {

    if(process.env.NODE_ENV !== 'development') {
    // Add chat
    function t(t){
      return function(){
        window.carrotquestasync.push(t,arguments)
      }
    }

    if("undefined"==typeof carrotquest){
      window.carrotquest = {};
      window.carrotquestasync = [];
      carrotquest.settings = {};
      let param = ["connect","track","identify","auth","oth","onReady","addCallback","removeCallback","trackMessageInteraction"];

      for(let i = 0; i < param.length; i++) {
        carrotquest[param[i]] = t(param[i])
      }
    }

    carrotquest.connect("45084-31213486d3e99d90718f71daf8");

    let script = document.createElement('script');
    script.async = true;
    script.src = '//cdn.carrotquest.app/api.min.js';
    document.head.appendChild(script);

    carrotquest.onReady(() => {
      chatIsLoaded.set(true)
      country.set(carrotquest.data.user.country)
    });
  }
});


