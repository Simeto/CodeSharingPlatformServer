'use strict'

require('app-module-path').addPath(__dirname)

const router = require('./router')
const config = require('./lib/config')
const log = require('./lib/log')
const loader = require('./lib/loader')
const express = require('./lib/express')
const exceptions = require('./exceptions')
const mongoose = require('./lib/mongoose')
const nodemailer = require('./lib/nodemailer')

const packageJson = require('../package')
const app = {
  name: packageJson.name,
  version: packageJson.version
}
app.root = __dirname
app.config = config('config')
app.config.mail = config('config.mail')
app.log = log(app)
app.services = loader(app, 'services')
app.mongoose = mongoose(app)
app.schemas = loader(app, 'schemas')
app.models = loader(app, 'models')
app.errors = loader(app, 'errors')
app.express = express(app)
app.router = router(app)
app.controllers = loader(app, 'controllers')
app.middleware = loader(app, 'middleware')
app.exceptions = exceptions(app)
app.nodemailer = nodemailer(app)
app.routes = loader(app, 'routes')

module.exports = app
