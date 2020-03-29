'use strict'

const pingRouter = require('./ping')
const authRouter = require('./auth')
const userRouter = require('./user')
const coachRouter = require('./coach')
const serviceRouter = require('./service')
const currencyRouter = require('./currency')
const langRouter = require('./lang')
const contactRouter = require('./contact')
const geoSpatialRouter = require('./geo-spatial')

module.exports = app => {
  app
    .use('/ping', pingRouter)
    .use('/v1/auth', authRouter)
    .use('/v1/user', userRouter)
    .use('/v1/coach', coachRouter)
    .use('/v1/service', serviceRouter)
    .use('/v1/currency', currencyRouter)
    .use('/v1/contact', contactRouter)
    .use('/v1/geo-spatial', geoSpatialRouter)

    // Admin routes
    // TODO: secure admin route by using middleware
    .use('/v1/lang', langRouter)
}
