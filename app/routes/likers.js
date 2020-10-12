'use strict'

module.exports = app => {
  const router = app.router
  const LIKERS = app.controllers.likers
  const SNIPPETS = app.controllers.snippets
  const CHECK = app.middleware

  const call = fn => (...args) => fn(...args).catch(args[2])

  router.post(
    '/likeUnlikeSnippet/:id',
    call(CHECK.CheckAuth.check),
    call(CHECK.CheckPermissions.check(['member'])),
    call(LIKERS.likeUnlikeSnippet),
    call(SNIPPETS.updateLikes)
  )
  return router
}
