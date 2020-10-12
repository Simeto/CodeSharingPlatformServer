'use strict'

module.exports = app => {
  const Tags = app.models.Tags

  return {
    async addTag(req, res, next) {
      await Tags.addSnippetTag(req, res)
    },
    async loadTags(req, res, next) {
      await Tags.loadAllTags(req, res)
    },
    async deleteTag(req, res, next) {
      await Tags.deleteSnippetTag(req, res)
    },
    async getStatistics(req, res, next) {
      await Tags.getTagStatistics(req, res)
    }
  }
}
