'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
  * @module  Post
  * @description contain the details of Attribute  
*/

var PostSchema = new Schema({
  title: { type: String, required: true},
  excerpt: String,
  content: {type: String, required: true},
  slug: {type: String, required:true},
  thumbnail: String,
  categories:{ type:[Schema.Types.ObjectId, ref: 'Cate'], index: true},
  tags:{type: [Schema.Types.ObjectId, ref: 'Tag'], index: true},
  /**
    status of post can be '1:Published', '2:draft', '0:deleted', etc..
  */
  status: { type: Number, default:2},
  date: { type: Date, default: Date.now},
  /**
    type of post can be 'post', 'page', etc..
  */
  type: { type: String, default: 'post'},
  page_order: Number
});

var post = mongoose.model('Post', PostSchema);

/** export schema */
module.exports = {
  Post : post
};