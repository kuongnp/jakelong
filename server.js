var Hapi = require('hapi'),
	Good = require('good'),
	Path = require('path'),
	Handlebars = require('handlebars'),
	Routes = require('./config/routes'),
	Db = require('./config/db'),
	Config = require('./config/config');

var app = {};
app.config = Config;

var server = new Hapi.Server();

server.connection({ port: app.config.server.port });

server.views({
	engines: {
		html: Handlebars,
	},
	relativeTo: './views',
	path: './templates',
	layoutPath: './layout',
	layout: 'default',
	partialsPath:'./partials',
	helpersPath: './helpers'
});


server.route(Routes.endpoints);

server.start(function () {
  console.log('Server started ', server.info.uri);
});


/*
var Hapi = require('hapi');
var Good = require('good');
var Path = require('path');
//var Mongoose = require("mongoose");
var Handlebars = require('handlebars');

var server = new Hapi.Server();
server.connection({port:3000});

//load dynamic layout for frontend user


server.views({
	engines: {
		html: Handlebars
	},
	relativeTo: './views/themes/jakeblog',
	path: './',
	layoutPath: './layout',
	layout: 'default',
	partialsPath:'./partials',
	helpersPath: './helpers'
});
//create routes
var routes = [
	{
		method: 'GET',
		path: '/',
		handler: function(request, reply) {
			var data = {
				title: 'Hello Jakelong',
				message: 'Hello world, i\'m Jakelong',
			};
			return reply.view('index', data);
		}
	},
	{
		method: 'GET',
		path: '/{slug}',
		handler: function(request, reply) {
			var data = {
				title: 'new page',
				excerpt: 'excerpt of page',
				status: 1,
				type: 'page',
				message: 'Hello world, i\'m '+request.params.slug
			};
			return reply.view('index', data);
		}
	}
	

];

//tell server using routes
server.route(routes);

// Serve static files from `static` dir.
server.route({
  method: 'GET',
  path: '/{path*}',
  handler: {
      directory: { 
      	path: 'views/themes', 
      	listing: false,
      	index: true
      }
  }
});
//register loging plugin and start server
server.register({
	register: Good,
	options: {
		reporters: [{
			reporter: require('good-console'),
			args:[{log: '*',response: '*'}]
		}]
	}
},function(err) {
	if(err) {
		throw err;
	}

	server.start(function(){
		console.log('Server running at:', server.info.uri);
	})
});
*/