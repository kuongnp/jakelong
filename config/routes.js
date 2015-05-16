// Load modules

//var User      = require('./controller/usercontroller'),
var Post      = require('./controller/PostController');
  //Static    = require('./static');

  var static = {
  	handler: {
  		directory: {
  			path: 'views/assets/themes',
  			listing: false,
  			index: true
  		}
  	}
  };

  var home = {
		handler: function(request, reply) {
			var data = {
				title: 'Hello Jakelong',
				message: 'Hello world, i\'m Jakelong',
			};
			return reply.view('index', data);
		}
	};

	var admin = {
		handler: function(request, reply) {
			var data = {
				title: 'Hello Admin',
				message: 'Welcome to dashboard'
			};
			var options = {
				path: 'templates/backend',
				layout: 'backend'
			};
			reply.view('admin',data,options);
		}
	};

	var temp = {
		handler: function(request, reply) {
			var data = {
				title: 'Hello abc',
				message: 'Hello world, i\'m abc',
			};
			return reply.view('index', data);
		}
	};


// API Server Endpoints
exports.endpoints = [

  { method: 'GET',  path: '/{somethings*}', config: static},
  { method: 'GET',  path: '/', config: home},
  { method: 'GET',  path: '/admin', config: admin},
  { method: 'POST', path: '/post', config: Post.create},
  { method: 'GET',  path: '/{slug}', config: temp},
  
  //{ method: 'POST', path: '/user', config: User.create},
  //{ method: 'GET', path: '/user', config: User.getAll},
  //{ method: 'GET', path: '/user/{userId}', config: User.getOne},
  //{ method: 'PUT', path: '/user/{userId}', config: User.update},
  //{ method: 'DELETE', path: '/user/{userId}', config: User.remove},
  //{ method: 'DELETE', path: '/user', config: User.removeAll}
];

