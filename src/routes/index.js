'use strict'

const pingRouter = require('./ping')
const authRouter = require('./auth')
const userRouter = require('./users')
const coachRouter = require('./coach')
const offersRouter = require('./offer')

module.exports = app => {
  app
    .use('/ping', pingRouter)
    .use('/v1/auth', authRouter)
    .use('/v1/users', userRouter)
    .use('/v1/coaches', coachRouter)
    .use('/v1/offers', offersRouter)
}
