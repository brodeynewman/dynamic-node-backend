'use strict';

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _sockets = require('./sockets');

var _sockets2 = _interopRequireDefault(_sockets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/passport', function () {
  _logger2.default.info('mongoose is connected');
});

var port = process.env.PORT;
var app = (0, _express2.default)();

app.use((0, _helmet2.default)());

var server = app.listen(port || 8008, function () {
  _logger2.default.info('Server is listening on port', port);
});

var socketServer = (0, _socket2.default)(server);

socketServer.origins('*:*');
socketServer.on('connection', function (client) {
  (0, _sockets2.default)(socketServer, client);
});