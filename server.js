var Hapi = require('hapi');
var Good = require('good');
var Path = require('path');
var server = new Hapi.Server();
server.connection({port:3000});

//load dynamic layout for frontend user
server.views({
	engines: {
		html: require('handlebars')
	},
	relativeTo: __dirname+'/views/themes/backend',
	path: './',
	layoutPath: './layout',
	layout: 'default',
	partialsPath: './partials',
	helpersPath: './helpers',
});

//create routes
var routes = [
	{
		method: 'GET',
		path: '/',
		handler: function(request, reply) {
			var data = {
				title: 'Hello Jakelong',
				message: 'Hello world, i\'m Jakelong'
			};
			return reply.view('index', data);
		}
	},
	{
		method: 'GET',
		path: '/{name}',

		handler: function(request, reply) {
			var data = {
				title: 'Hello '+ request.params.name,
				message: 'Hello world, i\'m '+request.params.name
			};
			var pathview = {relativeTo:__dirname+'/views/themes/agency'};
			return reply.view('index', data,pathview);
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

