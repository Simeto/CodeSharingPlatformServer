'use strict'
module.exports = app =>
  class NotFoundError extends Error {
    constructor(message, details) {
      super(message)

      this.name = 'NotFoundError'
      this.message = message
      this.details = details
    }

    static handleError(err, req, res, next) {
      if (err.name === 'NotFoundError') {
        return res.status(404).json({
          message: 'Not Found.',
          errors: [
            {
              status: 404,
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
