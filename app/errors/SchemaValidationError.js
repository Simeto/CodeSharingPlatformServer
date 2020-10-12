'use strict'

module.exports = app =>
  class SchemaValidationError extends Error {
    constructor(e) {
      super(e)
      this.name = 'SchemaValidationError'
      this.message = 'Failed to validate request data'
      this.errors = e
    }

    static handleError(err, req, res, next) {
      if (err.name === 'SchemaValidationError') {
        app.log.warn(
          `${err.name}: ${err.message} ( ${JSON.stringify(err.errors)} )`
        )

        return res.status(400).json({
          message: 'Invalid Data: Unable to process request.',
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
