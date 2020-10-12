'use strict'

module.exports = app => {
  const tagsSchema = new app.mongoose.Schema({
    id: String,
    description: {
      type: String,
      required: true
    },
    owner: {
      type: app.mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Snippet'
    }
  })
  return tagsSchema
}
