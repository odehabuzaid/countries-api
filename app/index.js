'use-strict'

require('dotenv').config()

const Router = require('../router')

const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())
app.use(cors())

// Routes
app.use(Router)

exports.app = app
