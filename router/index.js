'use-strict'

const express = require('express')
const router = express.Router()

const Controller = require('../controllers')

router.get('/favicon.ico', (req, res) => res.send('🌏'))
router.get('/', (req, res) =>
    res.send('<center><img src="https://i.ibb.co/7jLr7vf/server.gif" ></center>')
)

router.get('/countries', Controller.countries)

router.get('/currencies', Controller.currencies)

router.get('/download', Controller.downloadFile)


module.exports = router