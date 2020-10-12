'use strict'

module.exports = app => {
  const likersSchema = new app.mongoose.Schema({
    id: String,
    like: {
      type: Boolean,
      required: true
    },
    owner: {
      type: app.mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Snippet'
    }
  })
  return likersSchema
}
