import FactoryModel from '../db/models/factory';

/**
 * Deletes a factory, and emites a successful response
 */
export default (client, id) => {
  FactoryModel.findOne({ _id: id }, (err, factory) => {
    if (err) return client.emit(
      'factoryError', 
      'A problem was encountered while deleting the factory'
    );

    if (!factory) return client.emit('factoryError', 'Factory does not exist');

    if (factory) {
      FactoryModel.remove({ _id: id }, (err) => {
        if (err) return client.emit('factoryError', 'An error occurred while deleting factory');
    
        return client.emit('factoryDeleted', 'Factory successfully removed');
      });
    }
  });
}