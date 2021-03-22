import * as sapper from '@sapper/app';
import { get } from 'svelte/store';
import { chatIsLoaded } from './components/stores/Store-chat.js';

sapper.start({
  target: document.querySelector('#sapper')
}).then(() => {
  // add chatra
  if(process.env.NODE_ENV !== 'development') {

    window.ChatraID = 'LSqpL2wnNngikEHXG';
    window.ChatraSetup = {
      buttonStyle: 'round',
      colors: {
          buttonText: '#ffffff',
          buttonBg: '#3A33D9'
      },
      onAnalyticEvent: function(eventName) {
          console.log('An event just happend:', eventName);
      }
    };


    let chatra = 'Chatra';
    window[chatra] = window[chatra] || function() {
      (window[chatra].q = window[chatra].q || []).push(arguments);
    };

    let script = document.createElement('script');
    script.async = true;
    script.src = 'https://call.chatra.io/chatra.js';
    document.head.appendChild(script);

    script.onload = function() {
      chatIsLoaded.set(true)
    }
  }

  // Keyboard control
  document.addEventListener( 'keydown', handleKeydown);

  function handleKeydown(e) {
  if (e.keyCode == 27 || e.key === 'Escape' && show) {
      window.Chatra('minimizeWidget')
      return
    }
  }
});


