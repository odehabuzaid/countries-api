'use strict'

const mongoose = require('mongoose')
const { fillTheDataBaseFromTheApi } = require('./api')

module.exports.connectToDataBase = async (dbConnectionURI, app) => {
  await mongoose
    .connect(dbConnectionURI)
    .then(() => {
      fillTheDataBaseFromTheApi().then(() => {
        app.listen(process.env.PORT, () =>
          console.log(
            '\x1b[33m%s\x1b[0m',
            `✨ Listening on port ${process.env.PORT} => 🦅 `
          )
        )
      })
    })
    .catch(() => {
      console.log('connecting to ', dbConnectionURI, 'failed')
      this.connectToDataBase(process.env.ATLAS_CON_STR, app)
    })
}