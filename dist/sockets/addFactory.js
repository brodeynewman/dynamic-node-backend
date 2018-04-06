'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Adds a factory, and emites a successful response
 */
exports.default = function (client, factory) {
  var parsedFactory = JSON.parse(factory);
  var factoryName = _lodash2.default.get(parsedFactory, 'name', '');

  _db2.default.findOne({ name: factoryName }, function (err, existingFactory) {
    if (err) return client.emit('factoryError', 'An error occurred while saving factory');

    if (existingFactory) {
      return client.emit('factoryError', 'Factory already exists');
    }

    var createdFActory = new _db2.default((0, _extends3.default)({}, parsedFactory));

    _logger2.default.info('Created new factory');

    return createdFActory.save(function (saveError) {
      if (saveError) {
        return client.emit('factoryError', 'Error occurred while saving factory');
      }

      _logger2.default.info('Emitted newly created factory');
      return client.emit('factoryAdded', createdFActory);
    });
  });
};