'use strict'

const mongoose = require('mongoose')
const { fillTheDataBaseFromTheApi } = require('./api')
async function ConnectToDataBase (dbConnectionURI) {
  const connectionPromis = new Promise((resolve, reject) => {
    mongoose.connect(dbConnectionURI)
    mongoose.connection
      .once('open', () => {
        console.log('\x1b[33m%s\x1b[0m', '✨ Connected => 🦅 ')
        fillTheDataBaseFromTheApi() // can be scheduled using Agenda.js to check for api updates
        resolve('Mongoose connected')
      })
      .on('error', (error) => reject(error))
  })

  return connectionPromis
}

exports.ConnectToDataBase = ConnectToDataBase
