import API from './fetchCountries';
import refs from './refs';
import setCountries from '../templates/list_countries.hbs';
import oneCountries from '../templates/one_country.hbs';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
var debounce = require('lodash.debounce');

refs.searchForm.addEventListener('input', debounce(onSearch, 1000));
function onSearch(e) {
    e.preventDefault();
    const sourchName = e.target.value;
    

    API.fetchCountries(sourchName).then(data => {
        if (data.length <= 10 && data.length > 1) {
            refs.listCountries.innerHTML = '';
            return refs.listCountries.insertAdjacentHTML('beforeend', setCountries(data));
        }
        if (data.length === 1) {
            refs.listCountries.innerHTML = '';
            const markup = data.map(({ name, capital, population, languages, flag }) =>
                oneCountries({ name, capital, population, languages, flag }))
            return refs.listCountries.insertAdjacentHTML('beforeend', markup)
        }
        if (data.length > 10) {
            refs.listCountries.innerHTML = '';
           
        }
    
    }).catch(error => {
        refs.listCountries.innerHTML = '';
        console.log('введите название страны')
    });
}
