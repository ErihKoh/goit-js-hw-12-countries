import API from './fetchCountries';
import refs from './refs';
import setCountries from '../templates/list_countries.hbs';
import oneCountries from '../templates/one_country.hbs';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { alert, defaultModules } from '@pnotify/core';

const debounce = require('lodash.debounce');

refs.searchForm.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
    e.preventDefault();
    const sourchName = e.target.value;
    

    API.fetchCountries(sourchName).then(data => {
        if (data.length <= 10 && data.length > 1) {
            cleanMarkup();
            return refs.listCountries.insertAdjacentHTML('beforeend', setCountries(data));
        }
        if (data.length === 1) {
            cleanMarkup();
            const markup = data.map(({ name, capital, population, languages, flag }) =>
                oneCountries({ name, capital, population, languages, flag }))
            return refs.listCountries.insertAdjacentHTML('beforeend', markup)
        }
        if (data.length > 10) {
            refs.listCountries.innerHTML = '';
           alert('введите название страны');
        }
    
    }).catch(error => {
        cleanMarkup();
        console.log('введите название страны')
    });
}

function cleanMarkup() {
    refs.listCountries.innerHTML = '';
}