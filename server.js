'use-strict'

const { app } = require('./app')

const { connectToDataBase } = require('./database/connect')

connectToDataBase(process.env.LOCAL_CON_STR, app)

process.once('SIGUSR2', () => process.kill(process.pid, 'SIGUSR2'))
