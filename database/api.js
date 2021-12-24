
const Globe = require('./models/countries')
const axios = require('axios')
const { translator, jsonExporter } = require('../utils')

const { cityModel } = require('./structure')

exports.fillTheDataBaseFromTheApi = async () => {
    const url = await translator.translate(process.env.COUNTRIES_API_URL);
    let structuredModel;
    await axios.get(url)
        .then(response => {
            jsonExporter.exporter(response.data, "countries.json")
            structuredModel = cityModel(response.data)
            jsonExporter.exporter(structuredModel, "structured.json")
            Globe.find({}, '-_id', (err, entity) => {
                if (entity.length != 0) {
                    console.log(`there is ${entity.length} country in the db`,)
                    // update db from api response
                    // ..
                    return entity
                } else {
                    // filling the db with structured data
                    Globe.insertMany(structuredModel, (err, doc) => {
                        if (err) { console.log(err) }
                    });
                    console.log(`${structuredModel.length} country inserted`)
                    return structuredModel
                }
            });
        })
        .catch(error => error)
}

