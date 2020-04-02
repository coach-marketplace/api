'use strict'

const mongoose = require('mongoose')

const timestamp = require('mongoose-timestamp')
const Schema = mongoose.Schema

const serviceSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  title: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    trim: true,
  },

  /**
   * Price is store in cent
   * so 1€ is store like this: 100
   */
  price: {
    type: Number,
  },

  // TODO: Make the currency required
  currency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Currency',
  },
})

serviceSchema.plugin(timestamp)

module.exports = mongoose.model('Service', serviceSchema)