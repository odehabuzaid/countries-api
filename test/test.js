'use-strict'

const { app } = require('../app')
const supertest = require('supertest');
const requestWithSupertest = supertest(app);

describe('Home Endpoint', () => {

    it('GET / ', async () => {
        const res = await requestWithSupertest.get('/');
        expect(res.status).toEqual(200);

    });

});