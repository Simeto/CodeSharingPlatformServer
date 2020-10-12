'use strict'

module.exports = app => {
  const Likers = app.models.Likers

  return {
    async likeUnlikeSnippet(req, res, next) {
      await Likers.likeUnlikeOtherSnippet(req, res, next)
    }
  }
}
