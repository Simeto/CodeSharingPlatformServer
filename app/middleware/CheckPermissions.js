'use strict'

module.exports = app => {
  return {
    check(roles) {
      return async (req, res, next) => {
        try {
          const userRoles = req.user.role
          const permitted = userRoles.some(role => roles.includes(role))
          if (!permitted) {
            return res.status(401).json({
              message: 'No permissions !'
            })
          }
          next()
        } catch (err) {
          return res.status(401).json({
            message: 'No permissions !'
          })
        }
      }
    }
  }
}
