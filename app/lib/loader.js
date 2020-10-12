/* eslint global-require: 0 */
/* eslint import/no-dynamic-require: 0 */
'use strict'

const path = require('path')
const glob = require('glob')

module.exports = (app, namespace) => {
  const obj = {}
  const cwd = path.join(__dirname, '..')
  glob.sync(`${namespace}/*.js`, { cwd }).forEach(f => {
    obj[path.basename(f, '.js')] = require(f)(app)
  })
  return obj
}
