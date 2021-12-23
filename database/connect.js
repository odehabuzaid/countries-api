'use strict'

const mongoose = require('mongoose')

async function ConnectToDataBase (dbConnectionURI) {
  const connectionPromis = new Promise((resolve, reject) => {
    mongoose.connect(dbConnectionURI)
    mongoose.connection
      .once('open', () => {
        console.log('\x1b[33m%s\x1b[0m', '✨ Connected => 🦅 ')
        resolve('Mongoose connected')
      })
      .on('error', (error) => reject(error))
  })

  return connectionPromis
}

exports.ConnectToDataBase = ConnectToDataBase
