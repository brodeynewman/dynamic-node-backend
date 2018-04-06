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

  FactoryModel.findOne({ _id }, (err, foundFactory) => {
    if (!foundFactory) return client.emit('factoryError', 'Factory does not exist');

    const newFactory = _.assign(foundFactory, parsedFactory);

    return newFactory.save((saveError, updatedFactory) => {
      if (saveError) return client.emit('factoryError', 'Error occurred while updating factory');

      logger.info('Emitting updated factory');
      return client.emit('factoryUpdated', updatedFactory);
    });
  });
};

