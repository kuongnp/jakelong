'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
  * @module  User
  * @description contain the details of Attribute  
*/

var TagSchema = new Schema({
  title: { type: String, required: true},
  slug: {type: String, required: true},
  date: { type: Date, default: Date.now}
});

var tag = mongoose.model('Tag', TagSchema);

/** export schema */
module.exports = {
  Tag : tag
};