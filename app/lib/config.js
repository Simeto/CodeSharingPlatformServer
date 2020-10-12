/* eslint global-require: 0 */
/* eslint import/no-dynamic-require: 0 */

'use strict'

require('json5/lib/register')

const path = require('path')
const glob = require('glob')
const configExtend = require('config-extend')

module.exports = base => {
  const cwd = path.join(__dirname, '..')

  const allPattern = `${base}/*.json5`
  let corePattern = `${base}/+(config.json5|config.local.json5|config.mail.json5)`
  let ignorePattern = `${base}/+(config.*|*.test.json5)`
  let config = {}

  if (process.env.NODE_ENV === 'test') {
    corePattern = `${base}/+(config.json5|config.test.json5)`
    ignorePattern = `${base}/+(config.*|*.local.json5)`
  }

  glob.sync(corePattern, { cwd }).forEach(f => {
    config = configExtend(config, require(f))
  })

  glob.sync(allPattern, { cwd, ignore: ignorePattern }).forEach(f => {
    const ns = path.basename(f).split('.')[0]
    const nsConfig = {}
    nsConfig[ns] = require(f)
    config = configExtend(config, nsConfig)
  })

  return config
}
