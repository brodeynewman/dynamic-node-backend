'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Deletes a factory, and emites a successful response
 */
exports.default = function (client, id) {
  _db2.default.findOne({ _id: id }, function (findError, factory) {
    if (findError) {
      return client.emit('factoryError', 'A problem was encountered while deleting the factory');
    }

    if (!factory) return client.emit('factoryError', 'Factory does not exist');

    return _db2.default.remove({ _id: id }, function (err) {
      if (err) return client.emit('factoryError', 'An error occurred while deleting factory');

      _logger2.default.info('Emitting deleted factory');
      return client.emit('factoryDeleted', id);
    });
  });
};