'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
  * @module  User
  * @description contain the details of Attribute  
*/

var CateSchema = new Schema({
  title: { type: String, required: true},
  slug: {type: String, required: true},
  /**
    status of cate can be '1:active', '2:inactive', '0:deleted', etc..
  */
  status: { type: Number, default:2},
  date: { type: Date, default: Date.now}
});

var cate = mongoose.model('Cate', CateSchema);

/** export schema */
module.exports = {
  Cate : cate
};