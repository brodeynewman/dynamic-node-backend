import _ from 'lodash';
import FactoryModel from '../db/models/factory';

/**
 * Gets and emitts all factories
 */
export default async (client) => {
  const factories = await FactoryModel.find({}, (err, list) => {
    if (list) {
      client.emit('allFactories', list);
    }
  });
};