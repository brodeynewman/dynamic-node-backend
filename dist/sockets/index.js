'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _addFactory = require('./addFactory');

var _addFactory2 = _interopRequireDefault(_addFactory);

var _allFactories = require('./allFactories');

var _allFactories2 = _interopRequireDefault(_allFactories);

var _deleteFactory = require('./deleteFactory');

var _deleteFactory2 = _interopRequireDefault(_deleteFactory);

var _updateFactory = require('./updateFactory');

var _updateFactory2 = _interopRequireDefault(_updateFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns an object of partialed controllers
 * @param {Object} client - socket client
 * @returns {Object} - partialed controllers
 */
var clientFactory = function clientFactory(client) {
  return {
    addFactory: _lodash2.default.partial(_addFactory2.default, client),
    deleteFactory: _lodash2.default.partial(_deleteFactory2.default, client),
    updateFactory: _lodash2.default.partial(_updateFactory2.default, client),
    allFactory: _lodash2.default.partial(_allFactories2.default, client)
  };
};

exports.default = function (socketServer, client) {
  var _clientFactory = clientFactory(socketServer),
      addFactory = _clientFactory.addFactory,
      deleteFactory = _clientFactory.deleteFactory,
      updateFactory = _clientFactory.updateFactory,
      allFactory = _clientFactory.allFactory;

  client.on('allFactories', allFactory);
  client.on('addFactory', addFactory);
  client.on('deleteFactory', deleteFactory);
  client.on('updateFactory', updateFactory);
};