'use-strict'

const supertest = require('supertest');
const mongoose = require("mongoose");
const fs = require("fs");
const { app } = require('../app')
const { translator, jsonExporter } = require('../utils')
const requestWithSupertest = supertest(app);

beforeEach((done) => {

    mongoose.connect(process.env.ATLAS_CON_STR,
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => done());
});

afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(() => done())
    });
});



describe('Home Endpoint', () => {

    it('GET / ', async () => {
        const res = await requestWithSupertest.get('/');
        expect(res.status).toEqual(200);

    });

});

describe('Utils', () => {

    it('API URL Translator', async () => {
        const url = await translator.translate(process.env.COUNTRIES_API_URL);
        expect(url).toEqual("https://restcountries.com/v3.1/all");

    });

    it('Json File exporter', async () => {
        const dir = await jsonExporter.exporter({ "test": "tobe exported" }, "exported.json")

        expect(fs.existsSync(dir)).toEqual(true);

    });

});


describe('DataBase', () => {
    const Cities = require('../database/models/cities')

    it('Cities collection contains 250 city', async () => {
        return Cities.find().then(data => expect(data.length).toEqual(250));
    });
    it('All docs are structured only with the required fields', async () => {
        return Cities.find({}, '-_id -__v').then(data => {
            const sampleDoc = data[0]['_doc']
            const requiredFields = ['name', 'codes', 'languages', 'currencies', 'region', 'latlng']
            expect(Object.keys(sampleDoc)).toEqual(requiredFields)
        });
    });

});