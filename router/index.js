'use-strict'

const express = require('express')
const router = express.Router()

router.get('/favicon.ico', (req, res) => res.send('🌏'))
router.get('/', (req, res) =>
    res.send('<center><img src="https://i.ibb.co/7jLr7vf/server.gif" ></center>')
)

module.exports = router