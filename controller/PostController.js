
'use strict';

var Joi = require('joi'),
  Boom = require('boom'),
  Post = require('../model/PostModel').Post,
  Cate = require('../model/CateModel')
  mongoose = require('mongoose');


exports.getAll = {
  handler: function (request, reply) {
    Post.find({}, function (err, posts) {
      if (!err) {
        return reply(posts);
      }
      return reply(Boom.badImplementation(err)); // 500 error
    });
  }
};

exports.getOne = {
  handler: function (request, reply) {
    Post.findOne({ 'slug': request.params.slug }, function (err, post) {
      if (!err) {
        return reply(post);
      }
      return reply(Boom.badImplementation(err)); // 500 error
    });
  }
};

exports.create = {
  validate: {
    payload: {
      title   : Joi.string().required(),
      slug  : Joi.string().required()
    }
  },
  handler: function (request, reply) {
    var post = new Post(request.payload);
    post.save(function (err, post) {
      if (!err) {
        return reply(user).created('/post/' + post._id); // HTTP 201
      }
      if (11000 === err.code || 11001 === err.code) {
        return reply(Boom.forbidden("please provide another post id, it already exist"));
      }
      return reply(Boom.forbidden(err)); // HTTP 403
    });
  }
};

exports.update = {
  validate: {
    payload: {
      username  : Joi.string().required()
    }
  },
  handler: function (request, reply) {
    Post.findOne({ 'slug': request.params.slug }, function (err, post) {
      if (!err) {
        var post = new Post(request.payload);
        post.save(function (err, post) {
          if (!err) {
            return reply(post); // HTTP 201
          }
          if (11000 === err.code || 11001 === err.code) {
            return reply(Boom.forbidden("please provide another post id, it already exist"));
          }
          return reply(Boom.forbidden(err)); // HTTP 403
        });
      }
      else{ 
        return reply(Boom.badImplementation(err)); // 500 error
      }
    });
  }
};

exports.remove = {
  handler: function (request, reply) {
    Post.findOne({ 'slug': request.params.slug }, function (err, post) {
      if (!err && post) {
        post.remove();
        return reply({ message: "Post deleted successfully"});
      }
      if (!err) {
        return reply(Boom.notFound());
      }
      return reply(Boom.badRequest("Could not delete post"));
    });
  }
};

exports.removeAll = {
  handler: function (request, reply) {
    mongoose.connection.db.dropCollection('posts', function (err, result) {
      if (!err) {
        return reply({ message: "Post database successfully deleted"});
      }
      return reply(Boom.badRequest("Could not delete post"));
    });
  }
};