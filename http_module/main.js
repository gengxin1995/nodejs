var router = require('./router');
var server = require('./server');
var requestHandlers = require('./requestHandlers');

var handle = {};
handle['/'] = requestHandlers.home;
handle['/about'] = requestHandlers.about;

server.start(router.route, handle);