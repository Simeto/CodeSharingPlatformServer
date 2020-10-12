'use strict'

module.exports = (app) => {
  const confirmationSchema = new app.mongoose.Schema({
    hash: {
      type: String,
      trim: true,
      unique: true,
      sparse: true
    },
    link: {
      type: String,
      trim: true,
      unique: true,
      sparse: true
    }
  })
  return confirmationSchema
}
