'use strict'

module.exports = app =>
  class ValidationError extends Error {
    constructor(message, details) {
      super(message)
      this.name = 'ValidationError'
      this.message = message
      this.errors = Object.assign({}, details)
    }

    static handleError(err, req, res, next) {
      if (err.name === 'ValidationError') {
        app.log.warn(
          `${err.name}: ${err.message} ( ${JSON.stringify(err.errors)} )`
        )

        return res.status(400).json({
          message: 'Invalid Data: Unable to save to database.',
          errors: [
            {
              status: 400,
              title: err.name,
              detail: err.message,
              meta: err.errors
            }
          ]
        })
      }

      return next(err)
    }
  }
