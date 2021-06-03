const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  merchant: {
    type: String,
    required: true
  }
  // userId: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Users',
  //   required: true,
  //   index: true
  // }
})

module.exports = mongoose.model('record', recordSchema)
