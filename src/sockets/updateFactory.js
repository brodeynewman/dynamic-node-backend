import _ from 'lodash';
import logger from '../logger';
import FactoryModel from '../db';

/**
 * Updates a factory, and emits a result
 */
export default (client, factory) => {
  const parsedFactory = JSON.parse(factory);
  const { 
    _id,
  } = parsedFactory;

  FactoryModel.findOne({ _id }, (err, factory) => {
    if (!factory) return client.emit('factoryError', 'Factory does not exist');

    if (factory) {
      const newFactory = _.assign(factory, parsedFactory);

      newFactory.save((err, updatedFactory) => {
        if (err) return client.emit('factoryError', 'Error occurred while updating factory');
  
        logger.info('Emitting updated factory');
        return client.emit('factoryUpdated', updatedFactory);
      });
    }
  });
}