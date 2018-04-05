import _ from 'lodash';
import FactoryModel from '../db/models/factory';

export default (client) => {
  client.on('addFactory', factory => {
    const parsedFactory = JSON.parse(factory);
    const factoryName = _.get(parsedFactory, 'name', '');

    FactoryModel.findOne({ name: factoryName }, (err, existingFactory) => {
      console.log(err, existingFactory);
      if (err) return client.emit('findError', 'An error occurred while saving factory');

      if (existingFactory) {
        return client.emit('findError', 'Factory already exists!');
      }

      const factory = new FactoryModel({
        name: factoryName,
        numberOfChildren: 1,
        lowerBound: 0,
        upperBound: 100,
        children: [{ number: "one" }],
      });

      console.log(factory);

      factory.save((err, savedFactory) => {
        if (err) {
          console.log(err);
          return client.emit('saveError', 'Error occurred while saving factory');
        }

        return client.emit('success', factory);
      });
    });
  });
}