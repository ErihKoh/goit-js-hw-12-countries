const BASE_URL = 'https://restcountries.eu/rest/v2/name';



//    async function fetchCountries(sourchName) {
//       const fetchResponce = await fetch(`${BASE_URL}/${sourchName}`);
//        const dataResponce = await fetchResponce.json();
//        return dataResponce;
//     }


// export default { fetchCountries };

export default class ApiFetchCountries {
    constructor() {
        this.sourchName = '';
    }

     async  fetchCountrie() {
      const fetchResponce = await fetch(`${BASE_URL}/${this.sourchName}`);
       const dataResponce = await fetchResponce.json();
       return dataResponce;
    }

    get query() {
        return this.sourchName;
    }
    set query(newSourchName) {
        this.sourchName = newSourchName;
    }
}



 
