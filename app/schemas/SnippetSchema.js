'use strict'

module.exports = app => {
  const snippetSchema = new app.mongoose.Schema({
    description: {
      type: String,
      required: true
    },
    likes: {
      type: Number,
      required: true
    },
    rating: {
      type: Number
    },
    owner: {
      type: app.mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    isOwner: {
      type: Boolean,
      default: false
    }
  })
  return snippetSchema
}
