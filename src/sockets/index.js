import _ from 'lodash';
import addFactoryController from './addFactory';
import deleteFactoryController from './deleteFactory';
import updateFactoryController from './updateFactory';

const clientFactory = client => ({
  addFactory: _.partial(addFactoryController, client),
  deleteFactory: _.partial(deleteFactoryController, client),
  updateFactory: _.partial(updateFactoryController, client),
});

export default (client) => {
  const {
    addFactory,
    deleteFactory,
    updateFactory,
  } = clientFactory(client);

  client.on('addFactory', addFactory);
  client.on('deleteFactory', deleteFactory);
  client.on('updateFactory', updateFactory);
}