import ApiFetchCountries from './fetchCountries';
import refs from './refs';
import setCountries from '../templates/list_countries.hbs';
import oneCountries from '../templates/one_country.hbs';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core';
import { defaults } from '@pnotify/core';
import debounce from 'lodash.debounce';

defaults.delay = 2000;

const apiFetchCountries = new ApiFetchCountries();

refs.searchForm.addEventListener('input', debounce(onSearch, 500));

async function onSearch(e) {
    e.preventDefault();
    apiFetchCountries.query = e.target.value;
    cleanMarkup();
    
    try {
        if (apiFetchCountries.query.length < 2) {
            return error({
                text: "Please enter a more specific query!"
            });
        } else {
            // apiFetchCountries.fetchCountrie().then(dataResponce => {
            const fetchResponce = await apiFetchCountries.fetchCountrie();
            console.log(fetchResponce);
   
            if (fetchResponce.length <= 10 && fetchResponce.length > 1) {
                // cleanMarkup();
                // console.log(dataResponce);

                const markup = setCountries(fetchResponce);
                return createMarkup(markup);
            }
            if (fetchResponce.length === 1) {
                cleanMarkup();
                const { name, capital, population, languages, flag } = fetchResponce[0];
                const markup = oneCountries({ name, capital, population, languages, flag });
                // data.map(({ name, capital, population, languages, flag }) =>
                // oneCountries({ name, capital, population, languages, flag }))
                return createMarkup(markup);
                // console.log(dataResponce[0]);
            }
            if (fetchResponce.length > 10) {
                // cleanMarkup();
                return error({
                    text: "Too many matches found. Please enter a more specific query!"
                });
            }
            if (fetchResponce.status === 404) {
                return error({
                    title: "Error",
                    text: "No country has been found. Please enter a more specific query!"
                });
            
            }
        }
    } catch (error) {
        return error({
            title: "Error",
            text: "Please enter a query!"
        });
    }
}


   
    
        
    


   


function cleanMarkup() {
    refs.listCountries.innerHTML = '';
    };


function createMarkup(markup) {
refs.listCountries.insertAdjacentHTML('beforeend', markup);
};
 