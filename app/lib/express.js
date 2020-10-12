'use strict'

const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

module.exports = app => {
  const exp = express()
  const pid = process.pid.toString()

  exp.use(bodyParser.urlencoded({extended: false}))
  exp.use(morgan('dev'))
  exp.use(bodyParser.json())

  if (app.config.cors) {
    exp.use(cors())
    app.log.debug('Activated CORS')
  }

  exp.listen(app.config.port, () => {
    app.log.info(`please open http://localhost:${app.config.port}`)
    app.log.debug(app.config)
    app.log.info(
      `Node v${process.env.node_version}, NODE_ENV: ${process.env.NODE_ENV}`
    )

    fs.writeFile(`${app.root}/server.pid`, pid, err => {
      if (err) throw err
    })
    console.log(`Example app listening at http://localhost:${app.config.port}`)
  })
  return exp
}
