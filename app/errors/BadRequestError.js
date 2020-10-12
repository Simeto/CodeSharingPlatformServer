'use strict'

module.exports = app =>
  class BadRequestError extends Error {
    constructor(message, details) {
      super(message)

      this.name = 'BadRequestError'
      this.message = message
      this.details = details
    }

    static handleError(err, req, res, next) {
      if (err.name === 'Bad RequestError') {
        return res.status(400).json({
          message: 'Bad Request.',
          errors: [
            {
              status: 400,
              title: err.name,
              detail: err.message,
              meta: err.details
            }
          ]
        })
      }

      return next(err)
    }
  }
