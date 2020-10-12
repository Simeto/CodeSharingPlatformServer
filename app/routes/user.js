'use strict'

module.exports = app => {
  const router = app.router
  const USER = app.controllers.users
  const CHECK = app.middleware

  const upload = CHECK.Multer.image()
  const call = fn => (...args) => fn(...args).catch(args[2])

  router.post('/register', call(USER.registerUser))
  router.post('/login', call(USER.loginUser))
  router.post(
    '/logout',
    call(CHECK.CheckAuth.check),
    call(USER.logoutUser)
  )
  router.post(
    '/logoutAll',
    call(CHECK.CheckAuth.check),
    call(CHECK.CheckPermissions.check(['member'])),
    call(USER.logoutAll)
  )
  router.put(
    '/updateUserProfile',
    call(CHECK.CheckAuth.check),
    call(CHECK.CheckPermissions.check(['member'])),
    call(USER.updateUserProfile)
  )
  router.post(
    '/updateUserAvatar',
    call(CHECK.CheckAuth.check),
    call(CHECK.CheckPermissions.check(['member'])),
    upload.single('image'),
    call(USER.updateUserAvatar)
  )
  router.delete(
    '/deleteUserAvatar',
    call(CHECK.CheckAuth.check),
    call(CHECK.CheckPermissions.check(['member', 'admin'])),
    call(USER.deleteUserAvatar)
  )
  router.get(
    '/getUserAvatar',
    call(CHECK.CheckAuth.check),
    call(CHECK.CheckPermissions.check(['member', 'admin'])),
    call(USER.getUserAvatar)
  )
  router.delete(
    '/delete',
    call(CHECK.CheckAuth.check),
    call(CHECK.CheckPermissions.check(['member', 'admin'])),
    call(USER.deleteUser)
  )
  router.post('/forgotPassword', call(USER.forgotPassword))
  router.get(
    '/redirectToResetPassword/:token',
    call(CHECK.CheckAuth.check),
    call(USER.redirectToReset)
  )
  router.post(
    '/resetPassword',
    call(CHECK.CheckAuth.check),
    call(USER.resetPassword)
  )
  router.get(
    '/redirectToPrivacyPolicy/:token',
    call(CHECK.CheckAuth.check),
    call(USER.redirectPrivacyPolicy)
  )
  router.post(
    '/privacyPolicyConfirmation',
    call(CHECK.CheckAuth.check),
    call(USER.privacyPolicyConfirmed)
  )
  router.post(
    '/termsConfirmation',
    call(CHECK.CheckAuth.check),
    call(USER.termsConfirmation)
  )
  router.post(
    '/cookiesConfirmation',
    call(CHECK.CheckAuth.check),
    call(USER.cookiesConfirmation)
  )
  return router
}
