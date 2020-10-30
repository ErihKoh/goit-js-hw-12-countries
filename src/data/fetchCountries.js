const BASE_URL = 'https://restcountries.eu/rest/v2/name';



    function fetchCountries(sourchName) {
        return fetch(`${BASE_URL}/${sourchName}`).then(r => r.json(),);
    }



export default { fetchCountries };
