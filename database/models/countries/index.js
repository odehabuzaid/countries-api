const mongoose = require('mongoose');

const Country = new mongoose.Schema({
    name: {
        common: String,
        official: String,
        nativeName: Object
    },
    languages: Object,
    codes: { cca2: String, cca3: String, ccn3: String },
    currencies: Object,
    region: String,
    latlng: [[[Number]]]
})

const Globe = mongoose.model('countries', Country);

module.exports = Globe;