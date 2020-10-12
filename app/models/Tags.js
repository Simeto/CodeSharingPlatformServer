'use strict'

module.exports = app => {
  const tagsSchema = app.schemas.TagsSchema

  tagsSchema.statics.getTagStatistics = async function getTagStatistics(req, res) {
    await this.aggregate([
      { $group: {
        _id: { description: '$description' },
        count: { $sum: 1 }
      }}
    ])
      .then(async tags => {
        return res.status(200).json(tags)
      })
      .catch(err => {
        return res.status(500).json({
          error: err
        })
      })
  }

  tagsSchema.statics.loadAllTags = async function loadTags(req, res) {
    const _id = req.params.id
    const owner = req.user._id
    await this.find({id: _id, owner})
      .then(async tags => {
        return res.status(200).json(tags)
      })
      .catch(err => {
        return res.status(500).json({
          error: err
        })
      })
  }

  tagsSchema.statics.addSnippetTag = async function addSnippetTag(req, res) {
    const _id = req.params.id
    const owner = req.user._id
    const description = req.body.description
    const exists = await this.findOne({id: _id, description})

    if (exists) {
      return res.status(200).json({
        message: 'Tag exists !'
      })
    } else {
      await this.create({id: _id, owner, description})
        .then(async (tag) => {
          return res.status(200).json({
            tag
          })
        })
        .catch(err => {
          return res.status(500).json({
            error: err
          })
        })
    }
  }

  tagsSchema.statics.deleteSnippetTag = async function deleteSnippetTag (req, res, next) {
    const _id = req.params.id
    const owner = req.user._id
    const description = req.body.description

    this.remove({ id: _id, owner, description }, (err, tag) => {
      if (err) {
        return res.status(500).json({
          error: err
        })
      } else {
        return res.status(200).json({
          message: 'Tag deleted !'
        })
      }
    })
  }

  tagsSchema.methods.toJSON = function() {
    const tags = this
    const tagsObject = tags.toObject()

    delete tagsObject._id
    delete tagsObject.owner

    return tagsObject
  }

  return app.mongoose.model('Tags', tagsSchema)
}
