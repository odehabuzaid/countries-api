const Controller = {}

const { groupByLanguage, groupByRegion } = require('./helpers')

const Globe = require('../database/models/countries')
const { response } = require('express')

Controller.countries = async (req, res) => {
  let { code, name, group } = req.query
  const data = await Globe.find({}, '-_id -__v')

  if (group == 'region') {
    const regionsArray = [...new Set(data.map((country) => country.region))]

    const filter = {
      region: { $in: regionsArray }
    }
    let docs = await Globe.aggregate([
      { $match: filter },
      {
        $group: {
          _id: '$region',
          countries: { $push: '$$ROOT' }
        }
      },
      {
        $addFields: { region: '$_id' }
      },
      {
        $project: { _id: 0 }
      }
    ])
    const grouped = { regions: {} }

    docs.forEach((reg) => {
      grouped.regions[reg.region.toString()] = reg.countries
    })

    return res.send(grouped)
  }
  if (group == 'languages') {
    const grouped = { languages: { noEntries: [] } }
    groupByLanguage(data, grouped)
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
    res.download('./data/countries.json')
  } else {
    res.status(403).send('You are not authorized')
  }
}

module.exports = Controller
