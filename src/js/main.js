'use strict';

import { pathToFileURL } from 'url';

// service worker registration - remove if you're not going to use it

if ('serviceWorker' in navigator) {
   window.addEventListener('load', function() {
      navigator.serviceWorker.register('serviceworker.js').then(
         function(registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
         },
         function(err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
         }
      );
   });
}

// place your code below

const list = document.querySelector('.display__list--js');
const sel = document.querySelector('.selectPos--js');

var wl = 'EUR';
var patch = `https://api.nbp.pl/api/exchangerates/rates/A/${wl}/last/10/?format=json`;

function getAPI (path) {
   fetch(patch)
   .then(resp => resp.json())
   .then(resp => {
     console.log(`Z dnia: ${resp.rates[0].effectiveDate}  kurs PLN:${resp.rates[0].mid}`);
      const kursy = resp;
      var x = 0;
      for (x=0; 9; x++) {
      list.innerHTML += `<li class="display__listPos"> Z dnia: ${resp.rates[9-x].effectiveDate}  ***  kurs PLN: ${resp.rates[9-x].mid} </li>`;
      }
   })
   .catch(err => {
     console.log(err);
   }) 
}

getAPI(patch);


sel.addEventListener('change', e => {
   wl = sel.options[sel.selectedIndex].value;
   patch = `https://api.nbp.pl/api/exchangerates/rates/A/${wl}/last/10/?format=json`;
   console.log(wl);
   list.innerHTML = '';
   getAPI(patch);
})

// place your code below





