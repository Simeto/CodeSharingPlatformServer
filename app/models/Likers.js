'use strict'

module.exports = app => {
  const likersSchema = app.schemas.LikersSchema

  likersSchema.statics.likeUnlikeOtherSnippet = async function likeUnlikeOtherSnippet (req, res, next) {
    const _id = req.params.id
    const owner = req.user._id
    const liker = await this.findOne({id: _id, owner})
    if (liker) {
      await this.updateOne({id: _id, owner: owner}, {like: !liker.like})
      req.user.like = liker.like
      next()
    } else {
      await this.create({id: _id, owner: owner, like: true})
      next()
    }
  }

  likersSchema.methods.toJSON = function() {
    const likers = this
    const likersObject = likers.toObject()

    delete likersObject._id
    delete likersObject.owner

    return likersObject
  }

  return app.mongoose.model('Likers', likersSchema)
}
