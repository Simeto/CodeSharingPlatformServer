'use strict'

module.exports = app => {
  const snippetSchema = app.schemas.SnippetSchema

  snippetSchema.virtual('likers', {
    ref: 'Likers',
    localField: '_id',
    foreignField: 'owner'
  })

  snippetSchema.virtual('tags', {
    ref: 'Tags',
    localField: '_id',
    foreignField: 'owner'
  })

  snippetSchema.statics.updateSnippetLikes = async function updateSnippetLikes(req, res) {
    const _id = req.params.id
    const owner = req.user._id
    const isLiked = req.user.like
    const incDecr = isLiked ? -1 : 1

    const liked = await this.findOneAndUpdate({_id, owner: {$ne: owner}}, { $inc: { likes: incDecr } })
    return res.status(200).json({
      liked
    })
  }

  snippetSchema.statics.createUserSnippet = async function createUserSnippet(
    req,
    res
  ) {
    const data = req.body
    data.owner = req.user._id
    await this.create(data)
    await this.find()
      .then(async snippets => {
        return res.status(200).json({
          snippets
        })
      })
      .catch(err => {
        return res.status(500).json({
          error: err
        })
      })
  }

  snippetSchema.statics.getUserSnippets = async function getUserSnippets(
    req,
    res
  ) {
    try {
      await req.user.populate('snippets').execPopulate()
      await req.user.snippets.forEach(async snippet => {
        if (snippet.owner.toString() === req.user._id.toString()) {
          snippet.isOwner = true
        } else {
          snippet.isOwner = false
        }
      })
      return res.status(200).json(req.user.snippets)
    } catch (err) {
      return res.status(500).json({
        error: err
      })
    }
  }

  snippetSchema.statics.getAllUsersSnippet = async function getAllUsersSnippet(
    req,
    res
  ) {
    try {
      await this.find()
        .then(async snippets => {
          await snippets.forEach(async snippet => {
            if (snippet.owner.toString() === req.user._id.toString()) {
              snippet.isOwner = true
            } else {
              snippet.isOwner = false
            }
          })
          return res.status(200).json(snippets)
        })
    } catch (err) {
      return res.status(500).json({
        error: err
      })
    }
  }

  snippetSchema.statics.getOtherUserSnippets = async function getOtherUserSnippets(req, res) {
    try {
      const owner = req.user._id
      await this.find({owner: {$ne: owner}})
        .then(snippets => {
          snippets.forEach(snippet => {
            if (snippet.owner.toString() === req.user._id.toString()) {
              snippet.isOwner = true
            } else {
              snippet.isOwner = false
            }
          })
          return res.status(200).json(snippets)
        })
    } catch (err) {
      return res.status(500).json({
        error: err
      })
    }
  }

  snippetSchema.statics.updateUserSnippet = async function updateUserSnippet(
    req,
    res
  ) {
    try {
      const _id = req.params.id
      const owner = req.user._id
      const updates = req.body.description
      const snippet = await this.findOne({_id, owner})

      await snippet.update({description: updates})
      return res.status(200).json({
        snippet
      })
    } catch (err) {
      return res.status(500).json({
        error: err
      })
    }
  }

  snippetSchema.statics.deleteUserSnippet = async function deleteUserSnippet(
    req,
    res
  ) {
    try {
      const _id = req.params.id
      const snippet = await this.findOne({_id})
      await this.remove({_id})
      return res.status(200).json({
        snippet
      })
    } catch (err) {
      return res.status(500).json({
        error: err
      })
    }
  }

  snippetSchema.methods.toJSON = function() {
    const snippet = this
    const snippetObject = snippet.toObject()

    delete snippetObject.owner

    return snippetObject
  }

  return app.mongoose.model('Snippet', snippetSchema)
}
