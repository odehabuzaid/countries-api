const Globe = require('./models/countries')
const axios = require('axios')
const { translator, jsonExporter } = require('../utils')

const { countryModel } = require('./structure')

exports.fillTheDataBaseFromTheApi = async () => {
  const url = await translator.translate(process.env.COUNTRIES_API_URL)
  let structuredModel = []
  await axios
    .get(url)
    .then((response) => {
      jsonExporter.exporter(response.data, 'countries.json')
      structuredModel = countryModel(response.data)
      jsonExporter.exporter(structuredModel, 'structured.json')
      Globe.find({}, '-_id', (err, docs) => {
        if (docs.length != 0) {
          console.log(`there is ${docs.length} country in the db`)
          // update db from api response
          // ..
          return docs
        } else {
          // filling the db with structured data
          Globe.insertMany(structuredModel, (err) => {
            if (err) {
              console.log(err)
            }
          })
          console.log(`${structuredModel.length} country inserted`)
          return structuredModel
        }
      })
    })
    .catch((error) => console.log(error))
}
