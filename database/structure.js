'use strict'

exports.cityModel = json => json.map(country => {

    return {
        name: country.name,
        languages: country.languages,
        codes: { cca2: country.cca2, cca3: country.cca3, ccn3: country.ccn3 },
        currencies: country.currencies,
        region: country.region,
        latlng: country.latlng
    }
})