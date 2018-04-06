import logger from '../logger';
import FactoryModel from '../db';

/**
 * Deletes a factory, and emites a successful response
 */
export default (client, id) => {
  FactoryModel.findOne({ _id: id }, (findError, factory) => {
    if (findError) {
      return client.emit(
        'factoryError',
        'A problem was encountered while deleting the factory',
      );
    }

    if (!factory) return client.emit('factoryError', 'Factory does not exist');

    return FactoryModel.remove({ _id: id }, (err) => {
      if (err) return client.emit('factoryError', 'An error occurred while deleting factory');

      logger.info('Emitting deleted factory');
      return client.emit('factoryDeleted', id);
    });
  });
};

