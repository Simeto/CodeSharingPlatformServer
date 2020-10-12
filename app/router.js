'use strict'

const express = require('express')

module.exports = app => {
  const router = express.Router()
  app.express.use(app.config.apiBasePath, router)
  app.express.use('../uploads', express.static('uploads'))
  return router
}
