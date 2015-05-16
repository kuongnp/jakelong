'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
  * @module  User
  * @description contain the details of Attribute  
*/

var PostSchema = new Schema({

  ID : { type: int, unique: true, required: true },
  title: { type: String, required: true},
  excerpt: String,
  content: {type: String, required: true},
  url: {type: String, required:true},
  /**
    status of post can be '1:Published', '2:draft', '0:deleted', etc..
  */
  status: { type: int, default:2},
  date: { type: Date, default: Date.now},
  /**
    type of post can be 'post', 'page', etc..
  */
  type: { type: String, default: 'post'},


  /** 
    User Name. It can only contain string, is required field.
  */
  username : { type: String, required: true },

});

var post = mongoose.model('Post', PostSchema);

/** export schema */
module.exports = {
  Post : post
};