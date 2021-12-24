const Controller = {}

const { groupByLanguage, groupByRegion } = require('./helpers')

const Globe = require('../database/models/countries')
const { response } = require('express')

Controller.countries = async (req, res) => {
  Globe.find({}, '-_id -__v')
    .then((data) => {
      let { code, name, group } = req.query

      if (group == 'languages') {
        const grouped = { languages: { notEntries: [] } }
        groupByLanguage(data, grouped)
        return res.send(grouped)
      }

      if (group == 'region') {
        const grouped = { regions: {} }
        groupByRegion(data, grouped)
        return res.send(grouped)
      }

      if (code) {
        code = code.toUpperCase()
        const country = data.filter(
          (country_) =>
            country_.codes.cca2 == code ||
            country_.codes.cca3 == code ||
            country_.codes.ccn3 == code
        )
        return res.send(country)
      } else if (name) {
        name = name.charAt(0).toUpperCase() + name.slice(1)
        const country = data.filter(
          (country_) =>
            country_.name.common == name || country_.name.official == name
        )
        return res.send(country)
      } else {
        return res.send(data)
      }
    })
    .catch((err) => console.log(err))
}

Controller.currencies = async (req, res) => {
  Globe.find({}, '-_id -__v')
    .then((data) => {
      let { code } = req.query

      if (code) {
        code = code.toUpperCase()
        const currencies = data
          .filter((country_) => country_.codes.cca2 == code)
          .map((country_) => country_.currencies)
        res.send(currencies)
      }
    })
    .catch((err) => console.log(err))
}
Controller.downloadFile = async (req, res) => {
  if ('x-admin' in req.headers) {
    
    res.download('./data/countries.json', (error) => console.log('Error : ', error))
  } else {
    res.status(401).send('You are not authorized')
  }
}

module.exports = Controller
