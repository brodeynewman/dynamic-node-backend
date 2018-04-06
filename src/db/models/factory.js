import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * MongoDB Factory schema
 */
const factorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  numberOfChildren: {
    type: Number,
    required: true,
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
    trim: true,
  }
});

const FactoryModel = mongoose.model('factory', factorySchema);

export default FactoryModel;