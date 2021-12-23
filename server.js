'use-strict'

const { app } = require('./app')

const { ConnectToDataBase } = require('./database/connect')

ConnectToDataBase(process.env.ATLAS_CON_STR)
    .then(() => app.listen(process.env.PORT))
    .catch(() =>
        ConnectToDataBase(process.env.LOCAL_CON_STR)
            .catch(() => {
                throw new Error('Cannot connect to database')
            }))


process.once('SIGUSR2', () => process.kill(process.pid, 'SIGUSR2'))
