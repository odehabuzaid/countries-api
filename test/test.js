'use-strict'

const supertest = require('supertest')
const mongoose = require('mongoose')
const fs = require('fs')

const sample = require('../data/structured.json')

const { app } = require('../app')

const { translator, jsonExporter } = require('../utils')

const requestWithSupertest = supertest(app)

beforeEach((done) => {
  mongoose.connect(
    process.env.ATLAS_CON_STR,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done()
  )
})

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done())
  })
})

describe('Endpoints', () => {
  it('GET /', async () => {
    const res = await requestWithSupertest.get('/')
    expect(res.status).toEqual(200)
  })

  it('GET /countries  - all countries', async () => {
    await requestWithSupertest
      .get('/countries')
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body)).toBeTruthy()
        expect(response.body.length).toEqual(250)

        expect(response.body[0].name.common).toBe(sample[0].name.common)
        expect(response.body[0].name.official).toBe(sample[0].name.official)
        expect(response.body[0].codes.cca2).toBe(sample[0].codes.cca2)
        expect(response.body[0].codes.cca3).toBe(sample[0].codes.cca3)
        expect(response.body[0].codes.ccn3).toBe(sample[0].codes.ccn3)
        expect(response.body[0].codes.cca2).toBe(sample[0].codes.cca2)
      })
  })
  
  it('GET /countries  - support search by CCA2', async () => {
    await requestWithSupertest
      .get('/countries?code=' + sample[6].codes.cca2)
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body)).toBeTruthy()
        expect(response.body.length).toEqual(1)
        expect(response.body[0].name.common).toBe(sample[6].name.common)
        expect(response.body[0].name.official).toBe(sample[6].name.official)
        expect(response.body[0].codes.cca2).toBe(sample[6].codes.cca2)
        expect(response.body[0].codes.cca3).toBe(sample[6].codes.cca3)
        expect(response.body[0].codes.ccn3).toBe(sample[6].codes.ccn3)
        expect(response.body[0].codes.cca2).toBe(sample[6].codes.cca2)
      })
  })

  it('GET /countries  - support search by CCA3', async () => {
    await requestWithSupertest
      .get('/countries?code=' + sample[6].codes.cca3)
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body)).toBeTruthy()
        expect(response.body.length).toEqual(1)
        expect(response.body[0].name.common).toBe(sample[6].name.common)
        expect(response.body[0].name.official).toBe(sample[6].name.official)
        expect(response.body[0].codes.cca2).toBe(sample[6].codes.cca2)
        expect(response.body[0].codes.cca3).toBe(sample[6].codes.cca3)
        expect(response.body[0].codes.ccn3).toBe(sample[6].codes.ccn3)
        expect(response.body[0].codes.cca2).toBe(sample[6].codes.cca2)
      })
  })

  it('GET /countries  - support search by CCN3', async () => {
    await requestWithSupertest
      .get('/countries?code=' + sample[6].codes.ccn3)
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body)).toBeTruthy()
        expect(response.body.length).toEqual(1)
        expect(response.body[0].name.common).toBe(sample[6].name.common)
        expect(response.body[0].name.official).toBe(sample[6].name.official)
        expect(response.body[0].codes.cca2).toBe(sample[6].codes.cca2)
        expect(response.body[0].codes.cca3).toBe(sample[6].codes.cca3)
        expect(response.body[0].codes.ccn3).toBe(sample[6].codes.ccn3)
        expect(response.body[0].codes.cca2).toBe(sample[6].codes.cca2)
      })
  })

  it('GET /countries  - support Search by country name /common', async () => {
    await requestWithSupertest
      .get('/countries?name=' + sample[6].name.common)
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body)).toBeTruthy()
        expect(response.body.length).toEqual(1)
        expect(response.body[0].name.common).toBe(sample[6].name.common)
        expect(response.body[0].name.official).toBe(sample[6].name.official)
        expect(response.body[0].codes.cca2).toBe(sample[6].codes.cca2)
        expect(response.body[0].codes.cca3).toBe(sample[6].codes.cca3)
        expect(response.body[0].codes.ccn3).toBe(sample[6].codes.ccn3)
        expect(response.body[0].codes.cca2).toBe(sample[6].codes.cca2)
      })
  })

  it('GET /countries  - support Search by country name /official', async () => {
    await requestWithSupertest
      .get('/countries?name=' + sample[6].name.official)
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body)).toBeTruthy()
        expect(response.body.length).toEqual(1)
        expect(response.body[0].name.common).toBe(sample[6].name.common)
        expect(response.body[0].name.official).toBe(sample[6].name.official)
        expect(response.body[0].codes.cca2).toBe(sample[6].codes.cca2)
        expect(response.body[0].codes.cca3).toBe(sample[6].codes.cca3)
        expect(response.body[0].codes.ccn3).toBe(sample[6].codes.ccn3)
        expect(response.body[0].codes.cca2).toBe(sample[6].codes.cca2)
      })
  })

  it('GET /countries  - grouped by language', async () => {
    await requestWithSupertest
      .get('/countries?group=languages')
      .expect(200)
      .then((response) => {
        expect(response.body.languages.eng.length).toBe(91)
      })
  })

  it('GET /countries  - grouped by region', async () => {
    await requestWithSupertest
      .get('/countries?group=region')
      .expect(200)
      .then((response) => {
        expect(response.body.regions.Europe.length).toBe(53)
      })
  })

  it('GET /currencies  - by CCA2', async () => {
    await requestWithSupertest
      .get('/currencies?code=' + sample[6].codes.cca2)
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body)).toBeTruthy()
        expect(response.body.length).toEqual(1)
        expect(response.body[0]).toEqual(sample[6].currencies)
      })
  })
})

describe('Utils', () => {
  it('API URL Translator', async () => {
    const url = await translator.translate(process.env.COUNTRIES_API_URL)
    expect(url).toEqual('https://restcountries.com/v3.1/all')
  })

  it('Json File exporter', async () => {
    const dir = await jsonExporter.exporter(
      { 'test': 'tobe exported' },
      'exported.json'
    )

    expect(fs.existsSync(dir)).toEqual(true)
  })
})

describe('DataBase', () => {
  const Globe = require('../database/models/countries')

  it('Countries collection contains 250 city', async () => {
    return Globe.find().then((data) => expect(data.length).toEqual(250))
  })
  it('All docs are structured only with the required fields', async () => {
    return Globe.find({}, '-_id -__v').then((data) => {
      const sampleDoc = data[6]['_doc']
      const requiredFields = [
        'name',
        'codes',
        'languages',
        'currencies',
        'region',
        'latlng'
      ]
      expect(Object.keys(sampleDoc)).toEqual(requiredFields)
    })
  })
})
