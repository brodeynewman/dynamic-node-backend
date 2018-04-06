import _ from 'lodash';
import FactoryModel from '../db/models/factory';

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

    factory.save((err, savedFactory) => {
      if (err) {
        return client.emit('factoryError', 'Error occurred while saving factory');
      }

      return client.emit('success', factory);
    });
  });
}