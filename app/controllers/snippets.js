'use strict'

module.exports = app => {
  const Snippet = app.models.Snippet

  return {
    async createSnippet(req, res) {
      await Snippet.createUserSnippet(req, res)
    },
    async getOwnSnippets(req, res) {
      await Snippet.getUserSnippets(req, res)
    },
    async getAllSnippets(req, res) {
      await Snippet.getAllUsersSnippet(req, res)
    },
    async updateSnippet(req, res) {
      await Snippet.updateUserSnippet(req, res)
    },
    async deleteSnippet(req, res) {
      await Snippet.deleteUserSnippet(req, res)
    },
    async getOtherSnippets(req, res) {
      await Snippet.getOtherUserSnippets(req, res)
    },
    async updateLikes(req, res) {
      await Snippet.updateSnippetLikes(req, res)
    }
  }
}
