'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

/**
 * MongoDB Factory schema
 */

var factorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  numberOfChildren: {
    type: Number,
    required: true
  },
  lowerBound: {
    type: Number,
    required: true
  },
  upperBound: {
    type: Number,
    required: true
  },
  children: {
    type: Array,
    trim: true
  }
});

var FactoryModel = _mongoose2.default.model('factory', factorySchema);

exports.default = FactoryModel;