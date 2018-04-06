import _ from 'lodash';
import logger from '../logger';
import FactoryModel from '../db';

/**
 * Adds a factory, and emites a successful response
 */
export default (client, factory) => {
  const parsedFactory = JSON.parse(factory);
  const factoryName = _.get(parsedFactory, 'name', '');

  FactoryModel.findOne({ name: factoryName }, (err, existingFactory) => {
    if (err) return client.emit('factoryError', 'An error occurred while saving factory');

    if (existingFactory) {
      return client.emit('factoryError', 'Factory already exists');
    }

    const factory = new FactoryModel({
      ...parsedFactory
    });

    logger.info('Created new factory');

    factory.save((err) => {
      if (err) {
        return client.emit('factoryError', 'Error occurred while saving factory');
      }

      logger.info('Emitted newly created factory');
      return client.emit('factoryAdded', factory);
    });
  });
}