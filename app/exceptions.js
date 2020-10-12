'use strict'

module.exports = app => {
  let stack = {}

  app.express.use((err, req, res, next) => {
    stack = err
    next(err)
  })

  app.express.use((req, res) =>
    res.status(404).json({
      message: 'Wrong URL the page is Not Found.!!',
      errors: [
        {
          status: 404,
          detail: `${req.method} ${req.url}`
        }
      ]
    })
  )

  app.express.use(app.errors.SchemaValidationError.handleError)
  app.express.use(app.errors.ValidationError.handleError)
  app.express.use(app.errors.BadRequestError.handleError)
  app.express.use(app.errors.NotFoundError.handleError)

  app.express.use((err, req, res, next) => {
    app.log.error(`${err.name}: ${err.message}`)
    app.log.debug(err.stack)

    if (res.headersSent) return next(err)

    return res.status(500).json({
      message: 'Server Error.',
      errors: [
        {
          status: 500,
          title: err.name,
          detail: err.message
        }
      ]
    })
  })

  return stack
}
