'use-strict'

const supertest = require('supertest');
const mongoose = require("mongoose");

const { app } = require('../app')
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