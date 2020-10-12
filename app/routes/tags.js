'use strict'

module.exports = app => {
  const router = app.router
  const TAGS = app.controllers.tags
  const CHECK = app.middleware

  const call = fn => (...args) => fn(...args).catch(args[2])

  router.post(
    '/loadTags/:id',
    call(CHECK.CheckAuth.check),
    call(TAGS.loadTags)
  )
  router.post(
    '/addTag/:id',
    call(CHECK.CheckAuth.check),
    call(CHECK.CheckPermissions.check(['member'])),
    call(TAGS.addTag)
  )
  router.post(
    '/deleteTag/:id',
    call(CHECK.CheckAuth.check),
    call(CHECK.CheckPermissions.check(['member', 'admin'])),
    call(TAGS.deleteTag)
  )
  router.post(
    '/getTagStatistics',
    call(CHECK.CheckAuth.check),
    call(CHECK.CheckPermissions.check(['admin'])),
    call(TAGS.getStatistics)
  )
  return router
}
