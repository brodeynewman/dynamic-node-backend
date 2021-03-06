import logger from '../logger';
import FactoryModel from '../db';

/**
 * Gets and emitts all factories
 */
export default async (client) => {
  FactoryModel.find({}, (err, list) => {
    if (list) {
      logger.info('Emitting list of factories');

      client.emit('allFactories', list);
    }
  });
};
