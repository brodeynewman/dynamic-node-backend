import _ from 'lodash';
import FactoryModel from '../db/models/factory';

export default (client, factory) => {
  const parsedFactory = JSON.parse(factory);
  const { 
    _id,
  } = parsedFactory;

  FactoryModel.findOne({ _id }, (err, factory) => {
    if (!factory) return client.emit('factoryError', 'Factory does not exist');

    if (factory) {
      const newFactory = _.assign(factory, parsedFactory);

      newFactory.save((err, savedFactory) => {
        if (err) return client.emit('factoryError', 'Error occurred while updating factory');
  
        return client.emit('success', savedFactory);
      });
    }
  });
}