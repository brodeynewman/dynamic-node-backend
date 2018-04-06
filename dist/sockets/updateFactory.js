'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Updates a factory, and emits a result
 */
exports.default = function (client, factory) {
  var parsedFactory = JSON.parse(factory);
  var _id = parsedFactory._id;


  _db2.default.findOne({ _id: _id }, function (err, foundFactory) {
    if (!foundFactory) return client.emit('factoryError', 'Factory does not exist');

    var newFactory = _lodash2.default.assign(foundFactory, parsedFactory);

    return newFactory.save(function (saveError, updatedFactory) {
      if (saveError) return client.emit('factoryError', 'Error occurred while updating factory');

      _logger2.default.info('Emitting updated factory');
      return client.emit('factoryUpdated', updatedFactory);
    });
  });
};