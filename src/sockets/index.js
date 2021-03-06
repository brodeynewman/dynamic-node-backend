import _ from 'lodash';
import addFactoryController from './addFactory';
import allFactoryController from './allFactories';
import deleteFactoryController from './deleteFactory';
import updateFactoryController from './updateFactory';

/**
 * Returns an object of partialed controllers
 * @param {Object} client - socket client
 * @returns {Object} - partialed controllers
 */
const clientFactory = client => ({
  addFactory: _.partial(addFactoryController, client),
  deleteFactory: _.partial(deleteFactoryController, client),
  updateFactory: _.partial(updateFactoryController, client),
  allFactory: _.partial(allFactoryController, client),
});

export default (socketServer, client) => {
  const {
    addFactory,
    deleteFactory,
    updateFactory,
    allFactory,
  } = clientFactory(socketServer);

  client.on('allFactories', allFactory);
  client.on('addFactory', addFactory);
  client.on('deleteFactory', deleteFactory);
  client.on('updateFactory', updateFactory);
};

