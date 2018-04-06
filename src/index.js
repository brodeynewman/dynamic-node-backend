import io from 'socket.io';
import helmet from 'helmet';
import express from 'express';
import mongoose from 'mongoose';
import logger from './logger';
import initiateEvents from './sockets';

mongoose.connect(process.env.MONGODB_URI ||
  'mongodb://localhost:27017/passport', () => {
  logger.info('mongoose is connected');
});

const port = process.env.PORT;
const app = express();

app.use(helmet());

const server = app.listen(port || 8008, () => {
  logger.info('Server is listening on port', port);
});

const socketServer = io(server);

socketServer.origins('*:*');
socketServer.on('connection', (client) => {
  initiateEvents(socketServer, client);
});
