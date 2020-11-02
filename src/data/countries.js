import API from './fetchCountries';
import refs from './refs';
import setCountries from '../templates/list_countries.hbs';
import oneCountries from '../templates/one_country.hbs';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core';
import { defaults } from '@pnotify/core';

const debounce = require('lodash.debounce');

defaults.delay = 2000;



refs.searchForm.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
    e.preventDefault();
    const sourchName = e.target.value;
     cleanMarkup();
    
 if (sourchName.length < 2) {
     return error({
              text: "Please enter a more specific query!"
          });
 } else {
      API.fetchCountries(sourchName).then(data => {
        
        if (data.length <= 10 && data.length > 1) {
            // cleanMarkup();
            const markup = setCountries(data);
            return createMarkup(markup);
        }
        if (data.length === 1) {
            cleanMarkup();
            const { name, capital, population, languages, flag } = data[0];
            const markup = oneCountries({ name, capital, population, languages, flag });
            // data.map(({ name, capital, population, languages, flag }) =>
                // oneCountries({ name, capital, population, languages, flag }))
            return createMarkup(markup);
            // console.log(data[0])
        }
        if (data.length > 10) {
            // cleanMarkup();
            return error({
              text: "Too many matches found. Please enter a more specific query!"
          });
        }
        if (data.status === 404) {
            return error({
                title: "Error",
                text: "No country has been found. Please enter a more specific query!"
            });
        }
        
    
    }).catch(err => {
        // cleanMarkup();
        return error({
                title: "Error",
                text: "Please enter a query!"
         });
        
        
    });
    }
   
}

function cleanMarkup() {
    refs.listCountries.innerHTML = '';
}


function createMarkup(markup) {
refs.listCountries.insertAdjacentHTML('beforeend', markup);
};
 