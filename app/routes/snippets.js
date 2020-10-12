'use strict'

module.exports = app => {
  const router = app.router
  const SNIPPET = app.controllers.snippets
  const CHECK = app.middleware

  const call = fn => (...args) => fn(...args).catch(args[2])

  router.post(
    '/createSnippet',
    call(CHECK.CheckAuth.check),
    call(CHECK.CheckPermissions.check(['member'])),
    call(SNIPPET.createSnippet)
  )
  router.post(
    '/getOwnSnippets',
    call(CHECK.CheckAuth.check),
    call(CHECK.CheckPermissions.check(['member'])),
    call(SNIPPET.getOwnSnippets)
  )
  router.post(
    '/getAllSnippets',
    call(CHECK.CheckAuth.check),
    call(CHECK.CheckPermissions.check(['member', 'admin'])),
    call(SNIPPET.getAllSnippets)
  )
  router.post(
    '/getOtherSnippets',
    call(CHECK.CheckAuth.check),
    call(CHECK.CheckPermissions.check(['member'])),
    call(SNIPPET.getOtherSnippets)
  )
  router.post(
    '/updateSnippet/:id',
    call(CHECK.CheckAuth.check),
    call(CHECK.CheckPermissions.check(['member'])),
    call(SNIPPET.updateSnippet)
  )
  router.post(
    '/deleteSnippet/:id',
    call(CHECK.CheckAuth.check),
    call(CHECK.CheckPermissions.check(['admin'])),
    call(SNIPPET.deleteSnippet)
  )
  return router
}
